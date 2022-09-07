import React, { useEffect, useState, useContext } from "react"
import {Typography, Divider, CircularProgress, Box } from "@mui/material"

import ConnnexinBtn from "../../elements/ConnexinBtn";
import ConnexinImgCard from "../../elements/ConnexinImgCard";
import ConnexinImgCarusal from "../../elements/ConnexinImgCarusal";
import { AppContext } from "../../../provider/index.provider";
import { Question, QuestionNiare } from "../../../dataType/provider.dt";

function CircularProgressWithLabel() {
    const { appState } = useContext(AppContext)
    const [subItems, setSubItems] = useState<number>(0)
    const [totalItems, setTotalItems] = useState<number>(0)
    useEffect(()=>{
        let temp = 0;
        setTotalItems(appState.useData.questionNiares[appState.pageState.curQuestionniare].questions.length)
        appState.useData.questionNiares[appState.pageState.curQuestionniare].questions.map( (item : Question) => {
            if(item.completed){
                temp ++;
            }
        })
        setSubItems(temp)
    },[])
    
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={75} size={200} thickness={0.5} style={{color: "lightgrey", transform : "rotate(135deg)", position: "absolute"}} />
            <CircularProgress variant="determinate" value={Math.round(75 * subItems / totalItems )} size={200} thickness={0.5} style={{color: "red", transform : "rotate(135deg)"}} />
            <Box sx={{ top: 60, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'block', alignItems: 'center', justifyContent: 'center' }} >
                <Typography variant="h5" component="div"  >{Math.round(subItems / totalItems * 100)}%</Typography>
                <br />
                <Typography variant="caption" component="div" color="text.secondary" >{subItems} / {totalItems} questions</Typography>
                <Typography variant="caption" component="div" color="text.secondary" >completed</Typography>
            </Box>
            
        </Box>
    );
}

function MainHome({pageHandle}: {pageHandle : (param1: any)=>void }) {
    
    const { appState } = useContext(AppContext)

    return (
        <>
            <Box sx={{pl : 0.5, pr: 0.5, position : "relative"}}>
                <Box sx={{mt: 2, mb : 2}}>
                    <Typography variant="h5" gutterBottom component="div">Good Morning</Typography>
                    <Typography variant="subtitle1" gutterBottom component="label" >Alex</Typography>
                </Box>
                <Box sx={{pt: 2}}>
                    <Typography variant="h6" gutterBottom component="div">Your Summary</Typography>
                </Box>
                <CircularProgressWithLabel />
                <Box sx={{mt: 2, pl: 2, pr: 2}}>
                    <ConnnexinBtn type="contained" value="Return Question" moveto={pageHandle} m_page = {"ReturnQus"}  />
                </Box>
                <Divider sx={{mt: 2, mb: 2}} />
                <Box sx={{pt: 2}}>
                    <Typography variant="h6" gutterBottom component="div">Your appointment</Typography>
                </Box>
                {appState.useData.questionNiares.map((item: QuestionNiare, index: number) => {
                    if(index < 3)
                        return (<ConnexinImgCard key={index} cardnum={index} imgURL={item.imgUrl} title={item.title} info={item.info} link={item.link} completed={item.completed} />)
                })}
                <Divider sx={{mt: 2, mb: 2}} />
                <ConnexinImgCarusal title="Useful reading materials" />
            </Box>
        </>
    )
}

export default MainHome;