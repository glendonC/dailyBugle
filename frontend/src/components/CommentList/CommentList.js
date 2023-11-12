// CommentList.js
import React from 'react';

const CommentList = ({ comments, currentUserId, onEditComment, onDeleteComment }) => {
  return (
      <div>
          <h3>Comments</h3>
          {comments.map((comment) => (
              <div key={comment._id}>
                  <strong>{comment.author.username}</strong>
                  <p>{comment.content}</p>
                  {comment.author === currentUserId && (
                    <div>
                      <button onClick={() => onEditComment(comment._id, comment.content)}>Edit</button>
                      <button onClick={() => onDeleteComment(comment._id, comment.story)}>Delete</button>
                    </div>
                  )}
              </div>
          ))}
      </div>
  );
};

export default CommentList;
