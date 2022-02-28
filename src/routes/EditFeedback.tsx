import { Formik, FormikHelpers, Form, Field } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconArrowDown from "../components/icons/IconArrowDown";
import SvgIconEditFeedback from "../assets/shared/icon-edit-feedback.svg";
import { useAppSelector, useAppDispatch } from "../hooks";
import { FormEditFeedback, editFeedback, removeFeedback } from "../slice";
import NotFound from "./NotFound";

type Params = {
  feedbackId: string;
};

export default function EditFeedback() {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const feedbacks = useAppSelector((state) => state.feedbacks);
  const dispatch = useAppDispatch();

  const feedbackDetail = feedbacks.productRequests.find(
    (f) => f.id == parseInt(params.feedbackId ?? "0")
  );

  if (feedbackDetail !== undefined) {
    return (
      <div className="md:p-14 bg-[#F7F8FD] min-h-full p-6">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between h-10">
            <button
              className="flex items-center gap-4 font-bold text-[#647196] text-sm"
              onClick={() => navigate(-1)}
            >
              <IconArrowDown className="transform rotate-90" /> Go back
            </button>
          </div>

          <div className="mt-11">
            <div className="bg-white rounded-lg p-6 text-sm text-[#3A4374]">
              <img
                className="h-10 w-10 -mt-11"
                src={SvgIconEditFeedback}
                alt="plus icon"
              />
              <div className="mt-6 font-bold text-lg">
                Editing ‘{feedbackDetail.title}’
              </div>

              {/* form */}
              <Formik
                initialValues={
                  {
                    feedbackId: feedbackDetail.id,
                    title: feedbackDetail.title,
                    category: feedbackDetail.category,
                    detail: feedbackDetail.description,
                    status: feedbackDetail.status,
                  } as FormEditFeedback
                }
                onSubmit={(
                  values: FormEditFeedback,
                  { setSubmitting }: FormikHelpers<FormEditFeedback>
                ) => {
                  return new Promise((resolve, _) => {
                    setTimeout(() => {
                      dispatch(editFeedback(values));
                      setSubmitting(false);
                      resolve("done");
                      navigate("/");
                    }, 400);
                  });
                }}
              >
                {({ isSubmitting, values }) => (
                  <Form>
                    <div>
                      <div className="mt-6">
                        <label htmlFor="feedback-title" className="font-bold">
                          Feedback Title
                        </label>
                        <div>Add a short, descriptive headline</div>
                        <Field
                          type="text"
                          title="editFeedback"
                          name="title"
                          placeholder="Type your comment here"
                          className="bg-[#F7F8FD] rounded-md w-full h-12 text-[#3A4374] p-4 mt-4"
                        ></Field>
                      </div>

                      <div className="mt-6">
                        <label htmlFor="category" className="font-bold">
                          Category
                        </label>
                        <div>Choose a category for your feedback</div>

                        <Field
                          as="select"
                          title="editFeedback"
                          name="category"
                          className="w-full h-12 px-4 bg-[#F7F8FD] rounded-md mt-4"
                        >
                          <option value="" disabled>
                            Select...
                          </option>
                          {feedbacks.categories.map((c, index) => {
                            return (
                              <option key={index} value={c}>
                                {c}
                              </option>
                            );
                          })}
                        </Field>
                      </div>

                      <div className="mt-6">
                        <label htmlFor="status" className="font-bold">
                          Update Status
                        </label>
                        <div>Change feature state</div>

                        <Field
                          as="select"
                          title="editFeedback"
                          name="status"
                          className="w-full h-12 px-4 bg-[#F7F8FD] rounded-md mt-4"
                        >
                          <option value="" disabled>
                            Select...
                          </option>
                          {feedbacks.statuses.map((c, index) => {
                            return (
                              <option key={index} value={c.status}>
                                {c.status}
                              </option>
                            );
                          })}
                        </Field>
                      </div>

                      <div className="mt-6">
                        <label htmlFor="feedback-detail" className="font-bold">
                          Feedback Detail
                        </label>
                        <div>
                          Include any specific comments on what should be
                          improved, added, etc.
                        </div>
                        <Field
                          as="textarea"
                          title="editFeedback"
                          name="detail"
                          placeholder="Type your comment here"
                          className="bg-[#F7F8FD] rounded-md w-full h-32 text-[#3A4374] p-4 mt-4"
                        ></Field>
                      </div>
                    </div>

                    <div className="md:flex-row-reverse mt-10 flex flex-col gap-4">
                      <button
                        className="md:w-auto px-6 bg-[#AD1FEA] w-full rounded-lg h-10 text-white font-bold"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        className="md:w-auto px-6 bg-[#3A4374] w-full rounded-lg h-10 text-white font-bold"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                      <button
                        className="md:w-auto md:mr-auto px-6 bg-[#D73737] w-full rounded-lg h-10 text-white font-bold"
                        disabled={isSubmitting}
                        onClick={() => {
                          navigate("/");
                          dispatch(removeFeedback(feedbackDetail.id));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
}
