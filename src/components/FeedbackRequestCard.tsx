import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ProductRequest, upvoteRequest } from "../slice";
import IconArrowDown from "./icons/IconArrowDown";
import IconComments from "./icons/IconComments";

interface Props {
  product: ProductRequest;
}

export default function FeedbackRequestCard(props: Props) {
  const navigate = useNavigate();
  const feedbacks = useAppSelector((state) => state.feedbacks);
  const dispatch = useAppDispatch();

  return (
    <div
      key={props.product.id}
      className="md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 grid gap-4 grid-cols-2 bg-white rounded-lg p-6 text-sm"
      onClick={() => navigate(`/feedbacks/${props.product.id}`)}
    >
      <div className="md:col-start-2 md:col-span-1 col-span-2">
        <div>
          <div className="md:text-lg text-[#3A4374] font-bold">
            {props.product.title}
          </div>
          <div className="md:text-base text-[#647196] mt-2">
            {props.product.description}
          </div>
        </div>
        <div className="md:mt-3 mt-2 flex">
          <div className="rounded-lg px-4 h-8 bg-[#F2F4FF] text-[#4661E6] font-bold flex items-center justify-center">
            {props.product.category}
          </div>
        </div>
      </div>

      {/* upvote */}
      <div className="md:col-start-1 md:row-start-1 md:mb-auto">
        <button
          type="button"
          className={[
            "md:flex-col md:h-auto md:gap-2 md:p-2 md:justify-center rounded-lg px-4 h-8 flex items-center font-bold",
            feedbacks.upvotedRequestIds.includes(props.product.id)
              ? "bg-[#4661E6] text-white"
              : "bg-[#F2F4FF] text-[#3A4374]",
          ].join(" ")}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(upvoteRequest(props.product.id));
          }}
        >
          <IconArrowDown
            className={[
              "md:mr-0 transform rotate-180 mr-2",
              feedbacks.upvotedRequestIds.includes(props.product.id)
                ? "text-white"
                : "",
            ].join(" ")}
          />
          {props.product.upvotes}
        </button>
      </div>

      {/* comment */}
      <div className="md:col-start-3 md:row-start-1 md:text-base flex items-center justify-end">
        <div className="text-[#3A4374] font-bold flex items-center">
          <IconComments className="mr-2" />
          {props.product.comments?.length ?? 0}
        </div>
      </div>
    </div>
  );
}
