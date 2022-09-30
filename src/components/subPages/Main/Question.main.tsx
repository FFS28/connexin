import React, { useEffect, useContext } from "react"
import {Typography, Divider, Box } from "@mui/material"

import ConnexinImgCard from "../../elements/ConnexinImgCard";
import AssessmentHistory from "../../elements/AssessmentHistory";
import { AppContext } from "../../../provider/index.provider";
import { Question, QuestionNiare } from "../../../dataType/provider.dt";


export default function QuestionPanel() {
    const { appState, setAppState } = useContext(AppContext)

    useEffect(()=>{
        let check = true;
        appState.useData.questionNiares.map((item: QuestionNiare)=>{
            check = check && item.completed
        })
        if(check){
            setAppState({...appState, pageState: {...appState.pageState, curLayout: "ContestLayout", curPage: "ContestMain"}})
        }
    },[])

    return (
        <>
            <Box sx={{pl : 0.5, pr: 0.5}} style={{marginBottom: "10vh"}}>
                <Box sx={{mt: 2, mb : 2}}>
                    <Typography variant="h5" gutterBottom component="div">Questionnaires</Typography>
                </Box>
                <Box sx={{mt: 2 }}>
                    <Typography variant="h6" gutterBottom component="div">Pre-op assessment</Typography>
                </Box>
                <Box sx={{mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom component="div">Date/time of procedure</Typography>
                    <Typography variant="caption" gutterBottom component="div">{appState.users.user.addmissionDate}</Typography>
                </Box>
                <Box sx={{mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom component="div">Planned procedure</Typography>
                    <Typography variant="caption" gutterBottom component="div">Heart surgery</Typography>
                </Box>
                <Box sx={{mt: 2 }}>
                    <Typography variant="caption" gutterBottom component="div">Please complete the following questions and provide us with consent by {appState.users.user.returnByDate}</Typography>
                </Box>
                <Divider sx={{mt: 2, mb: 2}} />
                <Box sx={{pt: 2}}>
                    <Typography variant="h6" gutterBottom component="div">Your appointment</Typography>
                </Box>
                {appState.useData.questionNiares.map((item : QuestionNiare, index: number) => {
                    let subItems = 0;
                    item.questions.map((quiz : Question) => {
                        if(quiz.completed)
                            subItems ++;
                    })
                    const link_text = subItems + " / " + item.questions.length + " completed";
                    return (<ConnexinImgCard key={index}  cardnum={index}  imgURL={item.imgUrl} title={item.title} info={item.info} link={link_text} completed={item.completed} />)
                })}
                {/* <Divider sx={{mt: 2, mb: 2}} /> */}
                {/* <AssessmentHistory /> */}
            </Box>
        </>
    )
}
