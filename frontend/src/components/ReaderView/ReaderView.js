import React from 'react';

const ReaderView = () => {
    return (
        <div>
            <h1>Reader's View</h1>
            <div>
                {/* Story Area */}
                <p>This is where the main story will be displayed.</p>
            </div>
            <div>
                {/* Comment Submission Box */}
                <textarea placeholder="Leave your comment here"></textarea>
                <button>Submit Comment</button>
            </div>
            <div>
                {/* Comments List */}
                <p>Comments will be listed here.</p>
            </div>
            <div>
                {/* Advertisement Box */}
                <p>Advertisement space.</p>
            </div>
        </div>
    );
};

export default ReaderView;
