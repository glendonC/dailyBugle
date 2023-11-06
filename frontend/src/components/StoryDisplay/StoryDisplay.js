import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../CommentList/CommentList';
import CommentForm from '../CommentForm/CommentForm';

const StoryDisplay = () => {
  const [story, setStory] = useState(null);
  const { id } = useParams(); // Gets the id from the URL

  useEffect(() => {



    // Fetch the story data from your API
    const fetchStory = async () => {
      try {
        const response = await fetch(`/api/stories/${id}`);
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
    // Here you would have functionality to post this comment to the backend
  };
  
  return (
    <article>
      <h1>{story.title}</h1>
      <p>{story.content}</p>
      <CommentForm onCommentSubmit={handleCommentSubmit} />
      <CommentList />
      {/* Render additional story details here */}
    </article>
  );

};

export default StoryDisplay;
