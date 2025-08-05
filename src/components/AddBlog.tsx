import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { Blog } from "./BlogList";
import Button from '@mui/material/Button';
import MenuItem from "@mui/material/MenuItem";

export default function AddBlog({addBlog} : {addBlog : (blogData : Blog) => void}) {
    const [blogData, setBlogData] = useState({
        id : 0,
        title : '',
        author : '',
        content : '',
        date : '',
        status : ''
    });

    // Check if all fields are filled
    const isFormValid = blogData.title && blogData.author && blogData.content && blogData.status;

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBlogData({
            ...blogData,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid) return;
        const newBlog = {
            ...blogData,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0] // yyyy-mm-dd
        };
        addBlog(newBlog);
        // Optionally reset form
        setBlogData({
            id : 0,
            title : '',
            author : '',
            content : '',
            date : '',
            status : ''
        });
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" mb={3}>
                Add New Blog
            </Typography>

            <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    variant="outlined"
                    value={blogData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Author"
                    name="author"
                    variant="outlined"
                    value={blogData.author}
                    onChange={handleChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Content"
                    variant="outlined"
                    name="content"
                    value={blogData.content}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    required
                />

                <TextField
                    label="Status"
                    name="status"
                    select
                    value={blogData.status}
                    onChange={handleChange}
                    fullWidth
                    required
                    SelectProps={{ MenuProps: { disablePortal: true } }}
                >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                </TextField>

                <Button 
                    variant="contained" 
                    type="submit"
                    disabled={!isFormValid}
                >
                    Add Blog
                </Button>
            </Box>
        </Paper>
    );
}