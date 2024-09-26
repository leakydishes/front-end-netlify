import React, { useState } from 'react';
import PostType from '../PostType'; 
import Post from '../Post';
import '../PostPage.css'

const PostPage = () => {
  const [postType, setPostType] = useState('question'); // Default to 'question'

  return (
    <div className="post-page">
      <h2>Create a New Post</h2>
      
      {/* PostType selector */}
      <PostType postType={postType} setPostType={setPostType} />

      {/* Pass to Post */}
      <Post postType={postType} />
    </div>
  );
};

export default PostPage;
