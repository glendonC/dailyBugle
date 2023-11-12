import React from 'react';
import { List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentList = ({ comments, currentUserId, onEditComment, onDeleteComment }) => {
    return (
        <Box mt={2}>
            <List dense>
                {comments.map((comment) => (
                    <ListItem key={comment._id} divider>
                        <ListItemText
                            primary={<strong>{comment.author.username}</strong>}
                            secondary={comment.content}
                        />
                        {comment.author === currentUserId && (
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" onClick={() => onEditComment(comment._id, comment.content)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteComment(comment._id, comment.story)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default CommentList;
