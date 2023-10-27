import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PostType } from './BloggerSlice';
// Importing Axios for making HTTP requests and Redux Toolkit - for state management.

const apiURL = "http://127.0.0.1:8000/category/"; // base URL for Django API.

export interface CategorySliceState {
    categories: [];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Initial state for the Redux store
const initialState: CategorySliceState = {
    categories: [],
    status: 'idle',
    error: null,
  };

// Async thunk action fetchPosts that fetches posts from Django backend.
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const response = await axios.get(apiURL);
    return response.data;
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},

    // extraReducers handle the different states of fetchPosts async action. 
    // It updates the state based on the API request status(pending, fulfilled, or rejected) and data.
    extraReducers(builder){
        builder
        .addCase(fetchCategories.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'An error Occured';
        })
    }
})

// Export slice actions and selectors to interact with the Redux store in the frontend application.

export const selectAllCategories = (state: { categories: CategorySliceState }) => state.categories.categories;
export const getCategoriesStatus = (state: { categories: CategorySliceState }) => state.categories.status;
export const getCategoriesError = (state: { categories: CategorySliceState }) => state.categories.error;

export default categoriesSlice.reducer;
