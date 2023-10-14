import React, { useEffect } from 'react';
import SidePanel from './SidePanel';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
  PostType,
} from '../features/blogs/BloggerSlice';
import BlogExcerpt from '../features/blogs/BlogExcerpt';

const Home = () => {
  const dispatch = useDispatch(); // dispatches actions to the store

  const allpostsString: string = useSelector(selectAllPosts); // selects data from the store

  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts() as any); // fetching data when the component mounts.
    }
  }, [dispatch, postsStatus]);

  let content; // conditionally rendered content based on the `postsStatus`
  if (postsStatus === 'loading') {
    content = <div className='center'> Loading ... </div>;
  } else if (postsStatus === 'succeeded') {
    if (allpostsString !== undefined) {
      // console.log(` Now, allpostsString is ${allpostsString}`);

      const jsonformattedString = allpostsString
        .replace(/'/g, '"')
        .replace(/",/g, '":') // Replace ', with :
        .replace(/\),/g, ',') // Replace ), with ,
        .replace(/\[/g, '{') // Replace [ with {
        .replace(/\)]/g, '}') // Replace ] with }
        .replace(')OrderedDict(', ',') // Replace )OrderedDict( with ,
        .replace('OrderedDict(', '') // Replace OrderedDict( with [
        .replace(/\("/g, '"')
        .replace(/\)/g, '');
      // .replace(/'/g, '"');
      // Parse the formatted string into a JavaScript array
      // console.log(jsonformattedString);

      const jsonresultArray = JSON.parse(`[${jsonformattedString}]`);
      // console.log(jsonresultArray);

      for (let post of jsonresultArray) {
        // console.log(`Post is ${post}`);

        content = jsonresultArray.map((post: PostType) => (
          <BlogExcerpt key={post.id} post={post} />
        ));
      }
    }
  } else if (postsStatus === 'failed') {
    content = <p> Failed due to {postsError} </p>;
  }

  return (
    <div className='container m-auto mt-5'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2 shadow-lg text-center pl-12 py-3'>
          <div>{content}</div>
        </div>
        <div>
          <SidePanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
