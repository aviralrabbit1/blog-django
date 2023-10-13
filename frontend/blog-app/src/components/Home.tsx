import React, { useEffect } from 'react'
import SidePanel from './SidePanel'
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
            <div>
                <SidePanel/>
            </div>
        </div>
    </div>
  )
}

export default Home
