import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function AdBanner() {
  return (
    <Box my={2} p={2} component={Paper} elevation={4}>
      <Typography variant="subtitle1" align="center" color="textSecondary">
        Advertisement
      </Typography>
      {/* Add additional ad content or image here */}
    </Box>
  );
}

export default AdBanner;
