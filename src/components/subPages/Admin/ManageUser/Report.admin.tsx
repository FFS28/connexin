import AddTaskIcon from '@mui/icons-material/AddTask';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

import { getAllProcedures, getAllServices } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Report({filterHandle}: {filterHandle: any}){
    
    const [questionNaireName, setQuestionNairename] = useState("")
    const [dateSent, setDateSent] = useState("")
    const [service, setService] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [completeDate, setCompleteDate] = useState("")
    const [sentBy, setSentBy] = useState("")
    const [overDue, setOverDue] = useState("")
    const [selProcedure, setSelProcedure] = useState("")

    const [serviceList, setServiceList] = useState([])
    const [procedureList, setProcedureList] = useState([])
    
    useEffect(()=>{
        getAllServices().then((res: any)=> {
            res.json().then((data: any) => {
                setServiceList(data)
            }).catch((rej: any) => {console.log(rej)})
        })

        getAllProcedures().then((res: any) => {
            res.json().then((data: any)=>{
                const ref_temp: any = []
                data.map((item: any) => {
                    ref_temp.push({ref : item.ref, title: item.procedure})
                })
                setProcedureList(ref_temp)    
            }).catch((rej: any) => {console.log(rej)})
        })
        filterReport()
    }, [])

    const resetField = () => {
        setQuestionNairename("")
        setDateSent("")
        setService("")
        setDueDate("")
        setCompleteDate("")
        setSentBy("")
        setOverDue("")
        setSelProcedure("")
    }

    const filterReport = () => {
        filterHandle(makeJSON({
            name : null,
            selProcedure : selProcedure,
            service : service,
            sentDate : dateSent,
            sentBy : sentBy,
            dueDate : dueDate,
            completedDate : completeDate,
            overdue : overDue,
        }))
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={10} direction={"row"} >
                <Stack component={"form"} noValidate spacing={2} sx={{ width: "50%"}} >
                    <TextField type={"text"} label={"Questionnaire Name"} value={questionNaireName} variant={"standard"} onChange={ event => setQuestionNairename(event.target.value) } />
                    <FormControl variant={"standard"}>
                        <InputLabel>Select Procedure</InputLabel>
                        <Select value={selProcedure} onChange={event => setSelProcedure(event.target.value)} sx={{textAlign: "left"}} >
                            {procedureList.map((item: any, index: number) => {
                                return <MenuItem key={index} value={item.ref}>{item.title}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl variant={"standard"}>
                        <InputLabel>Select Service</InputLabel>
                        <Select value={service} onChange={(event) => setService(event.target.value)} sx={{textAlign: "left"}} >
                            {serviceList.map((item: any, index: number) => {
                                return <MenuItem key={index} value={item.ref}>{item.serviceSpecial}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <DatePicker label={"Sent Date"} value={ dateSent == "" ? null : dayjs(dateSent)}
                        inputFormat={"DD/MM/YYYY"}
                        onChange={(newValue) => {
                            setDateSent(newValue != null ? newValue.format('YYYY-MM-DD') : "")
                        }} renderInput={(params) => <TextField {...params} variant={"standard"} />} />
                </Stack>
                <Stack spacing={2} sx={{width: "50%"}} >
                    <TextField type={"text"} label={"Sent By"} value={sentBy} variant={"standard"} onChange={ event => setSentBy(event.target.value) } />
                    <DatePicker label={"Due Date"} value={dueDate == "" ? null : dayjs(dueDate)}
                        inputFormat={"DD/MM/YYYY"}
                        onChange={(newValue) => {
                            setDueDate(newValue != null ? newValue.format('YYYY-MM-DD') : "")
                        }} renderInput={(params) => <TextField {...params} variant={"standard"} />} />
                    <DatePicker label={"Complete Date"} value={completeDate == "" ? null : dayjs(completeDate)}
                        inputFormat={"DD/MM/YYYY"}
                        onChange={(newValue) => {
                            setCompleteDate(newValue != null ? newValue.format('YYYY-MM-DD') : "")
                        }} renderInput={(params) => <TextField {...params} variant={"standard"} />} />
                    
                    <TextField type={"text"} label={"Over due"} value={overDue} variant={"standard"} onChange={ event => setOverDue(event.target.value) } />
                </Stack>
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={filterReport} startIcon={<AddTaskIcon />} >Filter</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<FlipCameraAndroidIcon />} >Reset</Button>
            </Stack>
        </LocalizationProvider>
    )
}