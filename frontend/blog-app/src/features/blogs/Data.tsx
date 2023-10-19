import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
  PostType,
  selectCategoryFilter,
} from './BloggerSlice';

import BlogExcerpt from './BlogExcerpt';

let dataJson = [];

const Data = () => {
    const dispatch = useDispatch(); // dispatches actions to the store

    const allpostsString = useSelector(selectAllPosts); // selects data from the store
  
    const postsStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostsError);

    const categoryFilter = useSelector(selectCategoryFilter);
  
    useEffect(() => {
      if (postsStatus === 'idle') {
        dispatch(fetchPosts() as any); // fetching data when the component mounts.
      }
    }, [dispatch, postsStatus]);
  
    let content; // conditionally rendered content based on the `postsStatus`
    var insideData;
    if (postsStatus === 'loading') {
      content = <div className='center'> Loading ... </div>;
    } else if (postsStatus === 'succeeded' && allpostsString !== undefined) {
      // const allpostsString: string = useSelector(selectAllPosts); // selects data from the store
        // console.log(` Now, allpostsString is ${allpostsString}`);
        console.log(typeof (allpostsString))
        
        content = allpostsString.map((post: PostType) => (
            // console.log(post.id)
            <BlogExcerpt key={post.id} post={post} postId={post.id}/>            
          ));

        /*
        // Used when directly editing the string(allpostsString)
        const jsonformattedString = allpostsString
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
        // console.log(jsonformattedString);
  
        insideData = jsonformattedString;
        
        const jsonresultArray = JSON.parse(`[${jsonformattedString}]`);
        const jsonresultArray = JSON.parse(`[{allpostsString}]`);
        console.log(jsonresultArray);
        console.log("inside insideData =",insideData)

        content = allpostsString.map((post: PostType) => (
            <BlogExcerpt key={post.id} post={post} postId={post.id}/>
          ));
  
        for (let post of jsonresultArray) {
          console.log(`Post is ${post}`);
  
          content = jsonresultArray.map((post: PostType) => (
            <BlogExcerpt key={post.id} post={post} postId={post.id}/>
          ));
        } */
      
    } else if (postsStatus === 'failed') {
      content = <p> Failed due to {postsError} </p>;
    }
    // console.log("inside outside insideData =",insideData)

  return (
    <div className='container mx-auto grid grid-cols-2 gap-2'>{content}</div>
  );
};

export default Data;
