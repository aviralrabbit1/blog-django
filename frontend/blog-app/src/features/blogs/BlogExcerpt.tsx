import React from 'react'
import { BloggerSliceState, PostType } from './BloggerSlice'

interface BlogExcerptProps {
  post: PostType[];
  postId: number;
}

const BlogExcerpt: React.FC<BlogExcerptProps> = ({ post, postId }) => {
  return (
    <div>
      {/* Access post and postId in your component */}
      {/* <h2>{post.title}</h2>
      <p>{post.description}</p> */}
      <p>Post ID: {postId}</p>
      <p>Post = {post}</p>
    </div>
  );
};

export default BlogExcerpt;