import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeedbackRequestCard from "../components/FeedbackRequestCard";
import IconArrowDown from "../components/icons/IconArrowDown";
import { useAppDispatch, useAppSelector } from "../hooks";
import NotFound from "./NotFound";
import CommentSection from "../components/CommentSection";
import { addComment, addReply } from "../slice";
import { Field, Form, Formik, FormikHelpers } from "formik";

type Params = {
  feedbackId: string;
};

interface FormData {
  content: "";
}

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
      <div className="md:py-14 md:px-10 bg-[#F7F8FD] min-h-full p-6">
        {/* header */}
        <div className="flex justify-between h-10">
          <button
            className="flex items-center gap-4 font-bold text-[#647196] text-sm"
            onClick={() => navigate(-1)}
          >
            <IconArrowDown className="transform rotate-90" /> Go back
          </button>
          <button
            type="button"
            className="bg-[#4661E6] text-white rounded-lg h-10 px-4"
            onClick={() => navigate(`/feedbacks/${feedbackDetail.id}/edit`)}
          >
            Edit Feedback
          </button>
        </div>

        <div className="mt-6">
          <FeedbackRequestCard product={feedbackDetail} />

          <div className="bg-white mt-6 p-6 rounded-lg">
            <div className="text-lg font-bold text-[#3A4374]">
              {(feedbackDetail.comments?.length ?? 0) +
                (feedbackDetail.comments
                  ?.flatMap((c) => c.replies)
                  .filter((c) => c !== undefined).length ?? 0)}{" "}
              Comments
            </div>
            {(feedbackDetail.comments?.length ?? 0) > 0 && (
              <div className="mt-6">
                {/* comment */}
                {feedbackDetail.comments?.map((comment) => {
                  return (
                    <div
                      className="border-b-2 last:border-b-0 pb-6 mt-6 text-sm"
                      key={comment.id}
                    >
                      <CommentSection
                        content={comment.content}
                        user={comment.user}
                        onSubmitHandler={(values, { setSubmitting }) => {
                          return new Promise((resolve, _) => {
                            setTimeout(() => {
                              dispatch(
                                addReply({
                                  comment: comment,
                                  productRequest: feedbackDetail,
                                  reply: {
                                    content: values.content,
                                    user: feedbacks.currentUser,
                                    replyingTo: comment.user.username,
                                  },
                                })
                              );
                              console.log("test");
                              setSubmitting(false);
                              resolve("done");
                            }, 400);
                          });
                        }}
                      />

                      {/* replies */}
                      {(comment.replies?.length ?? 0) > 0 && (
                        <div className="mt-6 flex flex-col gap-6 pl-6 border-l-2">
                          {comment.replies?.map((reply, index) => {
                            return (
                              <CommentSection
                                key={index}
                                content={
                                  <>
                                    <span className="text-[#AD1FEA] font-bold">{`@${reply.replyingTo} `}</span>
                                    {reply.content}
                                  </>
                                }
                                user={reply.user}
                                onSubmitHandler={(
                                  values,
                                  { setSubmitting }
                                ) => {
                                  return new Promise((resolve, _) => {
                                    setTimeout(() => {
                                      dispatch(
                                        addReply({
                                          comment: comment,
                                          productRequest: feedbackDetail,
                                          reply: {
                                            content: values.content,
                                            user: feedbacks.currentUser,
                                            replyingTo: reply.user.username,
                                          },
                                        })
                                      );
                                      setSubmitting(false);
                                      resolve("done");
                                    }, 400);
                                  });
                                }}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white mt-6 p-6 rounded-lg">
            <div className="text-[#3A4374] text-lg font-bold">Add Comment</div>

            <Formik
              initialValues={{
                content: "",
              }}
              onSubmit={(
                values: FormData,
                { setSubmitting }: FormikHelpers<FormData>
              ) => {
                return new Promise((resolve, _) => {
                  setTimeout(() => {
                    dispatch(
                      addComment({
                        comment: {
                          id: -1,
                          content: values.content,
                          user: feedbacks.currentUser,
                        },
                        productRequest: feedbackDetail,
                      })
                    );
                    setSubmitting(false);
                    resolve("done");
                  }, 400);
                });
              }}
            >
              {({ isSubmitting, values }) => (
                <Form className="mt-6 flex flex-col">
                  <Field
                    as="textarea"
                    title="reply"
                    name="content"
                    placeholder="Type your comment here"
                    className="bg-[#F7F8FD] rounded-md w-full h-20 text-[#3A4374] p-4"
                  ></Field>

                  <div className="flex items-center justify-between mt-6">
                    <div className="text-[#647196] text-sm">
                      {250 - values.content.length} Characters left
                    </div>
                    <button
                      className="rounded-lg font-bold bg-[#AD1FEA] h-10 px-4 text-white"
                      disabled={isSubmitting}
                      type="submit"
                      title="replaySubmit"
                    >
                      Post Comments
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
}
