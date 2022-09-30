import React, { useContext, useEffect, useState } from "react"
import { Box, Button, Divider, Grid, List, ListItemButton, ListItemText, Stack, TextField, Typography } from "@mui/material"
import { AppContext } from "../../../../provider/index.provider"
import QuestionEditor from "./QuestionEditor"
import QuestionResult from "./QuestionResult"

export default function MakeQuestion({close}:{close: (params: boolean) => void}){

    const {appState, setAppState} = useContext(AppContext)
    const [showItem, setShowItem ] = useState(0)
    const change_value = (title: string, value: string) => {
        switch(title){
            case "QuestionNiare Title":
                setAppState({...appState, EditQus: {...appState.EditQus, title : value}})
                break;
            case "QuestionNiare Info":
                setAppState({...appState, EditQus: {...appState.EditQus, info : value}})
                break;
            case "QuestionNiare Link":
                setAppState({...appState, EditQus: {...appState.EditQus, link : value}})
                break;
            case "QuestionNiare ImageUrl":
                setAppState({...appState, EditQus: {...appState.EditQus, imgUrl : value}})
                break;
        }
    }

    const addQN = () =>{
        const QN = appState.EditQus;
        if(QN.title != "" && QN.info != "" && QN.link != "" && QN.imgUrl != ""){
            addQuestion()
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Greate", type: "info"}, CtrlQN: { ...appState.CtrlQN, madeState : false}})
        }
        else
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please fill all of inputfields", type: "error"}})
    }

    const updateQN = () => {
        const QN = appState.EditQus;
        if(QN.title != "" && QN.info != "" && QN.link != "" && QN.imgUrl != ""){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Update successful", type: "info"}, CtrlQN: { ...appState.CtrlQN, madeState : false}})
        }
        else
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please fill all of inputfields", type: "error"}})        
    }

    const getFromSample = () => {
        alert("get from sample")
    }

    const addQuestion = () => {
        const temp = appState.EditQus.questions;
        if(!appState.CtrlQN.uploadState){
            temp.push({
                title : "",
                type : true,
                result : null,
                completed : false,
                subQuestions : []
            })
            setAppState({...appState, EditQus: { ...appState.EditQus, questions : temp}})
        }
    }

    const save_data = () => {
        const data = {
            method: "POST",
            body: JSON.stringify(appState.EditQus),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        fetch('/api/admins/question/saveData', data).then(res => res.json()).then(res => {
            setAppState({...appState, editState: false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful Saved", type: "info"}, EditQus: {...appState.EditQus, ref: res}}
            )
        }).catch(() => setAppState({...appState, editState: false, alert: {...appState.alert, open: true, message: "Please check your Net!", type: "error"}}))
        close(true)
    }

    useEffect(()=>{
        if(!appState.editState)
            setAppState({...appState, EditQus: {
                ref : "",
                title: "",
                info: "",
                link: "",
                imgUrl: "",
                completed: false,
                questions: []
            }, CtrlQN: {...appState.CtrlQN, madeState: true}})
    }, [])

    return (
        <>
            { appState.CtrlQN.madeState && !appState.editState ? (
                <>
                    <Box sx={{p: 10, position: "relative"}}>
                        <Box sx={{mb: 5}}>
                            <Button variant={"contained"} color={"secondary"} sx={{float: "right"}} onClick={()=>{close(true); setAppState({...appState, editState: false})}} >Return Back to Home</Button>
                        </Box>
                        <Box sx={{mt: 2, mb: 2, textAlign: "center"}}>
                            <Typography variant={"h3"} component={"h3"} >Create A New Question Section</Typography>
                        </Box>
                        <Box sx={{mt: 1, mb: 1, textAlign: "center"}}>
                            <TextField label={"Question Section Title"}  defaultValue={appState.EditQus.title} type="text" onChange={(event: any) => {change_value("QuestionNiare Title", event.target.value)}} fullWidth />
                        </Box>
                        <Box sx={{mt: 1, mb: 1, textAlign: "center"}}>
                            <TextField label={"Question Section Info"} defaultValue={appState.EditQus.info} type="text" onChange={(event: any) => {change_value("QuestionNiare Info", event.target.value)}} fullWidth />
                        </Box>
                        <Box sx={{mt: 1, mb: 1, textAlign: "center"}}>
                            <TextField label={"Question Section Link"} defaultValue={appState.EditQus.link} type="text" onChange={(event: any) => {change_value("QuestionNiare Link", event.target.value)}} fullWidth />
                        </Box>
                        <Box sx={{mt: 1, mb: 1, textAlign: "center"}}>
                            <TextField label={"Question Section ImageUrl"} defaultValue={appState.EditQus.imgUrl} type="text" onChange={(event: any) => {change_value("QuestionNiare ImageUrl", event.target.value)}} fullWidth />
                        </Box>
                        <Stack spacing={2} direction={"row"} >
                            <Button variant={"outlined"} onClick={addQN} fullWidth >Add New QuestionNiare</Button>
                            <Button variant={"outlined"} onClick={getFromSample} fullWidth >Get Sample QuestionNiare</Button>
                        </Stack>
                        
                    </Box>
                </>
            ) : null }
            { appState.CtrlQN.madeState && appState.editState ? (
                <>
                    <Box sx={{p: 10, position: "relative"}}>
                        <Box sx={{mb: 5}}>
                            <Button variant={"contained"} color={"secondary"} sx={{float: "right"}} onClick={()=>{close(true); setAppState({...appState, editState: false})}} >Return Back to Home</Button>
                        </Box>
                        <Box sx={{mt: 2, mb: 2, textAlign: "center"}}>
                            <Typography variant={"h3"} component={"h3"} >Update Question Section</Typography>
                        </Box>
                        <Box sx={{mt: 1, mb: 1, textAlign: "center"}}>
                            <TextField label={"Question Section Title"}  value={appState.EditQus.title} type="text" onChange={(event: any) => {change_value("QuestionNiare Title", event.target.value)}} fullWidth />
                        </Box>
                        <Box sx={{mt: 1, mb: 1, textAlign: "center"}}>
                            <TextField label={"Question Section Info"} value={appState.EditQus.info} type="text" onChange={(event: any) => {change_value("QuestionNiare Info", event.target.value)}} fullWidth />
                        </Box>
                        <Box sx={{mt: 1, mb: 1, textAlign: "center"}}>
                            <TextField label={"Question Section Link"} value={appState.EditQus.link} type="text" onChange={(event: any) => {change_value("QuestionNiare Link", event.target.value)}} fullWidth />
                        </Box>
                        <Box sx={{mt: 1, mb: 1, textAlign: "center"}}>
                            <TextField label={"Question Section ImageUrl"} value={appState.EditQus.imgUrl} type="text" onChange={(event: any) => {change_value("QuestionNiare ImageUrl", event.target.value)}} fullWidth />
                        </Box>
                        <Stack spacing={2} direction={"row"} >
                            <Button variant={"outlined"} onClick={updateQN} fullWidth >Update QuestionNiare</Button>
                        </Stack>
                        
                    </Box>
                </>
            ) : null }
            { !appState.CtrlQN.madeState ? (
                <>
                    <Box sx={{p: 10, position: "relative", textAlign: "center"}}>
                        <Button variant={"contained"} color={"secondary"} onClick={()=>{close(true); setAppState({...appState, editState: false})}} sx={{float: "right"}} >Return Back to Home</Button>
                        <Button variant={"contained"} onClick={save_data} sx={{float: "right", mr: 2}} >Save Question Section</Button>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <Box sx={{mt: 1, mb: 1, textAlign: "left"}}>
                                    <Typography variant={"h5"} component={"h5"} >Questions</Typography>
                                </Box>
                                <Divider sx={{mt: 3, mb: 1}} />
                                <List component={"nav"} aria-label={"main mailbox folders"}>
                                    {appState.EditQus.questions.map((item : any, index: number)=>{
                                        return( 
                                            <Box key={index}>
                                                <ListItemButton selected={index === showItem} onClick={() => setShowItem(index)} >
                                                    <ListItemText primary={ item.title != "" ? item.title : `Subject ${index + 1}`} />
                                                </ListItemButton>
                                            </Box>
                                        )      
                                    })}
                                </List>
                                <Button variant={"outlined"} onClick={addQuestion} fullWidth>Add Question</Button>
                            </Grid>
                            <Grid item xs={5}>
                                <Box sx={{mt: 1, mb: 1, textAlign: "left"}}>
                                    <Typography variant={"h5"} component={"h5"} >Question Edit</Typography>
                                </Box>
                                <Box sx={{mt: 1, mb: 1}}>
                                    <QuestionEditor showItem={showItem} />
                                </Box>
                            </Grid>
                            <Grid item xs={5} >
                                <Box sx={{mt: 1, mb: 1, textAlign: "left"}}>
                                    <Typography variant={"h5"} component={"h5"} >Question Result Preview</Typography>
                                </Box>
                                <Divider sx={{mt: 3, mb: 1}} />
                                <Box sx={{mt: 1, mb: 1, position : "relative"}}>
                                    <Box sx={{ zIndex: 10000, opacity: 0, width: "100%", height: "100%", position: "absolute"}}></Box>
                                    <QuestionResult showItem={showItem} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            ) : null }               
        </>
    )
}