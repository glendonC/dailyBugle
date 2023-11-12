import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
    const history = useHistory();
    const { auth, dispatch } = useAuth();

    const handleSignout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Daily Bugle
                </Typography>
                {auth.isAuthenticated ? (
                    <Box display="flex" alignItems="center">
                        <Typography variant="subtitle1" style={{ marginRight: 20 }}>
                            Welcome, {auth.username}
                        </Typography>
                        <Button color="inherit" onClick={handleSignout}>Sign Out</Button>
                    </Box>
                ) : (
                    <Button color="inherit" onClick={() => history.push('/login')}>Sign up / Log in</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
