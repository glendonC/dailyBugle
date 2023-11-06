import React from 'react';
import { Link } from 'react-router-dom';

// This is a mock function to fetch stories
const fetchStories = () => {
  return [
    { id: 1, title: 'Story 1', summary: 'Summary of story 1' },
    { id: 2, title: 'Story 2', summary: 'Summary of story 2' },
  ];
};

const StoryList = () => {
  // Assume stories is the state holding your fetched stories
  const stories = fetchStories();

  return (
    <div>
      {stories.map((story) => (
        <div key={story.id}>
          <Link to={`/story/${story.id}`}>
            <h2>{story.title}</h2>
            <p>{story.summary}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
