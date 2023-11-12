import React from 'react';
import './CommentList.css';

const CommentList = ({ comments, currentUserId, onEditComment, onDeleteComment }) => {
  return (
      <div>
          <div className="comment-list">
          {comments.map((comment) => (
              <div className="comment" key={comment._id}>
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
      </div>
  );
};

export default CommentList;
