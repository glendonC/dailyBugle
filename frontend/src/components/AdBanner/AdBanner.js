import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Modal, Button } from '@mui/material';
import { useAuth } from '../../AuthContext';

function AdBanner() {
    const [ad, setAd] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const { auth } = useAuth(); // Use the useAuth hook to access the auth state

    useEffect(() => {
        fetch('http://localhost:5001/api/ads/random')
            .then(response => response.json())
            .then(data => {
                setAd(data);
                fetch('http://localhost:5001/api/ads/impression', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ adId: data._id, userId: auth.userId })
                });
            })
            .catch(error => console.error('Error fetching random ad:', error));
    }, [auth.userId]); // Add auth.userId as a dependency

    const handleAdClick = () => {
        if (ad) {
            fetch('http://localhost:5001/api/ads/click', { // Changed to /click
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adId: ad._id, userId: auth.userId })
            });
            setOpenModal(true); // Open the modal on ad click
        }
    };

    const handleCloseModal = (event) => {
        event.stopPropagation();
        setOpenModal(false); // Close the modal
    };

    if (!ad) return null;

    return (
        <Box my={2} p={2} component={Paper} elevation={4} onClick={handleAdClick}>
            <Typography variant="subtitle1" align="center" color="textSecondary">
                {ad.title} {/* Display ad title */}
            </Typography>
            {/* Add additional ad content or image here */}

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
                    <Typography variant="h6">{ad.title}</Typography>
                    <Typography variant="body1">{ad.content}</Typography>
                    {/* Display more ad details or content here */}
                    <Button onClick={handleCloseModal}>Close</Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default AdBanner;
