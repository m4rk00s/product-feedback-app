import React from "react";
import { useParams } from "react-router-dom";

export default function FeedbackDetail() {
  const params = useParams();

  return <div>Feedback Detail {params.feedbackId}</div>;
}
