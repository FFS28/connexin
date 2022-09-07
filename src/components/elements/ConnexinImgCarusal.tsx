import React from "react"
import StarIcon from '@mui/icons-material/Star';
import Badge from '@mui/material/Badge';

import { Typography, ImageList, ImageListItem } from "@mui/material"
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -9,
        top: 9,
        border: `2px solid transparent`,
        padding: '0 4px',
        backgroundColor : "transparent",
        zIndex : 0
    },
}));

const StyledNewBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -9,
        top: 9,
        border: `2px solid transparent`,
        padding: '0 4px',
        backgroundColor : "white",
        color : "grey",
        zIndex : 0
    },
}));

const Img = styled('img')({
    margin: '10px',
    display: 'block',
    width: "110px",
    height: "150px",
    borderRadius: "15px",
    backgroundColor: "grey"
});

const carusalData = [
    {
        title: "Corona Virus1",
        info: "This is important",
        link: "contact this",
        imgURL: "https://picsum.photos/536/354",
    },
    {
        title: "Corona Virus2",
        info: "This is important",
        link: "contact this",
        imgURL: "https://picsum.photos/536/359"
    },
    {
        title: "Corona Virus3",
        info: "This is important",
        link: "contact this",
        imgURL: "https://picsum.photos/536/358"
    },
    {
        title: "Corona Virus4",
        info: "This is important",
        link: "contact this",
        imgURL: "https://picsum.photos/536/355"
    },
    {
        title : "Corona Virus3",
        info : "This is important",
        link : "contact this",
        imgURL : "https://picsum.photos/536/354"
    }
]

export default function ConnexinImgCarusal({title}: {title: string}) {
    return (
        <>
            <Box>
                <Typography component="label" variant="h6" sx={{fontSize: "18px", float: "left"}} >{title}</Typography>
                <Typography component="label" variant="h6" sx={{fontSize: "18px", float: "right"}} >View all</Typography>
            </Box>
            <Box sx={{pb: 2}}>
                <ImageList sx={{ width: "100%", height: "210px", pt: 1, pb: 3 }} cols={carusalData.length} >
                    {carusalData.map((item, index) => (
                        <ImageListItem key={index} sx={{ position: "relative" }}>
                            <Img src={item.imgURL} alt={item.title} loading="lazy" />
                            <StyledNewBadge badgeContent="New" sx={{ position: "absolute", top: "25px", right: "45px" }} />
                            <Typography variant="caption" component="div" sx={{fontSize : "10px", position : "absolute", bottom : "45px", left : "15px", color: "white"}} >{item.info}</Typography>
                            <StyledBadge badgeContent={4.1} sx={{position : "absolute", bottom: "25px", left : "15px", color: "white"}}><StarIcon style={{fontSize: 15}} /></StyledBadge>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </>
    )
}

