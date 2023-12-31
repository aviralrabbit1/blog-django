import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   selectAllPosts,
//   getPostsStatus,
//   getPostsError,
//   fetchPosts,
//   PostType,
// } from '../features/blogs/BloggerSlice';
import OneBlogExcerpt from '../features/blogs/OneBlogExcerpt';
import SidePanel from './SidePanel';
import { fetchPostById, getPostError, getPostStatus, selectedPost } from '../features/blogs/OneBlogSlice';

const OneBlog = () => {
  const { id }  = useParams(); // Get the "id" parameter from the URL
  // console.log("id from params = ", id);

    const dispatch = useDispatch(); // dispatches actions to the store

    const thisPost = useSelector(selectedPost); // selects data from the store
  
    const postsStatus = useSelector(getPostStatus);
    const postsError = useSelector(getPostError);
  
    useEffect(() => {
        dispatch(fetchPostById(id) as any); // fetching data when the component mounts.
    }, [dispatch]);
  
    let content; // conditionally rendered content based on the `postsStatus`
    if (postsStatus === 'loading') {
      content = <div className='center'> Loading ... </div>;
    } else if (postsStatus === 'succeeded' && thisPost !== undefined) {
      // const thisPost: string = useSelector(selectAllPosts); // selects data from the store
        // console.log(` Now, thisPost is ${thisPost}`);
      /*
        const jsonformattedString = thisPost
          .split(')OrderedDict(').join(',')
          .replace('OrderedDict(', '') // Replace OrderedDict( with [
          .replace(/'/g, '"')
          .replace(/",/g, '":') // Replace ', with :
          .replace(/\),/g, ',') // Replace ), with ,
          .replace(/\[/g, '{') // Replace [ with {
          .replace(/\)]/g, '}') // Replace ] with }
          .replace(/\("/g, '"')
          .replace(/\)/g, '')

        // Parse the formatted string into a JavaScript array
        const jsonresultArray = JSON.parse(`[${jsonformattedString}]`);
        console.log(jsonformattedString);
        console.log("inside jsonresultArray =",jsonresultArray)

        console.log("finding id ", jsonresultArray.find(item => jsonresultArray.id == 4));

        function findObjectWithId(id: string | undefined) {
          return jsonresultArray.find((item: { id: string | undefined; }) => item.id == id);
        }

        const result = findObjectWithId(id);

        if (result) {
          console.log(`JSON for id ${id}:`, result);
        } else {
          console.log(`No object with id ${id} found.`);
        }

        content = <OneBlogExcerpt post={result}/>       */
        content = <OneBlogExcerpt post={thisPost}/>
      
    } else if (postsStatus === 'failed') {
      content = <p> Failed due to {postsError} </p>;
    }

  // Render the full blog post details
  return (
    <div className='container m-auto mt-5' >
      <div className='grid grid-cols-3 gap-4' >
        <div className='col-span-2 shadow-lg text-center'>
          <div className='container'>{content} </div>
        </div>
        <div><SidePanel /></div>
      </div>
    </div>
  );
};

export default OneBlog;
