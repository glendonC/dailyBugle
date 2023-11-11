// CommentList.js
import React from 'react';

const CommentList = ({ comments }) => {
    return (
        <div>
            <h3>Comments</h3>
            {comments.map((comment) => (
                <div key={comment._id}>
                    <strong>{comment.author.username}</strong> {/* Update this if needed */}
                    <p>{comment.content}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
