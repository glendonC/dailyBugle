import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Container } from '@mui/material';

const AuthorView = () => {
    const [story, setStory] = useState({
        title: '',
        teaser: '',
        content: '',
        category: ''
    });
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const { auth } = useAuth();

    useEffect(() => {
        fetch('http://localhost:5001/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStory({ ...story, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Submission logic remains the same
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
            </Box>
        </Container>
    );
};

export default AuthorView;
