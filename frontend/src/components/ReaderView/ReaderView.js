// ReaderView.js
import React, { useEffect, useState } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import { useAuth } from '../../AuthContext';

const ReaderView = () => {
    const [stories, setStories] = useState([]);
    const [filteredStories, setFilteredStories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { auth } = useAuth();

    useEffect(() => {
        // Fetch stories along with their comments
        const fetchStories = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/stories');
                const storyData = await response.json();
                if (response.ok) {
                    const storiesWithComments = await Promise.all(storyData.map(async (story) => {
                        const commentResponse = await fetch(`http://localhost:5001/api/comments/story/${story._id}`);
                        const commentData = await commentResponse.json();
                        return { ...story, comments: commentData };
                    }));
                    setStories(storiesWithComments);
                    setFilteredStories(storiesWithComments); // Initialize filteredStories with all stories
                } else {
                    throw new Error('Failed to fetch stories');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchStories();
    }, []);

    const submitComment = async (content, storyId) => {
        try {
            const response = await fetch('http://localhost:5001/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include authorization token if required
                },
                body: JSON.stringify({
                    content, // Content of the comment
                    author: auth.userId, // Replace with actual logged-in user's ID
                    story: storyId, // Story ID to which the comment belongs
                }),
            });
    
            const newComment = await response.json();
            if (response.ok) {
                // Update the stories state to include the new comment
                setStories(stories.map(story => {
                    if (story._id === storyId) {
                        return { ...story, comments: [...story.comments, newComment] };
                    }
                    return story;
                }));
            } else {
                throw new Error(newComment.message || 'Failed to submit comment');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error in submitting comment
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value === '') {
            setFilteredStories(stories);
        } else {
            const filtered = stories.filter(story => 
                story.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                story.content.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredStories(filtered);
        }
    };
    
    return (
        <div>
            <h1>Reader's View</h1>
            <input 
                type="text" 
                placeholder="Search stories..." 
                value={searchQuery} 
                onChange={handleSearchChange} 
            />
            {filteredStories.map((story) => (
                <div key={story._id}>
                    <h2>{story.title}</h2>
                    <p>{story.content}</p>
                    <CommentForm onCommentSubmit={(commentContent) => submitComment(commentContent, story._id)} />
                    <CommentList comments={story.comments || []} />
                </div>
            ))}
        </div>
    );
};

export default ReaderView;





