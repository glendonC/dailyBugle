import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CommentForm = ({ onCommentSubmit }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCommentSubmit(content);
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box mb={2}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write a comment..."
                    variant="outlined"
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
        </form>
    );
};

export default CommentForm;
