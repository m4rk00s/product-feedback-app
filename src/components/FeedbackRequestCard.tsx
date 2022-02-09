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
      className="bg-white rounded-lg p-6 text-sm"
      onClick={() => navigate(`/feedbacks/${props.product.id}`)}
    >
      <div>
        <div className="text-[#3A4374] font-bold">{props.product.title}</div>
        <div className="text-[#647196] mt-2">{props.product.description}</div>
      </div>
      <div className="mt-2 flex">
        <div className="rounded-lg px-4 h-8 bg-[#F2F4FF] text-[#4661E6] font-bold flex items-center justify-center">
          {props.product.category}
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          type="button"
          className={[
            "rounded-lg px-4 h-8 flex items-center font-bold",
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
              "transform rotate-180 mr-2",
              feedbacks.upvotedRequestIds.includes(props.product.id)
                ? "text-white"
                : "",
            ].join(" ")}
          />
          {props.product.upvotes}
        </button>
        <div className="text-[#3A4374] font-bold flex items-center">
          <IconComments className="mr-2" />
          {props.product.comments?.length ?? 0}
        </div>
      </div>
    </div>
  );
}
