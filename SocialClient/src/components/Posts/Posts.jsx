
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
//import PostShare from "../PostShare/PostShare";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5040/',{
        withCredentials:true,
      });
      const { results } = response.data;
      setPosts(results);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  // const updatePosts = () => {
  //   fetchPosts();
  // };
  return (
    <div>
    {/* <PostShare updatePosts={updatePosts} /> */}
    <div className="flex flex-col gap-4 overflow-y-auto">
      {posts.map((post, id) => {
        return <Post data={post} key={id} />;
      })}
    </div>
  </div>
  );
};

export default Posts;





















// import React from 'react'
// import './Posts.css'
// import { PostsData } from '../../Data/PostsData'
// import Post from '../Post/Post'
// const Posts = () => {
//   return (
//     <div className="Posts">
//         {PostsData.map((post, id)=>{
//             return <Post data={post} id={id}/>
//         })}
//     </div>
//   )
// }

// export default Posts