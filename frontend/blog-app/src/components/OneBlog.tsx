import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
  PostType,
} from '../features/blogs/BloggerSlice';
import BlogExcerpt from '../features/blogs/BlogExcerpt';
import OneBlogExcerpt from '../features/blogs/OneBlogExcerpt';

const OneBlog = () => {
  const { id } = useParams(); // Get the "id" parameter from the URL
  // console.log("id from params = ", id);
  const curr_id = id;

  const [post, setPost] = useState<PostType | null>(null);
  // console.log(jsonresultArray);

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
    } else if (postsStatus === 'succeeded' && allpostsString !== undefined) {
      // const allpostsString: string = useSelector(selectAllPosts); // selects data from the store
        // console.log(` Now, allpostsString is ${allpostsString}`);
  
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
          
        const jsonresultArray = JSON.parse(`[${jsonformattedString}]`);
        // console.log(jsonformattedString);
        // console.log("inside jsonresultArray =",jsonresultArray)
        console.log("finding id ", jsonresultArray.find(item => jsonresultArray.id == 4));

        function findObjectWithId(id: string | undefined) {
          return jsonresultArray.find((item: { id: string | undefined; }) => item.id == id);
        }

        const result = findObjectWithId(curr_id);

        if (result) {
          console.log(`JSON for id ${curr_id}:`, result);
        } else {
          console.log(`No object with id ${curr_id} found.`);
        }

        content = <OneBlogExcerpt post={result}/>       
      
    } else if (postsStatus === 'failed') {
      content = <p> Failed due to {postsError} </p>;
    }

  // Render the full blog post details
  return (
    <div>
      {content ? (
        <>
          {/* <h1>{post.title}</h1>
          <p>{post.description}</p> */}
          {content}
          {/* Display other post details */}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OneBlog;