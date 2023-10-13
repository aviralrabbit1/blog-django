### Redux toolkit

In `src/features/blogs/BloggerSlice.ts`,

```ts
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// Importing Axios for making HTTP requests and Redux Toolkit - for state management.

const apiURL = "http://127.0.0.1:8000/"; // base URL for Django API.

export interface PostType { // based on backend/BlogApp/models.py
    id: number;
    title: string;
    description: string;
    image_url: URL;
    date_posted: Date; 
    owner: UserType; // owner's user ID.
    category: number; // category's ID.
}

export interface UserType {
    id: number,
    name: string,
    email: string,
}

export interface BloggerSliceState {
    posts: Post[];
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

export const selectAllPosts = (state: { posts: BloggerSliceState }) => state.posts.posts;
export const getPostsStatus = (state: { posts: BloggerSliceState }) => state.posts.status;
export const getPostsError = (state: { posts: BloggerSliceState }) => state.posts.error;
export const selectCategoryFilter = (state: { posts: BloggerSliceState }) => state.posts.categoryFilter;

export default postsSlice.reducer;
```

Import `postReducer` in `frontend/blog-app/src/app/store.ts`,
```ts
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import postReducer from '../features/blogs/BloggerSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer
  },
})
```

### In `frontend/blog-app/src/components/Home.tsx`, 
Use Redux for state management and conditionally render content(fetches and displays a list of blog posts) based on the status of the API request (loading, success, or error).
```tsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from '../features/blogs/BloggerSlice';
import BlogExcerpt from '../features/blogs/BlogExcerpt';

const Home = () => {
  const dispatch = useDispatch(); // dispatches actions to the store
  const allPosts = useSelector(selectAllPosts); // selects data from the store
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if(postsStatus === 'idle'){
      dispatch(fetchPosts()); // fetching data when the component mounts.
    }
  }, [dispatch, postsStatus])
  
  let content; // conditionally rendered content based on the `postsStatus`
  if(postsStatus === "loading"){
    content = <div className='center'> Loading ... </div>
  } else if(postsStatus === "succeeded"){
    content = allPosts.map((post) => 
    <BlogExcerpt key={post.id} id={post.id} post={post} />
    )
  } else if(postsStatus === "failed"){
    content = <p> Failed due to {postsError} </p>
  }

  return (
    <div className='container m-auto mt-5'>
        <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-2 shadow-lg text-center pl-12 py-3'>
                <div>
                {content}
                </div>
            </div>
            ...
        </div>
    </div>
  )
}

export default Home
```

Where <BlogExcerpt> is `frontend/blog-app/src/features/blogs/BlogExcerpt.tsx`,
```tsx
import React from 'react'
import { BloggerSliceState, PostType } from './BloggerSlice'

const BlogExcerpt = (props: PostType[]) => {
  return (
    <div>BlogExcerpt</div>
  )
}

export default BlogExcerpt
```
