import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import postsReducer from '../features/blogs/BloggerSlice';
import postReducer from '../features/blogs/OneBlogSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
