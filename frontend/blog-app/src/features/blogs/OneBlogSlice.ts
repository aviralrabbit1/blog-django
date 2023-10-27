import axios from 'axios';
import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PostType } from './BloggerSlice';
// Importing Axios for making HTTP requests and Redux Toolkit - for state management.

const apiURL = "http://127.0.0.1:8000/blog"; // base URL for Django API.

export interface BloggerSliceState {
    post: PostType | [];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Initial state for the Redux store
const initialState: BloggerSliceState = {
    post: [],
    status: 'idle',
    error: null,
  };

export const fetchPostById = createAsyncThunk(
    "post/fetchPostById", 
    async (postId) => {
        const response = await axios.get(`${apiURL}/${postId}`);
        // console.log(response);
        return response.data;
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: { },

    extraReducers(builder){
        builder
        .addCase(fetchPostById.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchPostById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.post = action.payload;
        })
        .addCase(fetchPostById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'An error Occured';
        })
    }
})

export const selectedPost = (state: { post: BloggerSliceState }) => state.post.post;
export const getPostStatus = (state: { post: BloggerSliceState }) => state.post.status;
export const getPostError = (state: { post: BloggerSliceState }) => state.post.error;

export default postSlice.reducer;
