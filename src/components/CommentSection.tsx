import React, { useState } from "react";
import { User, Comment, Reply, ProductRequest } from "../slice";

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
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useAppDispatch } from "../hooks";

interface Props {
  content: string | JSX.Element;
  user: User;
  onSubmitHandler: (
    values: FormData,
    helper: FormikHelpers<FormData>
  ) => Promise<string>;
}

interface FormData {
  content: "";
}

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

export default function CommentSection(props: Props) {
  const [showAddReplyForm, setShowAddReplyForm] = useState(false);

  return (
    <div>
      <div className="flex items-center">
        <img
          className="rounded-full h-10"
          src={userAvatar(props.user)}
          alt=""
        />
        <div className="ml-4">
          <div className="text-[#3A4374] font-bold">{props.user.name}</div>
          <div>@{props.user.username}</div>
        </div>
        <div
          className="ml-auto text-[#4661E6] font-semibold"
          onClick={() => setShowAddReplyForm(!showAddReplyForm)}
        >
          Reply
        </div>
      </div>
      <div className="mt-6">{props.content}</div>
      {showAddReplyForm && (
        <div className="flex flex-col items-end">
          <Formik
            initialValues={
              {
                content: "",
              } as FormData
            }
            onSubmit={async (values, helper) => {
              await props.onSubmitHandler(values, helper);
              setShowAddReplyForm(false);
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="mt-6 w-full flex flex-col">
                <Field
                  as="textarea"
                  title="content"
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
                    title="submit"
                  >
                    Post Comments
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
