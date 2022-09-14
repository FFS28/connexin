import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useContext, useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

import { addNewProcedure, getAllServices, udpateProcedure } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import { validationCheckText } from '../../../../other/validation.globals';

export default function SetupProcedureTreatment({editData, handle}: {editData: any, handle: any}){
    
    const {appState, setAppState} = useContext(AppContext)
    const [procedure, setProcedure] = useState("")
    const [serviceSpecialty, setServiceSpecialty] = useState("0")
    const [timeToken, setTimeToken] = useState("")
    const [risk, setRisk] = useState("")
    const [benifits, setBenifits] = useState("")
    const [potentialComplications, setPotentialComplications] = useState("")
    const [serviceList, setServiceList] = useState([])

    useEffect(()=>{
        getAllServices().then((res: any)=>{
            res.json().then((data: any) => {
                setServiceList(data)
            })
        }).catch((rej: any) => {
            console.log(rej)
        })
        handle(appState.users.admin.service)
    }, [])

    const addNew = () => {
        if(!validationCheckText(procedure))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Procedure!", type: "error"}})
            return;
        }
        if(!validationCheckText(serviceSpecialty))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please select Service Specialty!", type: "error"}})
            return;
        }
        if(!validationCheckText(benifits))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Benifits!", type: "error"}})
            return;
        }if(!validationCheckText(timeToken))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Time Token!", type: "error"}})
            return;
        }if(!validationCheckText(risk))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Risk!", type: "error"}})
            return;
        }if(!validationCheckText(potentialComplications))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Potential Complications!", type: "error"}})
            return;
        }
        if(!appState.editState){
            addNewProcedure(makeJSON({
                procedure: procedure,
                serviceSpecialty: serviceSpecialty,
                timeToken: timeToken,
                risk: risk,
                benifits: benifits,
                potentialComplications: potentialComplications
            })).then((res: any) => {
                res.json().then((data: any)=>{
                    setAppState({...appState, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                })
            }).catch(rej => {
                console.log(rej)
            })
        }else {
            udpateProcedure(makeJSON({
                procedure: procedure,
                serviceSpecialty: serviceSpecialty,
                timeToken: timeToken,
                risk: risk,
                benifits: benifits,
                potentialComplications: potentialComplications,
                ref : editData.ref
            })).then((res: any) => {
                res.json().then((data: any)=>{
                    setAppState({...appState, editState: false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                })
                resetField()
            })
        }
        
    }

    const resetField = () => {
        setAppState({...appState, editState : false});
        setProcedure("")
        setServiceSpecialty("")
        setTimeToken("")
        setRisk("")
        setBenifits("")
        setPotentialComplications("")
    }

    const change_service = (event: any) => {
        handle(event.target.value)
        setServiceSpecialty(event.target.value)
    }

    useEffect(() => {
        if(appState.editState && editData){
            setProcedure(editData.procedure)
            setServiceSpecialty(editData.serviceSpecialty)
            setTimeToken(editData.timeToken)
            setRisk(editData.risk)
            setBenifits(editData.benifits)
            setPotentialComplications(editData.potentialComplications)
        }
    }, [appState.editState])

    return (
        <>
            {/* <Typography variant={"h4"} component={"h4"} sx={{mt: 1, mb: 1, textAlign: "center"}}>Procedure Setting</Typography> */}
            <Stack component={"form"} noValidate spacing={10} direction="row" >                    
                <Stack spacing={2} width={"50%"}>
                    <TextField type={"text"} value={procedure} label={"Procedure"} variant={"standard"} onChange={ event => setProcedure(event.target.value) } />
                    <TextField type={"text"} value={risk} label={"Risk"} variant={"standard"} onChange={ event => setRisk(event.target.value) } />
                    <TextField type={"text"} value={timeToken} label="Approx time taken" variant={"standard"} onChange={ event => setTimeToken(event.target.value) } />    
                </Stack>
                <Stack spacing={2} width={"50%"}>
                    {appState.users.admin.service == 0 ? <FormControl variant={"standard"}>
                        <InputLabel>Service/Specialty</InputLabel>
                        <Select value={serviceSpecialty} onChange={ change_service } sx={{textAlign: "left"}} >
                            <MenuItem value={"0"}>All Items</MenuItem>
                            {serviceList.map((item: any, index: number) => {
                                return <MenuItem key={index} value={item.ref}>{item.serviceSpecial}</MenuItem>
                            })}
                        </Select>
                    </FormControl>: null }
                    <TextField type={"text"} value={benifits} label={"Benefits"} variant={"standard"} onChange={ event => setBenifits(event.target.value) } />
                    <TextField type={"text"} value={potentialComplications} label={"Protential Complications"} variant={"standard"} onChange={ event => setPotentialComplications(event.target.value) } />
                </Stack>
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={addNew} startIcon={<AddTaskIcon />} >Save</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>
        </>
    )
}