import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';

import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { addNewConsultant, getAllServices, updateConsultant } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { validationCheckText } from '../../../../other/validation.globals';
import { AppContext } from "../../../../provider/index.provider";

export default function SetupConsultant({editData, handle} : {editData: any, handle: any}){
    
    const {appState, setAppState} = useContext(AppContext)
    const [consultantName, setConsultantName] = useState("");
    const [serviceSpecial, setServiceSpecial] = useState("");
    const [serviceList, setServiceList] = useState<any[]>([])

    const addNew = () => {
        if(!validationCheckText(consultantName))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Title!", type: "error"}})
            return;
        }
        if(!validationCheckText(serviceSpecial))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please select Service Specialty!", type: "error"}})
            return;
        }
        if(!appState.editState){
            addNewConsultant(makeJSON({
                title: consultantName, 
                serviceSpecial: serviceSpecial
            })).then((res: any) => {
                setAppState({...appState, editState : false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                resetField();
            })
        }else {
            updateConsultant(makeJSON({
                title: consultantName, 
                serviceSpecial: serviceSpecial,
                ref : editData.ref
            })).then((res: any) => {
                setAppState({...appState, editState : false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                resetField()
            })
        }
    }

    const resetField = () => {
        setAppState({...appState, editState : false});
        setConsultantName("");
        setServiceSpecial("");
    }

    const changeService = (event: any) => {
        setServiceSpecial(event.target.value)
    }

    useEffect(()=>{
        setServiceSpecial(appState.users.admin.service)
        getAllServices().then((res: any) => {
            res.json().then((data: any)=>{
                const temp: any = []
                temp.push({ref: 0, servicetitle: "All Services"})
                data.map((item: any) => {
                    temp.push({ref: item.ref, servicetitle: item.serviceSpecial})  
                })
                setServiceList(temp)   
            }).catch((rej: any) => {console.log(rej)})
        })
    }, [])

    useEffect( () => {
        if(appState.editState && editData){
            setConsultantName(editData.title)
            setServiceSpecial(editData.serviceSpecial)
        }
    }, [appState.editState] )

    return (
        <>
            {/* <Typography variant={"h4"} component={"h4"} sx={{mt: 1, mb: 1, textAlign: "center"}}>Consultant Setting</Typography> */}
            <Stack component={"form"} noValidate spacing={3} direction="row" >                    
                <Stack spacing={2} width={"50%"}>
                    <TextField type={"text"} value={consultantName} label={"Name"} variant={"standard"} onChange={ event => setConsultantName(event.target.value) } />
                </Stack>
                <Stack spacing={2} width={"50%"}>
                    {appState.users.admin.service == "all" ? <FormControl variant={"standard"}>
                        <InputLabel>Service/Specialty</InputLabel>
                        <Select value={serviceSpecial} onChange={ changeService } sx={{textAlign: "left"}} >
                            {serviceList.map((item: any, index: number)=>{
                                return <MenuItem key={index} value={item.ref}>{item.servicetitle}</MenuItem>
                            })}
                        </Select>
                    </FormControl>: null}
                </Stack>
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={addNew} startIcon={<AddTaskIcon />} >Save</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>    
        </>
    )
}