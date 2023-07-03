import React, { useState } from 'react';
import { Avatar, Box, Button, TextField, Paper, Typography } from '@mui/material';

export const Profile = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [bio, setBio] = useState('');
    const [editMode, setEditMode] = useState(false); // State to track the edit mode

    const handlePictureChange = (event) => {
        // handle picture change
    };

    const handleBioChange = (event) => {
        // handle bio change
    };

    const handleEditClick = () => {
        setEditMode(true); // Enter the edit mode
    };

    const handleSaveClick = () => {
        setEditMode(false); // Exit the edit mode
        // Here you can also send the updated data to the server
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mb: 2 }}>
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, border: 1, borderColor: 'grey.500', width: '80%' }}>
                <Avatar src={profilePic} sx={{ width: 100, height: 100, alignSelf: 'center' }} />
                {
                    editMode ? (
                        <>
                            <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                                Upload Profile Picture
                                <input type="file" hidden onChange={handlePictureChange} />
                            </Button>
                            <TextField label="Bio" multiline rows={4} value={bio} onChange={handleBioChange} variant="outlined" sx={{ marginTop: 2, width: '100%' }} />
                            <Button variant="contained" onClick={handleSaveClick} sx={{ marginTop: 2 }}>Save</Button>
                        </>
                    ) : (
                        <>
                            <Typography sx={{ marginTop: 2 }}>Bio: {bio}</Typography>
                            <Button variant="contained" onClick={handleEditClick} sx={{ marginTop: 2 }}>Edit</Button>
                        </>
                    )
                }
            </Paper>
        </Box>
    );
};