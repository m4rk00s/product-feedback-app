import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeedbackRequestCard from "../components/FeedbackRequestCard";
import IconArrowDown from "../components/icons/IconArrowDown";
import { useAppDispatch, useAppSelector } from "../hooks";
import NotFound from "./NotFound";
import IconElijah from "../assets/user-images/image-elijah.jpg";

type Params = {
  feedbackId: string;
};

export default function FeedbackDetail() {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const feedbacks = useAppSelector((state) => state.feedbacks);
  const dispatch = useAppDispatch();

  const feedbackDetail = feedbacks.productRequests.find(
    (f) => f.id == parseInt(params.feedbackId ?? "0")
  );

  if (feedbackDetail !== undefined) {
    return (
      <div className="bg-[#F7F8FD] min-h-full p-6">
        {/* header */}
        <div className="flex justify-between">
          <button
            className="flex items-center gap-4"
            onClick={() => navigate(-1)}
          >
            <IconArrowDown className="transform rotate-90" /> Go back
          </button>
          <button className="bg-[#4661E6] text-white rounded-lg h-10 px-4">
            Edit Feedback
          </button>
        </div>

        <div className="mt-6">
          <FeedbackRequestCard product={feedbackDetail} />

          <div className="bg-white mt-6 p-6 rounded-lg">
            <div>4 Comments</div>
            <div className="mt-6">
              {/* comment */}
              <div>
                <div className="flex items-center">
                  <img className="rounded-full h-10" src={IconElijah} alt="" />
                  <div className="ml-4">
                    <div>Elijah Moss</div>
                    <div>@hexagon.bestagon</div>
                  </div>
                  <div className="ml-auto">Reply</div>
                </div>
                <div className="mt-6">
                  Also, please allow styles to be applied based on system
                  preferences. I would love to be able to browse Frontend Mentor
                  in the evening after my device’s dark mode turns on without
                  the bright background it currently has.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
}
