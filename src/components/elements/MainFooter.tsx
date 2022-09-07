import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import React, { useState, useContext } from "react";
import {BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"

import { AppContext } from "../../provider/index.provider";


const title= ["Home", "Question", "Advice", "Profile"]

function MainFooter({pageHandle}: {pageHandle : (param: string)=> void}) {
    const { appState } = useContext(AppContext);
    const [value, setValue] = useState( appState.pageState.curPage == "Home" ? 0 : 1);
    const change_page = (value: number) => {
        if(appState.pageState.curLayout != "ContestLayout"){
            pageHandle(title[value])
            setValue(value);
        }
    }
    
    return (
        <>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={4}>
                <BottomNavigation showLabels sx={{bgcolor: "rgba(20, 88, 277, 0.8)"}} value={value} onChange={(event, newValue) => { change_page(newValue); }} >
                    <BottomNavigationAction label={<span style={value == 0 ? {color: "white"} : {color: "lightgrey"} }>Home</span>} icon={<HomeOutlinedIcon style={value == 0 ? {color:  "white"} : {color: "lightgrey"}} />} />
                    <BottomNavigationAction label={<span style={value == 1 ? {color: "white"} : {color: "lightgrey"} }>Questionniare</span>} icon={<QuestionAnswerOutlinedIcon style={value == 1 ? {color:  "white"} : {color: "lightgrey"}} />} />
                    <BottomNavigationAction label={<span style={value == 2 ? {color: "white"} : {color: "lightgrey"} }>Advice</span>} icon={<InfoOutlinedIcon style={value == 2 ? {color:  "white"} : {color: "lightgrey"}} />} />
                    {/* <BottomNavigationAction label={<span style={value == 3 ? {color: "white"} : {color: "lightgrey"} }>Profile</span>} icon={<PersonOutlineOutlinedIcon style={value == 3 ? {color:  "white"} : {color: "lightgrey"}} />} /> */}
                </BottomNavigation>
            </Paper>
        </>
    )
}

export default MainFooter;