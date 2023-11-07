// frontend/src/components/StoryList/StoryList.js

import React, { useState, useEffect } from 'react';

const StoryList = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/stories`);;
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new TypeError('Data is not an array');
        }
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
        // Handle error state appropriately, perhaps setting an error state
      }
    };

    fetchStories();
  }, []);


  return (
    <div>
      {stories.map((story) => (
        <div key={story._id}>
        <h3>{story.title}</h3>
        <p>{story.content}</p>
        {}
        </div>
      ))}
    </div>
  );
};

export default StoryList;
