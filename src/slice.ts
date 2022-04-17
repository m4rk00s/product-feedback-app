import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialData from "./data.json";

export type RequestId = number;

export type Category = "ui" | "ux" | "enhancement" | "bug" | "feature";

export type Status = "suggestion" | "planned" | "in-progress" | "live";

export interface ProductRequest {
  id: number;
  title: string;
  category: Category;
  upvotes: number;
  status: Status;
  description: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
}

export interface FormAddComment {
  productRequest: ProductRequest;
  comment: Comment;
}

export interface FormAddReply {
  productRequest: ProductRequest;
  comment: Comment;
  reply: Reply;
}

export interface FormCreateNewFeedback {
  title: string;
  category: Category;
  detail: string;
}

export interface FormEditFeedback {
  feedbackId: number;
  title: string;
  category: Category;
  status: Status;
  detail: string;
}

export interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}

export interface User {
  image: string;
  name: string;
  username: string;
}

export interface AppState {
  currentUser: User;
  categories: Category[];
  statuses: StatusInfo[];
  upvotedRequestIds: RequestId[];
  productRequests: ProductRequest[];
}

export interface StatusInfo {
  status: Status;
  accentColor: string;
  description: string;
}

const initialState: AppState = {
  currentUser: initialData.currentUser,
  categories: ["ui", "ux", "enhancement", "bug", "feature"],
  statuses: [
    {
      status: "suggestion",
      accentColor: "",
      description: "",
    },
    {
      status: "planned",
      accentColor: "#F49F85",
      description: "Ideas prioritized for research",
    },
    {
      status: "in-progress",
      accentColor: "#AD1FEA",
      description: "Currently being developed",
    },
    {
      status: "live",
      accentColor: "#62BCFA",
      description: "Released features",
    },
  ],
  productRequests: initialData.productRequests as ProductRequest[],
  upvotedRequestIds: [],
};

export const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState: initialState as AppState,
  reducers: {
    removeFeedback: (state, action: PayloadAction<RequestId>) => {
      state.productRequests = state.productRequests.filter(
        (p) => p.id !== action.payload
      );
    },
    editFeedback: (state, action: PayloadAction<FormEditFeedback>) => {
      state.productRequests = state.productRequests.map((product) => {
        if (product.id === action.payload.feedbackId) {
          product.title = action.payload.title;
          product.category = action.payload.category;
          product.status = action.payload.status;
          product.description = action.payload.detail;
        }

        return product;
      });
    },
    createNewFeedback: (
      state,
      action: PayloadAction<FormCreateNewFeedback>
    ) => {
      state.productRequests.push({
        id: state.productRequests.length + 1,
        title: action.payload.title,
        category: action.payload.category,
        upvotes: 0,
        status: "suggestion",
        description: action.payload.detail,
        comments: [],
      });
    },
    upvoteRequest: (state, action: PayloadAction<RequestId>) => {
      state.productRequests = state.productRequests.map((product) => {
        if (product.id === action.payload) {
          if (state.upvotedRequestIds.includes(action.payload)) {
            product.upvotes = product.upvotes - 1;
          } else {
            product.upvotes = product.upvotes + 1;
          }
        }

        return product;
      });

      if (state.upvotedRequestIds.includes(action.payload)) {
        state.upvotedRequestIds = state.upvotedRequestIds.filter(
          (id) => id !== action.payload
        );
      } else {
        state.upvotedRequestIds = state.upvotedRequestIds.concat([
          action.payload,
        ]);
      }
    },
    addComment: (state, action: PayloadAction<FormAddComment>) => {
      state.productRequests = state.productRequests.map((product) => {
        if (product.id === action.payload.productRequest.id) {
          action.payload.comment.id = product.comments?.length ?? 0;

          if (product.comments === undefined) {
            product.comments = [];
          }

          product.comments?.push(action.payload.comment);
        }

        return product;
      });
    },
    addReply: (state, action: PayloadAction<FormAddReply>) => {
      state.productRequests = state.productRequests.map((product) => {
        if (product.id === action.payload.productRequest.id) {
          product.comments = product.comments?.map((comment) => {
            if (comment.id === action.payload.comment.id) {
              if (comment.replies === undefined) {
                comment.replies = [];
              }

              comment.replies?.push(action.payload.reply);
            }

            return comment;
          });
        }

        return product;
      });
    },
  },
});

export const {
  removeFeedback,
  editFeedback,
  createNewFeedback,
  upvoteRequest,
  addComment,
  addReply,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
