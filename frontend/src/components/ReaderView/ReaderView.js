import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import AdBanner from '../AdBanner/AdBanner';
import { Container, Box, Typography, Paper, TextField, Chip, Button } from '@mui/material';

const ReaderView = () => {
    const [stories, setStories] = useState([]);
    const [filteredStories, setFilteredStories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { auth } = useAuth();
    const [currentStory, setCurrentStory] = useState(null);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [adImpressionTracked, setAdImpressionTracked] = useState(false);
    useEffect(() => {
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
                    setFilteredStories(storiesWithComments);
                    setAdImpressionTracked(true);  // Set the ad impression to be tracked
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
                },
                body: JSON.stringify({
                    content,
                    author: auth.userId,
                    story: storyId,
                }),
            });
    
            const newComment = await response.json();
            if (response.ok) {
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
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    
        if (e.target.value === '') {
            setCurrentStory(stories[0]);
            setCurrentStoryIndex(0);
        } else {
            const index = stories.findIndex(story => 
                story.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                story.content.toLowerCase().includes(e.target.value.toLowerCase())
            );
    
            if (index !== -1) {
                setCurrentStory(stories[index]);
                setCurrentStoryIndex(index);
            }
        }
    };
    

    const handleEditComment = async (commentId, newContent) => {
        const updatedContent = window.prompt("Edit your comment:", newContent);
        if (!updatedContent || updatedContent === newContent) return;
    
        try {
            const response = await fetch(`http://localhost:5001/api/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: updatedContent }),
            });
    
            const updatedComment = await response.json();
            if (response.ok) {
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
        }
    };
        
    
    const handleDeleteComment = async (commentId, storyId) => {
        try {
            const response = await fetch(`http://localhost:5001/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.ok) {
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
        }
    };
        
    const handleNextStory = () => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            setCurrentStory(stories[currentStoryIndex + 1]);
        }
    };
        
    const handlePreviousStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
            setCurrentStory(stories[currentStoryIndex - 1]);
        }
    };
        
    
    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4">Reader's View</Typography>
                
                {}
                <TextField
                    fullWidth
                    label="Search stories..."
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    margin="normal"
                />
    
                {}
                {currentStory && (
                    <Box my={2} p={2} component={Paper} elevation={2}>
                        <Typography variant="h5">{currentStory.title}</Typography>
                        {}
                        {currentStory.category && (
                            <Chip label={currentStory.category.name} color="primary" size="small" style={{ margin: '10px 0' }} />
                        )}
                        <Typography variant="body1" gutterBottom>{currentStory.content}</Typography>
                        <CommentForm onCommentSubmit={(commentContent) => submitComment(commentContent, currentStory._id)} />
                        <CommentList
                            comments={currentStory.comments || []}
                            currentUserId={auth.userId}
                            onEditComment={handleEditComment}
                            onDeleteComment={handleDeleteComment}
                        />
                    </Box>
                )}
                {!currentStory && <Typography>Loading story...</Typography>}
    
                {}
                <Box display="flex" justifyContent="space-between" my={2}>
                    <Button onClick={handlePreviousStory} disabled={currentStoryIndex === 0}>Previous</Button>
                    <Button onClick={handleNextStory} disabled={currentStoryIndex === stories.length - 1}>Next</Button>
                </Box>
            </Box>
            <AdBanner trackImpression={adImpressionTracked} />
        </Container>
    );
        
};

export default ReaderView;





