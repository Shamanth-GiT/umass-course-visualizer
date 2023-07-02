import React, { useState } from 'react';
import { Avatar, Box, Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const Profile = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [bio, setBio] = useState('');
    const [courseName, setCourseName] = useState(''); // State for the new course name
    const [courseTime, setCourseTime] = useState(''); // State for the new course time
    const [courses, setCourses] = useState([]); // State for the course list

    //TODO - Will work on it after styling and connecting to backend
    const handlePictureChange = (event) => {
        // ...
    };

    //TODO - Same as above
    const handleBioChange = (event) => {
        // ...
    };

    const handleAddCourse = () => {
        setCourses(oldCourses => [...oldCourses, { name: courseName, time: courseTime }]); // Add a new course to the list
        setCourseName(''); // Reset the course name input
        setCourseTime(''); // Reset the course time input
    };

    const handleRemoveCourse = (index) => {
        setCourses(oldCourses => oldCourses.filter((course, i) => i !== index)); // Remove the course from the list
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src={profilePic} sx={{ width: 100, height: 100 }} />
            <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                Upload Profile Picture
                <input type="file" hidden onChange={handlePictureChange} />
            </Button>
            <TextField label="Bio" multiline rows={4} value={bio} onChange={handleBioChange} variant="outlined" sx={{ marginTop: 2, width: '80%' }} />
            <TextField label="Course Name" value={courseName} onChange={e => setCourseName(e.target.value)} variant="outlined" sx={{ marginTop: 2, width: '80%' }} />
            <TextField label="Course Time" value={courseTime} onChange={e => setCourseTime(e.target.value)} variant="outlined" sx={{ marginTop: 2, width: '80%' }} />
            <Button variant="contained" onClick={handleAddCourse} startIcon={<AddIcon />} sx={{ marginTop: 2 }}>Add Course</Button>
            <List sx={{ width: '80%', marginTop: 2 }}>
                {courses.map((course, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={course.name} secondary={course.time} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => handleRemoveCourse(index)}>
                                <RemoveIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};