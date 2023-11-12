import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box mt={4} py={2} bgcolor="background.paper" textAlign="center">
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} The Daily Bugle
      </Typography>
    </Box>
  );
}

export default Footer;
