### Data

The data from the backend was in the form of An `OrderedDict` (dictionary subclass that remembers the order that keys were first inserted). It preserves the order in which the keys are inserted.

In `frontend/blog-app/src/components/Home.tsx`, 
```tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllPosts,
  ...
} from '../features/blogs/BloggerSlice';
const Home = () => {
  ...
  const allpostsString: string = useSelector(selectAllPosts); 
  // selects data from the store in the form of `OrderedDict` as string
    if (allpostsString !== undefined) {
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
      // console.log(jsonresultArray);
      ...
    }
  ...
}
```

where `frontend/blog-app/src/features/blogs/BlogExcerpt.tsx` is
```tsx
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
      {/* Access post in your component */}
      <p>Post ID: {id}</p>
      <h2>Title: {post.title}</h2>
      <p> Description: {post.description}</p>
      {/* <p>Post = {post}</p> */}
    </div>
  );
};
export default BlogExcerpt;
```

For individual blog page `frontend/blog-app/src/components/OneBlog.tsx`
```tsx
...

if (postsStatus === 'succeeded' && allpostsString !== undefined) {
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
        const jsonresultArray = JSON.parse(`[${jsonformattedString}]`);
        // console.log(jsonformattedString);
        // console.log("inside jsonresultArray =",jsonresultArray)
        
        // console.log("finding id ", jsonresultArray.find(item => jsonresultArray.id == 4));

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
      
    }
    ...
```
