"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Link, Drawer, useMediaQuery, useTheme, Box, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const handleToggle = () => {
        setOpen(!open);
    };

    const menuItems = [
        { label: 'Discovery' },
        { label: 'Profile' },
        { label: 'Course List' },
        { label: 'Course Graph' },
    ];

    return (
        <AppBar position="static" sx={{ backgroundColor: '#5d001e' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <IconButton color="inherit" onClick={handleToggle} edge="start" sx={{ display: { sm: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                    <Link href="/" sx={{ textDecoration: 'none' }} rel="noopener noreferrer">
                        <Typography variant="h5" sx={{ color: 'white' }}>
                            CICS Course Visualizer
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: 'flex', minWidth: 150 }}>
                        <TextField 
                            placeholder="Search..." 
                            variant="outlined"
                            fullWidth
                            sx={{
                                margin: '0 10px',
                                backgroundColor: 'white',
                                borderRadius: '10px',
                            }}
                            InputProps={{
                                startAdornment: <SearchIcon />,
                            }}
                        />
                    </Box>
                </Box>
                {isMobile ? (
                    <Drawer
                        anchor='top'
                        open={open}
                        onClose={handleToggle}
                    >
                        <Box
                            sx={{
                                width: '100vw',
                                height: '100vh',
                                bgcolor: '#5d001e',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                                <Typography variant="h5" sx={{ color: 'white' }}>
                                    CICS Course Visualizer
                                </Typography>
                                <TextField
                                    placeholder="Search..."
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: 'white',
                                        marginRight: '10px',
                                        borderRadius: '10px', // Adjusting borderRadius to make the TextField round.
                                    }}
                                    InputProps={{
                                        startAdornment: <SearchIcon />,
                                    }}
                                />
                                <IconButton onClick={handleToggle} sx={{ color: 'white' }}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                            {menuItems.map((item) => (
                                <Button variant="outlined" color="inherit" onClick={handleToggle} key={item.label}
                                    sx={{
                                        color: '#fff', // changed to white color
                                        borderRadius: '10px',
                                        margin: '5px 0',
                                        borderColor: 'transparent',
                                        '&:hover': {
                                            color: '#ddd' // changed to slightly darker color on hover for better UX
                                        },
                                        width: '80%', // Sets the width for mobile view
                                        textAlign: 'center',
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    </Drawer>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {menuItems.map((item) => (
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    onClick={handleToggle}
                                    key={item.label}
                                    sx={{
                                        color: '#fff', // changed to white color
                                        borderRadius: '10px',
                                        margin: '0 10px',
                                        borderColor: 'transparent',
                                        '&:hover': {
                                            color: '#ddd' // changed to slightly darker color on hover for better UX
                                        },
                                        width: isTablet ? '140px' : '160px', // Sets the width for widescreen view
                                        fontSize: isTablet ? '0.8rem' : '1rem', // Adjust font size based on the device
                                        textAlign: 'center',
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;