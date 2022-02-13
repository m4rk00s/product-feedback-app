import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialData from './data.json'

export type RequestId = number;

export type Category = "All" | "UI" | "UX" | "Enhancement" | "Bug" | "Feature"

export type SortBy = "Most Upvotes" | "Least Upvotes" | "Most Comments" | "Least Comments"

export interface ProductRequest {
    id: number
    title: string
    category: Category
    upvotes: number
    status: string
    description: string
    comments?: Comment[]
}

export interface Comment {
    id: number
    content: string
    user: User
    replies?: Reply[]
}

export interface FormAddComment {
    productRequest: ProductRequest
    comment: Comment
}

export interface FormAddReply {
    productRequest: ProductRequest
    comment: Comment
    reply: Reply
}

export interface Reply {
    content: string
    replyingTo: string
    user: User
}

export interface User {
    image: string
    name: string
    username: string
}

export interface AppState {
    currentUser: User
    categories: Category[]
    sortBy: SortBy
    upvotedRequestIds: RequestId[]
    productRequests: ProductRequest[]
}

const initialState: AppState = {
    currentUser: initialData.currentUser,
    categories: ["All", "UI", "UX", "Enhancement", "Bug", "Feature"],
    sortBy: "Most Upvotes",
    productRequests: initialData.productRequests as ProductRequest[],
    upvotedRequestIds: []
}

export const feedbackSlice = createSlice({
    name: 'feedbacks',
    initialState: (initialState as AppState),
    reducers: {
        upvoteRequest: (state, action: PayloadAction<RequestId>) => {
            state.productRequests = state.productRequests
                .map(product => {
                    if (product.id === action.payload) {
                        if (state.upvotedRequestIds.includes(action.payload)) {
                            product.upvotes = product.upvotes - 1
                        } else {
                            product.upvotes = product.upvotes + 1
                        }
                    }

                    return product
                })

            if (state.upvotedRequestIds.includes(action.payload)) {
                state.upvotedRequestIds = state.upvotedRequestIds.filter(id => id !== action.payload)
            } else {
                state.upvotedRequestIds = state.upvotedRequestIds.concat([action.payload])
            }
        },
        addComment: (state, action: PayloadAction<FormAddComment>) => {
            state.productRequests = state.productRequests
                .map(product => {
                    if (product.id === action.payload.productRequest.id) {
                        action.payload.comment.id = product.comments?.length ?? 0

                        if (product.comments === undefined) {
                            product.comments = []
                        }

                        product.comments?.push(action.payload.comment)
                    }

                    return product
                })
        },
        addReply: (state, action: PayloadAction<FormAddReply>) => {
            state.productRequests = state.productRequests
                .map(product => {
                    if (product.id === action.payload.productRequest.id) {
                        product.comments = product.comments?.map(comment => {
                            if (comment.id === action.payload.comment.id) {
                                if (comment.replies === undefined) {
                                    comment.replies = []
                                }

                                comment.replies?.push(action.payload.reply)
                            }

                            return comment
                        })
                    }

                    return product
                })
        }
    },
})

export const { upvoteRequest, addComment, addReply } = feedbackSlice.actions

export default feedbackSlice.reducer