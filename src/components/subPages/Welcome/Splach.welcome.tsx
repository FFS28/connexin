import React, { useContext, useEffect } from "react"
import { Box } from "@mui/material"
import { AppContext } from "../../../provider/index.provider"
import ImageMark from "../../elements/ImageMark"
import TextMark from "../../elements/TextMark"

export default function Splash(){
    const {appState, setAppState} = useContext(AppContext)
    const style = {
        height: "100vh", 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",
        paddingTop: "50px"
    }

    useEffect(()=>{
        setTimeout(() => {
            if(appState.model.userlevel == 1){
                setAppState({...appState, pageState: {...appState.pageState, curPage : "SignIn"}})
            }
        }, 2000)
    },[])

    return (
        <>
            <Box sx={style}>
                <TextMark />
                <ImageMark type={"big"} /> 
            </Box>
        </>    
    )
}
