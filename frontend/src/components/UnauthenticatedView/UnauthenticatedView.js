import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Box, Typography, Paper, Button } from '@mui/material';
import AdBanner from '../AdBanner/AdBanner';

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
                    console.log("useEffect in AdBanner is running");
                } else {
                    throw new Error('Failed to fetch stories');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchStories();
    }, []);

    const navigateToLogin = () => {
        history.push('/login');
    };

    const navigateToSignup = () => {
        history.push('/signup');
    };

    return (
        <Container maxWidth="md">
            <Box my={4} textAlign="center">
                <Button onClick={navigateToLogin} variant="contained" color="primary" style={{ marginRight: 10 }}>
                    Login
                </Button>
                <Button onClick={navigateToSignup} variant="contained" color="secondary">
                    Sign Up
                </Button>
            </Box>
            <Grid container spacing={3}>
                {stories.map((story) => (
                    <Grid item xs={12} key={story._id}>
                        <Paper elevation={2} style={{ padding: 16 }}>
                            <Typography variant="h6">{story.title}</Typography>
                            <Typography variant="body1">{story.teaser}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <AdBanner trackImpression={true} />
        </Container>
    );
};

export default UnauthenticatedView;
