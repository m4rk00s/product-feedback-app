import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackRequestCard from "../components/FeedbackRequestCard";
import IconArrowDown from "../components/icons/IconArrowDown";
import IconComments from "../components/icons/IconComments";
import { uppercaseWords } from "../helper";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ProductRequest, Status, StatusInfo, upvoteRequest } from "../slice";

export default function Roadmap() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const feedbacks = useAppSelector((state) => state.feedbacks);
  const [selectedStatus, setSelectedStatus] = useState<Status>("in-progress");
  const filteredProductRequests = feedbacks.productRequests.filter(
    (p) => p.status === selectedStatus
  );

  function renderRequestCard(product: ProductRequest, stat: StatusInfo) {
    return (
      <div
        key={product.id}
        className={
          "grid gap-4 grid-cols-2 bg-white rounded-lg p-6 text-sm border-t-8 " +
          (stat.status === "planned" ? "border-t-[#F49F85] " : "") +
          (stat.status === "in-progress" ? "border-t-[#AD1FEA] " : "") +
          (stat.status === "live" ? "border-t-[#62BCFA] " : "")
        }
        onClick={() => navigate(`/feedbacks/${product.id}`)}
      >
        <div className="col-span-2">
          <div>
            <div className="text-[#3A4374] font-bold">{product.title}</div>
            <div className="text-[#647196] mt-2">{product.description}</div>
          </div>
          <div className="mt-2 flex">
            <div className="rounded-lg px-4 h-8 bg-[#F2F4FF] text-[#4661E6] font-bold flex items-center justify-center">
              {product.category}
            </div>
          </div>
        </div>

        {/* upvote */}
        <div className="">
          <button
            type="button"
            className={[
              "rounded-lg px-4 h-8 flex items-center font-bold",
              feedbacks.upvotedRequestIds.includes(product.id)
                ? "bg-[#4661E6] text-white"
                : "bg-[#F2F4FF] text-[#3A4374]",
            ].join(" ")}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(upvoteRequest(product.id));
            }}
          >
            <IconArrowDown
              className={[
                "transform rotate-180 mr-2",
                feedbacks.upvotedRequestIds.includes(product.id)
                  ? "text-white"
                  : "",
              ].join(" ")}
            />
            {product.upvotes}
          </button>
        </div>

        {/* comment */}
        <div className="flex items-center justify-end">
          <div className="text-[#3A4374] font-bold flex items-center">
            <IconComments className="mr-2" />
            {product.comments?.length ?? 0}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F8FD]">
      <div className="lg:max-w-6xl lg:mx-auto md:py-14 md:px-10 relative flex flex-col min-h-full">
        <div className="lg:static md:rounded-lg sticky top-0 flex items-center justify-between p-6 bg-[#373F68] text-white">
          <div className="flex flex-col">
            <button
              type="button"
              className="flex items-center gap-4 font-bold text-white text-sm"
              onClick={() => navigate(-1)}
            >
              <IconArrowDown className="transform rotate-90 text-[#CDD2EE]" />{" "}
              Go back
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
        <div className="md:hidden">
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
                          ((stat.status === "planned"
                            ? "border-[#F49F85]"
                            : "") +
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
                {uppercaseWords(selectedStatus)} (
                {filteredProductRequests.length})
              </div>
              <div>
                {
                  feedbacks.statuses.find(
                    (stat) => stat.status === selectedStatus
                  )?.description
                }
              </div>
            </div>

            {/* list of cards */}
            <div className="flex flex-col gap-4 mt-6">
              {filteredProductRequests.map((p) =>
                renderRequestCard(
                  p,
                  feedbacks.statuses.find(
                    (stat) => stat.status === selectedStatus
                  ) ?? {
                    accentColor: "",
                    description: "",
                    status: "suggestion",
                  }
                )
              )}
            </div>
          </div>
        </div>
        <div className="md:flex gap-[0.625rem] mt-8 hidden">
          {feedbacks.statuses
            .filter((stat) => stat.status !== "suggestion")
            .map((stat) => {
              return (
                <div key={stat.status} className="flex-1">
                  <div className="text-[#3A4374]">
                    <div className="font-bold">
                      {uppercaseWords(stat.status)} (
                      {filteredProductRequests.length})
                    </div>
                    <div>{stat.description}</div>
                  </div>

                  {/* list of cards */}
                  <div className="flex flex-col gap-4 mt-6">
                    {feedbacks.productRequests
                      .filter((f) => f.status === stat.status)
                      .map((product) => renderRequestCard(product, stat))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
