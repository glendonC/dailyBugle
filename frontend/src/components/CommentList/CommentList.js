import React from 'react';

// Mock data
const comments = [
  { id: 1, author: 'User1', content: 'This is the first comment' },
  { id: 2, author: 'User2', content: 'This is the second comment' },
];

const CommentList = () => {
  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <strong>{comment.author}</strong>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
