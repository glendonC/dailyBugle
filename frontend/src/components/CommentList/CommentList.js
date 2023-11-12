// CommentList.js
import React from 'react';

const CommentList = ({ comments, currentUserId, onEditComment }) => {
  return (
      <div>
          <h3>Comments</h3>
          {comments.map((comment) => (
              <div key={comment._id}>
                  <strong>{comment.author.username}</strong>
                  <p>{comment.content}</p>
                  {comment.author === currentUserId && (
                      <button onClick={() => onEditComment(comment)}>Edit</button>
                  )}
              </div>
          ))}
      </div>
  );
};

export default CommentList;
