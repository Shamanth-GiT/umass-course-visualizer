import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Link, MenuItem, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../theme/course_visualizer.css'

export const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };
    return (
        // <>
        //     <nav className="navbar navbar-expand-lg navbar-custom">
        //         <div className="container-fluid">
        //             <a href="/" className="navbar-brand">CICSNavigator</a>
        //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //                 <span className="navbar-toggler-icon"></span>
        //             </button>
        //             <div className="collapse navbar-collapse" id="navbarNav">
        //                 <ul className="navbar-nav ml-auto">
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="/discovery">Discovery</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="/schedule">Course List</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="/profile">Profile</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="/coursegraph">Course Graph</a>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>
        // </>
        // <AppBar position="static" sx={{backgroundColor: '#e3afbc'}}>
        //     <Toolbar>
        //         <IconButton edge="start" sx={{color: 'black'}} aria-label="menu">
        //             <MenuIcon />
        //         </IconButton>
        //         <Link href="/" sx={{color: 'black', textDecoration: 'none'}} rel="noopener noreferrer">
        //             <Typography variant="h5" sx={{ flexGrow: 1,  color: 'black'}}>
        //                 CICS Course Visualizer
        //             </Typography>
        //         </Link>
                
        //     </Toolbar>
        // </AppBar>
        <AppBar position="static" sx={{backgroundColor: '#5d001e'}}>
            <Toolbar>
                <IconButton color="inherit" onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Link href="/" sx={{color: 'black', textDecoration: 'none'}} rel="noopener noreferrer">
                    <Typography variant="h5" sx={{ flexGrow: 1,  color: 'white'}}>
                        CICS Course Visualizer
                    </Typography>
                </Link>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Discovery</MenuItem>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Course List</MenuItem>
                    <MenuItem onClick={handleClose}>Course Graph</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};