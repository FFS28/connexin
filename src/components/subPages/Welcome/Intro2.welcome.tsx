import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React, { useContext } from "react";
import { Box, Typography, Card, CardContent, IconButton } from "@mui/material"
import { styled } from "@mui/system";
import { AppContext } from "../../../provider/index.provider";
import ImageMark from "../../elements/ImageMark";
import ConnnexinBtn from "../../elements/ConnexinBtn";

const Img = styled('img')({
    margin: 'auto 2px',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius : "15px"
});

export default function Intro2({pageHandle}: {pageHandle : (param1: any)=>void}){

    const { appState } = useContext(AppContext);
    
    return (
        <>
            <Box sx={{minHeight: "100vh"}}>
                <Box sx={{minHeight: "10vh"}}>
                    <ImageMark type="white" />
                </Box>
                <Box sx={{minHeight: "60vh"}}>
                    <Box sx={{mb: 5, mt : 5}}>
                        <Typography variant='h5' component="div" sx={{color: "white", textAlign : "left"}} >Why we need this infomation from you?</Typography>
                    </Box>
                    <Box sx={{mb: 4}}>
                        <Typography variant='body2' component="div" sx={{color: "white", textAlign : "left"}} >It is important we recieve information from you relating to your medical history and general health. This ensures your planned procedure and past-op recovery is optimised and all steps are taken to ensure your treatment can go ahead safely.</Typography>
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
                <Box sx={{minHeight : "20vh"}}>
                    { appState.pageState.loadingData ? (
                        <ConnnexinBtn type="contained" value="Loading..." moveto={pageHandle} m_page = {"Intro2"} />
                    ) : (<ConnnexinBtn type="contained" value="Let's Start" moveto={pageHandle} m_page = {"MainLayout"}  />) }
                    <ConnnexinBtn type="outlined" value="Back" moveto={pageHandle} m_page = {"Intro1"}  />
                </Box>
            </Box>
            
            
        </>    
    )
}