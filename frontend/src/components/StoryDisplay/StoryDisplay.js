import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../CommentList/CommentList';
import CommentForm from '../CommentForm/CommentForm';

const StoryDisplay = () => {
  const [story, setStory] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/stories/${id}`);
        const data = await response.json();
        setStory(data);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    fetchStory();
  }, [id]);

  if (!story) {
    return <div>Loading story...</div>;
  }

  const handleCommentSubmit = (commentContent) => {
    console.log('Comment submitted:', commentContent);
  };

  return (
    <div className="story-row">
      <div className="story-content">
        <div className="story">
          <h2>{story.title}</h2>
          <p>{story.content}</p>
        </div>
        <div className="comment-section">
          <CommentForm onCommentSubmit={handleCommentSubmit} />
          <CommentList comments={story.comments} />
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;
