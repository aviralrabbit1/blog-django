import React from 'react';
import { PostType } from './BloggerSlice';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';

interface OneBlogExcerptProps {
  post: PostType;
}

interface optionsType {
  year: "numeric" | undefined, 
  month:"numeric" | "2-digit" | "long" | "short" | "narrow" | undefined, 
  day:"numeric" | "2-digit" | undefined
}

const OneBlogExcerpt: React.FC<OneBlogExcerptProps> = ({ post }) => {

  // Destructuring post
  // console.log(post)
  const { id, title, description, image_url, date_posted, owner, category  } = post;

  const date = post && date_posted ? new Date(date_posted) : new Date();
  let options: optionsType = {year: "numeric", month:"2-digit", day:"numeric"};
  const formatDate = date.toLocaleDateString("en-US", options);

  return (
    <div className='mt-2' >
      <div className='flex bg-purple-500 justify-around text-white font-bold text-lg items-center'>
        <h5>Posted by: {owner}</h5>
            <p className='flex gap-1 items-center'>
              <AccessTimeIcon className='text-sm' />
              {formatDate}
            </p>
      </div>
      {/* Access post and postId in your component */}
      <img className='object-contain rounded-lg px-2 mt-3 h-96 w-full'
      src={image_url} alt={`${title}`} />
      <div className='mt-3 text-center'>
        <h1 className='font-extrabold text-2xl underline cursor-pointer'>{title} </h1>
        <p className='mt-2 text-start ml-3 antialiased'>{description} </p>
      </div>
    </div>
  );
};

export default OneBlogExcerpt;