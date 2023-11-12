import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const UnauthenticatedView = () => {
    const [stories, setStories] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/stories');
                const storyData = await response.json();
                if (response.ok) {
                    setStories(storyData);
                } else {
                    throw new Error('Failed to fetch stories');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchStories();
    }, []);

    // Function to handle navigation to login
    const navigateToLogin = () => {
        history.push('/login');
    };

    // Function to handle navigation to sign up
    const navigateToSignup = () => {
        history.push('/signup');
    };

    return (
        <div>
            <button onClick={navigateToLogin}>Login</button>
            <button onClick={navigateToSignup}>Sign Up</button>
            {stories.map((story) => (
                <div key={story._id}>
                    <h2>{story.title}</h2>
                    <p>{story.content}</p>
                    {}
                </div>
            ))}
        </div>
    );
};

export default UnauthenticatedView;