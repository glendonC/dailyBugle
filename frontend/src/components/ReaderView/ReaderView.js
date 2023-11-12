import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import { Container, Box, Typography, TextField, Paper } from '@mui/material';

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

        // Function to handle editing a comment
        const handleEditComment = async (commentId, newContent) => {
            // Prompt for new content, return if no changes
            const updatedContent = window.prompt("Edit your comment:", newContent);
            if (!updatedContent || updatedContent === newContent) return;
        
            try {
                const response = await fetch(`http://localhost:5001/api/comments/${commentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include authorization token if required
                    },
                    body: JSON.stringify({ content: updatedContent }),
                });
        
                const updatedComment = await response.json();
                if (response.ok) {
                    // Update the stories state to reflect the edited comment
                    setStories(stories.map(story => ({
                        ...story,
                        comments: story.comments.map(comment =>
                            comment._id === commentId ? { ...comment, content: updatedContent } : comment
                        ),
                    })));
                } else {
                    throw new Error(updatedComment.message || 'Failed to edit comment');
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error in editing comment
            }
        };
        
    
        // Function to handle deleting a comment
        const handleDeleteComment = async (commentId, storyId) => {
            try {
                const response = await fetch(`http://localhost:5001/api/comments/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include authorization token if required
                    }
                });
        
                if (response.ok) {
                    // Remove the deleted comment from the state
                    setStories(stories.map(story => {
                        if (story._id === storyId) {
                            return {
                                ...story,
                                comments: story.comments.filter(comment => comment._id !== commentId)
                            };
                        }
                        return story;
                    }));
                } else {
                    throw new Error('Failed to delete comment');
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error in deleting comment
            }
        };
        
    
        return (
            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h4">Reader's View</Typography>
                    <TextField
                        fullWidth
                        label="Search stories..."
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        margin="normal"
                    />
                    {filteredStories.map((story) => (
                        <Box key={story._id} my={2} p={2} component={Paper} elevation={2}>
                            <Typography variant="h5">{story.title}</Typography>
                            <Typography variant="body1" gutterBottom>{story.content}</Typography>
                            <CommentForm onCommentSubmit={(commentContent) => submitComment(commentContent, story._id)} />
                            <CommentList
                                comments={story.comments || []}
                                currentUserId={auth.userId}
                                onEditComment={handleEditComment}
                                onDeleteComment={handleDeleteComment}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        );
};

export default ReaderView;





