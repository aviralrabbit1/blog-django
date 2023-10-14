import React from 'react'
import { BloggerSliceState, PostType } from './BloggerSlice'

interface BlogExcerptProps {
  post: PostType;
}

const BlogExcerpt: React.FC<BlogExcerptProps> = ({ post }) => {

  // Destructuring post
  const { id, title, description, image_url, date_posted, owner, category  } = post;

  return (
    <div>
      {/* Access post and postId in your component */}
      <p>Post ID: {id}</p>
      <h2>Title: {post.title}</h2>
      <p> Description: {post.description}</p>
      {/* <p>Post = {post}</p> */}
    </div>
  );
};

export default BlogExcerpt;