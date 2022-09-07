import React from 'react';
import Box from '@mui/material/Box';
import ImageMark from "./ImageMark";

export default function MainHeader() {
    return (
        <Box sx={{minHeight: "10vh"}}>
            <ImageMark type="red" />
        </Box>
    );
}