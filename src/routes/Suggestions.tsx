import React from "react";
import { useNavigate } from "react-router-dom";
import IconHamburger from "../assets/shared/mobile/icon-hamburger.svg";
import FeedbackRequestCard from "../components/FeedbackRequestCard";
import IconArrowDown from "../components/icons/IconArrowDown";
import { useAppSelector } from "../hooks";

export default function Suggestions() {
  const navigate = useNavigate();
  const feedbacks = useAppSelector((state) => state.feedbacks);

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
          .map((product) => (
            <FeedbackRequestCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
