import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppContext } from "../../../../utils/providers/context";
import { makeJSON } from "../../../../utils/customFuntions/convertFunctions";
import { validationCheckText } from "../../../../utils/customFuntions/validationFunctions";
import { CallGetAPI, CallPostAPI } from "../../../../utils/customFuntions/callAPIFuntions";
import { LevelData } from "../../../../utils/customTypes/apiData";
import { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "../../../../utils/constants";

export default function LevelSetting(){
    
    const {appState, setAppState} = useContext(AppContext)
    const [level1, setLevel1] = useState("");
    const [level2, setLevel2] = useState("");
    const [level3, setLevel3] = useState("");
    const [level1_ref, setLevel1_ref] = useState("");
    const [level2_ref, setLevel2_ref] = useState("");
    const [level3_ref, setLevel3_ref] = useState("");
    
    useEffect(()=>{
        CallGetAPI('/api/admins/getLevels').then(res => {
            const data = res as LevelData[];
            setLevel1(data[0].level);
            setLevel2(data[1].level);
            setLevel3(data[2].level);
            setLevel1_ref(data[0].ref);
            setLevel2_ref(data[1].ref);
            setLevel3_ref(data[2].ref);
        }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const saveAccess = () => {
        if(!validationCheckText(level1)){
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please check your Level 1 title!", type: "error"}})
            return;
        }
        if(!validationCheckText(level2)){
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please check your Level 2 title!", type: "error"}})
            return;
        }
        if(!validationCheckText(level3)){
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please check your Level 3 title!", type: "error"}})
            return;
        }
        CallPostAPI('/api/admins/updateLevels', makeJSON([
            {ref: level1_ref, level: level1},
            {ref: level2_ref, level: level2},
            {ref: level3_ref, level: level3}
        ])).then(res => {
            setAppState({...appState, alert: {...appState.alert, open: true, messages: res, type: ALERT_TYPE_SUCCESS}})
        }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
    }

    const resetField = () => {
        setLevel1("")
        setLevel2("")
        setLevel3("")
    }

    return (
        <>
            {/* <Typography variant={"h4"} component={"h4"} sx={{mt: 1, mb: 1}}>Access Setting</Typography> */}
            <Stack component={"form"} noValidate spacing={2} width="50%" justifyContent="center" sx={{margin: "auto"}} >          
                <Grid container >
                    <Grid item xs={4}>
                        <Typography variant={"subtitle1"} sx={{pt: 3}} >Level 1</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField type={"text"} value={level1} label={"Level 1"} variant={"standard"} onChange={ event => setLevel1(event.target.value) } fullWidth />
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={4}>
                        <Typography variant={"subtitle1"} sx={{pt: 3}} >Level 2</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField type={"text"} value={level2} label={"Level 2"} variant={"standard"} onChange={ event => setLevel2(event.target.value) } fullWidth />
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={4}>
                        <Typography variant={"subtitle1"} sx={{pt: 3}} >Level 3</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField type={"text"} value={level3} label={"Level 3"} variant={"standard"} onChange={ event => setLevel3(event.target.value) } fullWidth />
                    </Grid>
                </Grid>
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={saveAccess} startIcon={<AddTaskIcon />} >Save</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>  
        </>
    )
}