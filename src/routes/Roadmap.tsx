import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackRequestCard from "../components/FeedbackRequestCard";
import IconArrowDown from "../components/icons/IconArrowDown";
import { uppercaseWords } from "../helper";
import { useAppSelector } from "../hooks";
import { Status } from "../slice";

export default function Roadmap() {
  const navigate = useNavigate();
  const feedbacks = useAppSelector((state) => state.feedbacks);
  const [selectedStatus, setSelectedStatus] = useState<Status>("in-progress");
  const filteredProductRequests = feedbacks.productRequests.filter(
    (p) => p.status === selectedStatus
  );

  return (
    <div className="relative flex flex-col bg-[#F7F8FD] min-h-full">
      <div className="sticky top-0 flex items-center justify-between p-6 bg-[#373F68] text-white">
        <div className="flex flex-col">
          <button
            type="button"
            className="flex items-center gap-4 font-bold text-white text-sm"
            onClick={() => navigate(-1)}
          >
            <IconArrowDown className="transform rotate-90 text-[#CDD2EE]" /> Go
            back
          </button>
          <div className="text-lg font-bold">Roadmap</div>
        </div>
        <button
          type="button"
          className="bg-[#AD1FEA] rounded-lg h-10 px-4 text-white text-sm font-bold"
          onClick={() => navigate("/feedbacks/new")}
        >
          + Add Feedback
        </button>
      </div>
      <div className="grid grid-cols-3">
        {feedbacks.statuses
          .filter((stat) => stat.status !== "suggestion")
          .map((stat) => {
            return (
              <button
                type="button"
                key={stat.status}
                className={
                  "py-5 flex items-centers justify-center font-bold text-[#3A4374] " +
                  (selectedStatus === stat.status
                    ? "border-b-4 " +
                      ((stat.status === "planned" ? "border-[#F49F85]" : "") +
                        (stat.status === "in-progress"
                          ? "border-[#AD1FEA]"
                          : "") +
                        (stat.status === "live" ? "border-[#62BCFA]" : ""))
                    : "border-b-2 mix-blend-normal text-opacity-40 ")
                }
                onClick={() => setSelectedStatus(stat.status)}
              >
                {`${uppercaseWords(stat.status)} (${
                  feedbacks.productRequests.filter(
                    (p) => p.status === stat.status
                  ).length
                })`}
              </button>
            );
          })}
      </div>
      <div className="p-6">
        <div className="text-[#3A4374]">
          <div className="font-bold">
            {uppercaseWords(selectedStatus)} ({filteredProductRequests.length})
          </div>
          <div>
            {
              feedbacks.statuses.find((stat) => stat.status === selectedStatus)
                ?.description
            }
          </div>
        </div>

        {/* list of cards */}
        <div className="flex flex-col gap-4 mt-6">
          {filteredProductRequests.map((p) => {
            return <FeedbackRequestCard key={p.id} product={p} />;
          })}
        </div>
      </div>
    </div>
  );
}
