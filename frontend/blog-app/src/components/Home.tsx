import React, { useEffect } from 'react'
import SidePanel from './SidePanel'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts, PostType } from '../features/blogs/BloggerSlice';
import BlogExcerpt from '../features/blogs/BlogExcerpt';

const Home = () => {

  const dispatch = useDispatch(); // dispatches actions to the store

  const allpostsString = useSelector(selectAllPosts); // selects data from the store

  
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

    if(allpostsString !== undefined){

    console.log(` Now, allpostsString is ${allpostsString}`);

    const formattedString = allpostsString
    .replace(/',/g, ':') // Replace ', with :
    .replace(/\),/g, ',') // Replace ), with ,
    .replace(/\[/g, '{')   // Replace [ with {
    .replace(/\)]/g, '}')   // Replace ] with }
    .replace(')OrderedDict(', ',') // Replace )OrderedDict( with ,
    .replace('OrderedDict(', '[') // Replace OrderedDict( with [
    .replace(/\('/g, '')
    .replace(/'/g, '"');
    // Parse the formatted string into a JavaScript array
    // const resultArray = JSON.parse(`[${formattedString}]`);

    // console.log(formattedString);

    const dictionaryStrings = allpostsString.split("OrderedDict(").filter((str: string) => str.trim() !== '');

  // Parse each dictionary string into a JavaScript object and store them in an array
  const resultArray: Array<{ [key: string]: any }> = dictionaryStrings.map((dictString: string) => {
    // Remove leading and trailing spaces and trailing ")"
    const trimmedDictString = dictString.trim().slice(0, -1);
    
    // Replace single quotes with double quotes to make it a valid JSON string
    const validJsonString = trimmedDictString
      .replace(/',/g, ':') // Replace ', with :
      .replace(/\),/g, ',') // Replace ), with ,
      .replace(/\[/g, '{')   // Replace [ with {
      .replace(/\)]/g, '}')   // Replace ] with }
      .replace(')OrderedDict(', ',') // Replace )OrderedDict( with ,
      .replace('OrderedDict(', '[') // Replace OrderedDict( with [
      .replace(/\('/g, '')
      .replace(/'/g, '"');
    
    // Parse the JSON string into a JavaScript object
    return validJsonString;
  });

  const finalArray = `[${resultArray}]`

    console.log(` Now, finalArray is ${finalArray}`);
      
      for(let post of finalArray){
        console.log(` Post is ${post}`);
        // const onePost: [key: string, value: any][] = post;
        // console.log(` Now, onePost is ${onePost}`);
        // const { id, title, description, image_url, date_posted, owner, category } = Object.fromEntries(onePost);

        content = resultArray.map((post) => 
          <BlogExcerpt key={post.id} postId={post.id} post={post} />
        )
        // content = <BlogExcerpt key={post} postId={resultArray[post].id} post={resultArray[post]} />
      }

      // content = resultArray.map((post) => 
      // <BlogExcerpt key={post.id} postId={post.id} post={post} />
      // )
    }
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
