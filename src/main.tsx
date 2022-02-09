import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import Suggestions from "./routes/Suggestions";
import Roadmap from "./routes/Roadmap";
import NewFeedback from "./routes/NewFeedback";
import FeedbackDetail from "./routes/FeedbackDetail";
import EditFeedback from "./routes/EditFeedback";
import "./index.css";
import NotFound from "./routes/NotFound";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Suggestions />} />
          <Route path="feedbacks">
            <Route index element={<Suggestions />} />
            <Route path=":feedbackId">
              <Route index element={<FeedbackDetail />} />
              <Route path="edit" element={<EditFeedback />} />
            </Route>
            <Route path="new" element={<NewFeedback />} />
          </Route>
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
