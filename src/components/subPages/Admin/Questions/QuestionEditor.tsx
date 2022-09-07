import React, { useContext } from "react";
import { Box, Button, Divider, TextField } from "@mui/material";
import { AppContext } from "../../../../provider/index.provider";
import RadiobtnOpinion from "../../../elements/Questions/RadiobtnOpinion";
import SubQusEdit from "./SubQusEdit";

export default function QuestionEditor({showItem}: {showItem: number}){
    
    const {appState, setAppState} = useContext(AppContext)
    
    const change_title = (event: any) => {
        const temp = appState.EditQus.questions;
        temp[showItem].title = event.target.value;
        setAppState({...appState, EditQus: { ...appState.EditQus, questions: temp}})
    }

    const change_type = (value: any, index: number) => {
        const temp = appState.EditQus.questions;
        temp[showItem].type = value == "Default" ? true : false;
        setAppState({...appState, EditQus: { ...appState.EditQus, questions: temp }})
    }

    const addSubItem = () => {
        const temp = appState.EditQus.questions;
        temp[showItem].subQuestions.push({
            title : "",
            type : 0,
            data : [],
            result : null
        })
        setAppState({...appState, EditQus: { ...appState.EditQus, questions: temp }})
    }
    
    return (
        <>
            <Box sx={{p:1}}>
                <Box sx={{mt: 1, mb: 1}}>
                    <TextField label="Question Title" multiline maxRows={4} value={appState.EditQus.questions[showItem].title} onChange={change_title} type="text" fullWidth />
                </Box>
                <Box sx={{mt: 1, mb: 1 }}>
                    <RadiobtnOpinion problem_state={change_type} proNum={0} data={["Default", "YesNo"]} value={ appState.EditQus.questions[showItem].type ? "Default" : "YesNo"} />    
                </Box>
                <Divider sx={{mt: 1, mb: 1}} />
                {appState.EditQus.questions[showItem].subQuestions.map((item: any, index : number) => {
                    return <SubQusEdit key={index} showItem ={showItem} showSubItem={index} />
                })}
                <Button variant="outlined" onClick={addSubItem} fullWidth>Add SubItems</Button>
            </Box>
        </>
    )
}