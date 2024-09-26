import React from 'react';

const PostType = ({ postType, setPostType }) => {
  const handleTypeChange = (e) => {
    setPostType(e.target.value); // Update state
  };

  return (
    <div className="post-type-switch">
      <div>
        <input
          id="option-question"
          name="postType"
          value="question"
          checked={postType === 'question'}
          type="radio"
          onChange={handleTypeChange}
        />
        <label htmlFor="option-question">
          <span></span>
          Question
        </label>
      </div>
      <div>
        <input
          id="option-article"
          name="postType"
          value="article"
          type="radio"
          checked={postType === 'article'}
          onChange={handleTypeChange}
        />
        <label htmlFor="option-article">
          <span></span>
          Article
        </label>
      </div>
    </div>
  );
};

export default PostType;
