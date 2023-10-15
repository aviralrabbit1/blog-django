import React from 'react';
import { BloggerSliceState, PostType } from './BloggerSlice';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
interface BlogExcerptProps {
  post: PostType;
}

const BlogExcerpt: React.FC<BlogExcerptProps> = ({ post }) => {

  // Destructuring post
  const { id, title, description, image_url, date_posted, owner, category  } = post;

  const date = post && date_posted ? new Date(date_posted) : new Date();
  let options = {year: "numeric", month:"long", day:"numeric"};
  const formatDate = date.toLocaleDateString("en-US", options);
  return (
    <div className='w-80 shadow-lg' >
      {/* Access post and postId in your component */}
      <img className='object-cover rounded-lg w-full h-72'
      src={image_url} alt={`${title}`} />
      <div className='mb-3'>
        <div className='flex justify-between items-center px-3 mt-3 bg-purple-600 text-white font-semibold'> 
          <div>
            <p>Posted by: {owner}</p>
          </div>
          <div>
            <AccessTimeIcon className='text-sm me-2' />
            {formatDate}
          </div>
        </div>
        {/* <p>Post ID: {id}</p> */}
        <h1 className='font-bold' >{title}</h1>
        <p>{description.substring(0,90)}... <button><span className='font-bold text-blue-500 underline'>Read more</span></button> </p>
        {/* <p>Post = {post}</p> */}
      </div>
    </div>
  );
};

export default BlogExcerpt;