import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeedbackRequestCard from "../components/FeedbackRequestCard";
import IconArrowDown from "../components/icons/IconArrowDown";
import { useAppDispatch, useAppSelector } from "../hooks";
import NotFound from "./NotFound";
import IconAnne from "../assets/user-images/image-anne.jpg";
import IconElijah from "../assets/user-images/image-elijah.jpg";
import IconGeorge from "../assets/user-images/image-george.jpg";
import IconJackson from "../assets/user-images/image-jackson.jpg";
import IconJames from "../assets/user-images/image-james.jpg";
import IconJavier from "../assets/user-images/image-javier.jpg";
import IconJudah from "../assets/user-images/image-judah.jpg";
import IconRoxanne from "../assets/user-images/image-roxanne.jpg";
import IconRyan from "../assets/user-images/image-ryan.jpg";
import IconSuzanne from "../assets/user-images/image-suzanne.jpg";
import IconThomas from "../assets/user-images/image-thomas.jpg";
import IconVictoria from "../assets/user-images/image-victoria.jpg";
import IconZena from "../assets/user-images/image-zena.jpg";
import { User } from "../slice";

type Params = {
  feedbackId: string;
};

function Comment() {
  return <></>;
}

export default function FeedbackDetail() {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const feedbacks = useAppSelector((state) => state.feedbacks);
  const dispatch = useAppDispatch();

  const feedbackDetail = feedbacks.productRequests.find(
    (f) => f.id == parseInt(params.feedbackId ?? "0")
  );

  function userAvatar(user: User): string {
    switch (user.name) {
      case "Anne Valentine":
        return IconAnne;
      case "Elijah Moss":
        return IconElijah;
      case "George Partridge":
        return IconGeorge;
      case "Jackson Barker":
        return IconJackson;
      case "James Skinner":
        return IconJames;
      case "Javier Pollard":
        return IconJavier;
      case "Roxanne Travis":
        return IconRoxanne;
      case "Ryan Welles":
        return IconRyan;
      case "Suzanne Chang":
        return IconSuzanne;
      case "Thomas Hood":
        return IconThomas;
      case "Victoria Mejia":
        return IconVictoria;
      case "Zena Kelley":
        return IconZena;
      default:
        return "";
    }
  }

  if (feedbackDetail !== undefined) {
    console.log(feedbackDetail);
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
            <div className="text-lg font-bold text-[#3A4374]">
              {(feedbackDetail.comments?.length ?? 0) +
                (feedbackDetail.comments?.flatMap((c) => c.replies).length ??
                  0)}{" "}
              Comments
            </div>
            {feedbackDetail.comments?.length ?? 0 > 0 ? (
              <div className="mt-6">
                {/* comment */}
                {feedbackDetail.comments?.map((comment) => {
                  return (
                    <div
                      className="odd:border-b-2 pb-6 mt-6 text-sm"
                      key={comment.id}
                    >
                      <div className="flex items-center">
                        <img
                          className="rounded-full h-10"
                          src={userAvatar(comment.user)}
                          alt=""
                        />
                        <div className="ml-4">
                          <div className="text-[#3A4374] font-bold">
                            {comment.user.name}
                          </div>
                          <div>{comment.user.username}</div>
                        </div>
                        <div className="ml-auto text-[#4661E6] font-semibold">
                          Reply
                        </div>
                      </div>
                      <div className="mt-6">{comment.content}</div>

                      {/* replies */}
                      {(comment.replies?.length ?? 0) > 0 ? (
                        <div className="mt-6 flex flex-col gap-6 pl-6 border-l-2">
                          {comment.replies?.map((replay, index) => {
                            return (
                              <div key={index}>
                                <div className="flex items-center">
                                  <img
                                    className="rounded-full h-10"
                                    src={userAvatar(replay.user)}
                                    alt=""
                                  />
                                  <div className="ml-4">
                                    <div className="text-[#3A4374] font-bold">
                                      {replay.user.name}
                                    </div>
                                    <div>{replay.user.username}</div>
                                  </div>
                                  <div className="ml-auto text-[#4661E6] font-semibold">
                                    Reply
                                  </div>
                                </div>
                                <div className="mt-6">
                                  <span className="text-[#AD1FEA] font-bold">{`@${replay.replyingTo} `}</span>
                                  {replay.content}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
}
