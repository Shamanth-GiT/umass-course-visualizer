"use client";

import React, { useState } from 'react';
import { Avatar, Box, Button, TextField, Paper, Typography } from '@mui/material';

export const Profile = () => {
    const [profile, setProfile] = useState({
        profilePic: null,
        fullName: 'Quang Dang',
        username: 'Queue',
        schoolYear: 'Junior',
        major: 'Computer Science',
        bio: 'Hello, I like web dev and ML/AI',
    });

    const [editMode, setEditMode] = useState(false);

    const handleFieldChange = (event) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            [event.target.name]: event.target.value
        }));
    };

    const handlePictureChange = (event) => {
        // handle picture change
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        setEditMode(false);
        // send the updated profile to the server
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mb: 2 }}>
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, border: 1, borderColor: 'grey.500', width: '80%' }}>
                <Avatar src={profile.profilePic} sx={{ width: 100, height: 100, alignSelf: 'center' }} />
                {
                    editMode ? (
                        <>
                            <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                                Upload Profile Picture
                                <input type="file" hidden onChange={handlePictureChange} />
                            </Button>
                            <TextField name="fullName" label="Full Name" value={profile.fullName} onChange={handleFieldChange} variant="outlined" sx={{ marginTop: 2, width: '100%' }} />
                            <TextField name="username" label="Username" value={profile.username} onChange={handleFieldChange} variant="outlined" sx={{ marginTop: 2, width: '100%' }} />
                            <TextField name="schoolYear" label="School Year" value={profile.schoolYear} onChange={handleFieldChange} variant="outlined" sx={{ marginTop: 2, width: '100%' }} />
                            <TextField name="major" label="Major" value={profile.major} onChange={handleFieldChange} variant="outlined" sx={{ marginTop: 2, width: '100%' }} />
                            <TextField name="bio" label="Bio" multiline rows={4} value={profile.bio} onChange={handleFieldChange} variant="outlined" sx={{ marginTop: 2, width: '100%' }} />
                            <Button variant="contained" onClick={handleSaveClick} sx={{ marginTop: 2 }}>Save</Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" sx={{ marginTop: 2 }}>{profile.fullName} ({profile.username})</Typography>
                            <Typography sx={{ marginTop: 2 }}>School Year: {profile.schoolYear}</Typography>
                            <Typography sx={{ marginTop: 2 }}>Major: {profile.major}</Typography>
                            <Typography sx={{ marginTop: 2 }}>Bio: {profile.bio}</Typography>
                            <Button variant="contained" onClick={handleEditClick} sx={{ marginTop: 2 }}>Edit</Button>
                        </>
                    )
                }
            </Paper>
        </Box>
    );
};