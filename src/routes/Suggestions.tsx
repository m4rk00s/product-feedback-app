import React from "react";
import { useNavigate } from "react-router-dom";
import IconHamburger from "../assets/shared/mobile/icon-hamburger.svg";
import IconArrowDown from "../components/icons/IconArrowDown";
import IconComments from "../components/icons/IconComments";
import { useAppDispatch, useAppSelector } from "../hooks";
import { upvoteRequest } from "../slice";

export default function Suggestions() {
  const navigate = useNavigate();
  const feedbacks = useAppSelector((state) => state.feedbacks);
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-full flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between py-4 px-6 bg-fancy">
        <div>
          <div className="text-white font-bold">Frontend Mentor</div>
          <div className="text-white text-sm opacity-75">Feedback Board</div>
        </div>
        <div>
          <img src={IconHamburger} alt="" />
        </div>
      </div>
      {/* sort and add feedback */}
      <div className="bg-[#373F68] text-white flex items-center justify-between py-2 px-6">
        <div className="flex items-baseline text-sm">
          Sort by :&nbsp;<span className="font-bold">Most Upvotes</span>{" "}
          <IconArrowDown className="ml-2 text-white" />
        </div>
        <button
          type="button"
          className="bg-[#AD1FEA] rounded-lg h-10 px-4 text-sm font-bold"
          onClick={() => navigate("/feedbacks/new")}
        >
          + Add Feedback
        </button>
      </div>
      {/* feedbacks */}
      <div className="bg-[#F7F8FD] min-h-full px-6 py-8 flex flex-col gap-4">
        {/* feedback card */}
        {Array.from(feedbacks.productRequests)
          .sort((a, b) => {
            switch (feedbacks.sortBy) {
              case "Most Upvotes":
                return b.upvotes - a.upvotes;
              case "Least Upvotes":
                return a.upvotes - b.upvotes;
              case "Most Comments":
                return (b.comments?.length ?? 0) - (a.comments?.length ?? 0);
              case "Least Comments":
                return (a.comments?.length ?? 0) - (b.comments?.length ?? 0);
            }
          })
          .map((product) => {
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg p-6 text-sm"
                onClick={() => navigate(`/feedbacks/${product.id}`)}
              >
                <div>
                  <div className="text-[#3A4374] font-bold">
                    {product.title}
                  </div>
                  <div className="text-[#647196] mt-2">
                    {product.description}
                  </div>
                </div>
                <div className="mt-2 flex">
                  <div className="rounded-lg px-4 h-8 bg-[#F2F4FF] text-[#4661E6] font-bold flex items-center justify-center">
                    {product.category}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
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
                  <div className="text-[#3A4374] font-bold flex items-center">
                    <IconComments className="mr-2" />
                    {product.comments?.length ?? 0}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
