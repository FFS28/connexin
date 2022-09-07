import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Stack, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from '../../../../provider/index.provider';

export default function SetupEmailAddress(){
    
    const [where, setWhere] = useState("");
    const [site, setSite] = useState("")
    const [address, setAddress] = useState("")
    const [postCode, setPostCode] = useState("")
    const [url, setUrl] = useState("")
    const {appState, setAppState} = useContext(AppContext)

    const addNew = () => {
        return true;
    }

    const resetField = () => {
        setAppState({...appState, editState : false});
        setWhere("");
        setSite("")
        setAddress("")
        setPostCode("")
        setUrl("")
    
    }
    return (
        <>
            {/* <Typography variant={"h4"} component={"h4"} sx={{mt: 1, mb: 1}}>Service Email Address</Typography> */}
            <Stack component={"form"} noValidate spacing={10} direction="row" >
                <Stack spacing={4} width="50%">
                    <TextField type={"text"} value={where} label={"Where"} variant={"standard"} onChange={ event => setWhere(event.target.value) } />
                    <TextField type={"text"} value={site} label={"Site"} variant={"standard"} onChange={ event => setSite(event.target.value) } />
                    <TextField type={"text"} value={address} label={"Address"} variant={"standard"} onChange={ event => setAddress(event.target.value) } />    
                </Stack>                    
                <Stack spacing={4} width="50%">
                    <TextField type={"text"} value={postCode} label={"Post Code"} variant={"standard"} onChange={ event => setPostCode(event.target.value) } />
                    <TextField type={"text"} value={url} label={"URL(Directions)"} variant={"standard"} onChange={ event => setUrl(event.target.value) } />
                </Stack>                                    
            </Stack>
            
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={addNew} startIcon={<AddTaskIcon />} >Save</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>
        </>
    )
}