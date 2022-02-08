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
                    if (product.id === action.payload && state.upvotedRequestIds.includes(action.payload)) {
                        // user mau downvote
                        return { ...product, upvotes: product.upvotes - 1 }
                    } else if (product.id === action.payload && !state.upvotedRequestIds.includes(action.payload)) {
                        // user mau upvote
                        return { ...product, upvotes: product.upvotes + 1 }
                    } else {
                        return product
                    }
                })

            if (state.upvotedRequestIds.includes(action.payload)) {
                state.upvotedRequestIds = state.upvotedRequestIds.filter(id => id !== action.payload)
            } else {
                state.upvotedRequestIds = state.upvotedRequestIds.concat([action.payload])
            }
        }
    },
})

export const { upvoteRequest } = feedbackSlice.actions

export default feedbackSlice.reducer