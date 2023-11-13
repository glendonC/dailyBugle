import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Container } from '@mui/material';

const AuthorView = () => {
    const [story, setStory] = useState({
        title: '',
        teaser: '',
        content: '',
        category: '',
        id: null
    });    
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [authorStories, setAuthorStories] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        // Fetch categories
        fetch('http://localhost:5001/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    
        if (auth.userId) {
            fetch(`http://localhost:5001/api/stories/author/${auth.userId}`)
                    .then(response => response.json())
                    .then(storiesData => setAuthorStories(storiesData))
                    .catch(error => console.error('Error fetching author\'s stories:', error));
            }
        }, [auth.userId]);
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStory({ ...story, [name]: value });
    };

    const handleEditStory = (storyToEdit) => {
        setStory({
            title: storyToEdit.title,
            teaser: storyToEdit.teaser,
            content: storyToEdit.content,
            category: storyToEdit.category,
            id: storyToEdit._id
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = story.id ? 'PUT' : 'POST';
        const endpoint = story.id 
        ? `http://localhost:5001/api/stories/${story.id}` 
        : 'http://localhost:5001/api/stories';
    
            
        
        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: story.title,
                    teaser: story.teaser,
                    content: story.content,
                    category: story.category,
                    author: auth.userId
                }),
            });
        
            const data = await response.json();
            if (response.ok) {
                if (story.id) {
                    setAuthorStories(authorStories.map(item => 
                        item._id === story.id ? data : item
                    ));
                    setMessage('Story updated successfully!');
                } else {
                    setAuthorStories([...authorStories, data]);
                    setMessage('Story submitted successfully!');
                }
                // Clear the form fields
                setStory({ title: '', teaser: '', content: '', category: '', id: null }); 
            } else {
                throw new Error(data.message || 'Failed to submit story');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while submitting the story.');
        }
    };
    
    
    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4">Author's View</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth 
                        label="Title" 
                        name="title" 
                        value={story.title} 
                        onChange={handleChange} 
                        margin="normal"
                    />
                    <TextField 
                        fullWidth 
                        label="Teaser" 
                        name="teaser" 
                        value={story.teaser} 
                        onChange={handleChange} 
                        margin="normal"
                    />
                    <TextField 
                        fullWidth 
                        label="Content" 
                        name="content" 
                        multiline 
                        rows={4} 
                        value={story.content} 
                        onChange={handleChange}
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select 
                            name="category" 
                            value={story.category} 
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit" margin="normal">
                        Publish Story
                    </Button>
                </form>
                {message && <Typography color="textSecondary">{message}</Typography>}
                {authorStories.map(storyItem => (
                    <div key={storyItem._id}>
                        <h3>{storyItem.title}</h3>
                        <Button onClick={() => handleEditStory(storyItem)}>Edit</Button>
                    </div>
                ))}
            </Box>
        </Container>
    );
};

export default AuthorView;
