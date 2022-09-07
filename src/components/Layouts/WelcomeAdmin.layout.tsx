import React, { useContext, useEffect } from "react"
import { Box } from "@mui/material"
import { AppContext } from "../../provider/index.provider"
import Splash from "../subPages/Welcome/Splach.welcome"
import SignIn from "../subPages/Welcome/SignIn.welcome"

export default function WelcomeAdmin(){
    
    const {appState} = useContext(AppContext)
    const changePage = (pageName : string) => { console.log(pageName) }
    return (
        <>
            <Box>
                {appState.pageState.curPage == "Splash" ? <Splash /> : null}
                {appState.pageState.curPage == "SignIn" ? <SignIn pageHandle={changePage} /> : null}
            </Box>
        </>
    )
}