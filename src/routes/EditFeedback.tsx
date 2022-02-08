import React from "react";
import { useParams } from "react-router-dom";

export default function EditFeedback() {
  const params = useParams();
  return <div>Edit Feedback {params.feedbackId}</div>;
}
