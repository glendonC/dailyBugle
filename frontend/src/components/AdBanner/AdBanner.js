import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Modal, Button } from '@mui/material';
import { useAuth } from '../../AuthContext';

function AdBanner({ trackImpression=false }) {
    const [ad, setAd] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const { auth } = useAuth();

    const userId = auth.userId ? auth.userId : 'anonymous';

    useEffect(() => {
        fetch('http://localhost:5001/api/ads/random')
            .then(response => response.json())
            .then(data => {
                setAd(data);

                if (trackImpression) {
                    fetch('http://localhost:5001/api/ads/impression', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ adId: data._id, userId })
                    });
                }
            })
            .catch(error => console.error('Error fetching random ad:', error));
    }, [userId, trackImpression]);

    const handleAdClick = () => {
        if (ad) {
            fetch('http://localhost:5001/api/ads/click', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adId: ad._id, userId })
            });
            setOpenModal(true);
        }
    };

    const handleCloseModal = (event) => {
        event.stopPropagation();
        setOpenModal(false); 
    };

    if (!ad) return null;

    return (
        <Box my={2} p={2} component={Paper} elevation={4} onClick={handleAdClick}>
            <Typography variant="subtitle1" align="center" color="textSecondary">
                {ad.title} {}
            </Typography>
            {}

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
                    <Typography variant="h6">{ad.title}</Typography>
                    <Typography variant="body1">{ad.content}</Typography>
                    {}
                    <Button onClick={handleCloseModal}>Close</Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default AdBanner;
