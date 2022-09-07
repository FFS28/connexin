import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from "@mui/system";
import { Box, Typography, Card, CardContent, IconButton } from "@mui/material"
import { grey } from '@mui/material/colors';
import ImageMark from '../../elements/ImageMark';
import ConnnexinBtn from '../../elements/ConnexinBtn';

const Img = styled('img')({
    margin: 'auto 2px',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius : "15px"
});

export default function Intro1({pageHandle}: {pageHandle: (param1: any)=>void}){
    return (
        <>
            <Box sx={{minHeight: "100vh"}}>
                <Box sx={{height: "10vh"}}>
                    <ImageMark type="white" />
                </Box>
                <Box sx={{minHeight: "60vh"}}>
                    <Box sx={{mb: 5, mt : 5}}>
                        <Typography variant='h5' component="div" color={grey[50]} sx={{ textAlign : "left"}} >What to expect?</Typography>
                    </Box>
                    <Box sx={{mb: 1, mt: 1}}>
                        <Typography variant='body2' component="div" color={grey[50]} sx={{ textAlign : "left"}} >Thank you for resistering onto the Peri-operative and consent system in preparation of your [PLANNED PROCEDURE] of [HOSPITAL SITE].</Typography>
                    </Box>
                    <Box sx={{mb: 1, mt: 1}}>
                        <Typography variant='body2' component="div" color={grey[50]} sx={{ textAlign : "left"}} >You are required to complete the medical questionniare before the hospital can arrange your admission date. You will not be able to submit the infomation unless all questions are answered.</Typography>
                    </Box>
                    <Box sx={{mb: 4, mt: 1}}>
                        <Typography variant='body2' component="div" color={grey[50]} sx={{ textAlign : "left"}} >Please note this needs to be completed by [DATE].</Typography>
                    </Box>
                    <Box>
                        <Card sx={{ display: 'flex', borderRadius: "15px", pl: 1, pr:1, position: "relative" }}> 
                            <Img alt="Image" src="https://picsum.photos/536/354" style={{width: "120px", height: "120px",backgroundColor : "grey"}} />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto', textAlign: "left" }} >
                                    <Typography component="div" variant="body2" sx={{fontSize: 10, color: "#9797ab"}}>
                                        Intro Videos
                                    </Typography>
                                    <Typography variant="h6" component="div" sx={{fontSize: 12, fontWeight: "bold"}}>
                                        What is a pre-admission medical questionniare
                                    </Typography>
                                    <Typography component="div" variant="body2" sx={{fontSize: 10, color: "#9797ab"}}>
                                        1m 20s 
                                    </Typography>
                                    <Box sx={{display: "flex"}}>
                                        <IconButton>
                                            <FavoriteBorderIcon />
                                        </IconButton>
                                        <IconButton>
                                            <ShareIcon />
                                        </IconButton>
                                        <IconButton color='primary' sx={{backgroundColor: "#1976d2", color : "white", position: "absolute", right : "10px", bottom: "20px"}}>
                                            <PlayArrowIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Box>
                        </Card>
                    </Box>
                </Box>
                <Box sx={{minHeight: "20vh"}}>
                    <ConnnexinBtn type="contained" value="Next" moveto={pageHandle} m_page = {"Intro2"} />
                </Box>
            </Box>
        </>    
    )
}