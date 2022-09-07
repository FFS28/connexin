import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Img = styled('img')({
    margin: '20px auto',
    display: 'block',
    maxHeight: 'fit-content',
    textAlign: "center",
});

export default function ImageMark({type} : {type : string}){
    return (
        <>
            <Box sx={{mt: 1, mb: 1}}>
                {type == "white" ? <Img src="/images/logo_white.png" style={{width: "150px"}} width={100}/> : null }
                {type == "red" ? <Img src="/images/logo_red.png" style={{width: "150px"}} width={100}  /> : null }
                {type == "big" ? <Img src="/images/logo_big.png" style={{width: "150px"}} width={100}  /> : null }
                {type == "big1" ? <Img src="/images/logo_big.png" style={{width: "200px"}} width={100}  /> : null }
            </Box>
        </>
    )
}