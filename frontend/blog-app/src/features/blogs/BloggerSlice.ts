import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// Importing Axios for making HTTP requests and Redux Toolkit - for state management.

const apiURL = "http://127.0.0.1:8000/"; // base URL for Django API.

export interface PostType { // based on backend/BlogApp/models.py
    id: number;
    title: string;
    description: string;
    image_url: string;
    date_posted: string; 
    owner: UserType; // owner's user ID.
    category: number; // category's ID.
}

export interface UserType {
    id: number,
    name: string,
    email: string,
}

export interface BloggerSliceState {
    posts?: PostType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    categoryFilter: string | null;
}

// Initial state for the Redux store
const initialState: BloggerSliceState = {
    posts: [],
    status: 'idle',
    error: null,
    categoryFilter: null
  };

// Async thunk action fetchPosts that fetches posts from Django backend.
export const fetchPosts = createAsyncThunk("posts/fetchposts", async () => {
    const response = await axios.get(apiURL);
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setCategoryFilter: (state, action) => {
            // Redux slice using createSlice, which includes reducers for setting the categoryFilter.
            state.categoryFilter = action.payload;
        },
    },

    // extraReducers handle the different states of fetchPosts async action. 
    // It updates the state based on the API request status(pending, fulfilled, or rejected) and data.
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'An error Occured';
        })
    }
})

// Export slice actions and selectors to interact with the Redux store in the frontend application.

export const { setCategoryFilter } = postsSlice.actions;

export const selectAllPosts = (state: { posts: { posts: any; }; }) => state.posts.posts;
export const getPostsStatus = (state: { posts: BloggerSliceState }) => state.posts.status;
export const getPostsError = (state: { posts: BloggerSliceState }) => state.posts.error;
export const selectCategoryFilter = (state: { posts: BloggerSliceState }) => state.posts.categoryFilter;

export default postsSlice.reducer;
