import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

import { addNewPreOpQuestionNiares, updatePreOpQuestionNiares, getAllConsultantList, getAllProcedures, getAllQuestionNiareList, getAllServices } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import { validationCheckEmail, validationCheckText } from '../../../../other/validation.globals';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SendPreOpQuestionNiare({editData, handle}: {editData: any, handle: any}){
    
    const {appState, setAppState} = useContext(AppContext)
    const [nhsNumber, setNhsNumber] = useState("")
    const [dob, setDob] = useState("")
    const [service, setService] = useState("")
    const [questionOrSection, setQuestionOrSection] = useState([])
    const [addmission, setAddmission] = useState("")
    const [returnto, setReturnto] = useState("")
    const [email, setEmail] = useState("")
    const [ccemail, setCcemail] = useState("")
    const [personalAddmissionDate, setPersonalAddmissionDate] = useState("")
    const [preAddmissionAdvice, setPreAddmissionAdvice] = useState("")
    const [selConsultant, setSelConsultant] = useState("")
    const [expectedLos, setExpectedLos] = useState("")
    const [sentBy, setSentBy] = useState("")
    const [returnBy, setReturnBy] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [ccmobileNumber, setCcmobileNumber] = useState("")
    const [selProcedure, setSelProcedure] = useState("")
    const [completedDate, setCompletedDate] = useState("")

    const [serviceList, setServiceList] = useState([])
    const [questionniaresList, setQuestionniaresList] = useState([])
    const [admissionTypeList, setAddmissionTypeList] = useState<any>([])
    const [consultantList, setConsultantList] = useState([])
    const [procedureList, setProcedureList] = useState([])
    
    useEffect(()=>{
        getAllServices().then((res: any)=> {
            res.json().then((data: any) => {
                setServiceList(data)
            }).catch((rej: any) => {console.log(rej)})
        })

        getAllQuestionNiareList().then((res:any)=>{
            res.json().then( (data:any) => {
                setQuestionniaresList(data)     
            }).catch((rej: any) => {console.log(rej)})
        })

        const temp = [
            {id: 0, title: "Inpatient"},
            {id: 1, title: "Day Case"}, 
            {id: 2, title: "Outpatient"}
        ]
        // getAllAdmissionTypeList()
        setAddmissionTypeList(temp)

        getAllConsultantList().then((res: any)=>{
            res.json().then((data: any) => {
                setConsultantList(data)
            }).catch((rej: any) => {
                console.log(rej)
            })
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
        handle(appState.users.admin.service)
    }, [])

    useEffect(()=>{
        serviceList.map((item: any) => {
            if(item.ref == service){
                setReturnto(item.serviceEmail)
            }
        })
    }, [service])

    const addNew = () => {
        if(!validationCheckText(nhsNumber)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input NHS number!", type: "error"}})
            return;
        }
        if(!validationCheckText(service)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please select Service!", type: "error"}})
            return;
        }
        if(questionOrSection.length == 0) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please select Questions!", type: "error"}})
            return;
        }
        if(!validationCheckText(addmission.toString())) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Addmission!", type: "error"}})
            return;
        }
        if(!validationCheckText(personalAddmissionDate)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Personal Addmission Date!", type: "error"}})
            return;
        }
        if(!validationCheckText(preAddmissionAdvice)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Pre-Addmission Advice!", type: "error"}})
            return;
        }
        if(!validationCheckEmail(email)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input correct Email!", type: "error"}})
            return;
        }
        if(!validationCheckEmail(returnto)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Return To field!", type: "error"}})
            return;
        }
        if(!validationCheckText(selConsultant)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please select Consultant!", type: "error"}})
            return;
        }
        if(!validationCheckText(expectedLos)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Expected Los!", type: "error"}})
            return;
        }
        if(!validationCheckText(sentBy)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Sent By field!", type: "error"}})
            return;
        }
        if(!validationCheckText(returnBy)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Return By!", type: "error"}})
            return;
        }
        if(!validationCheckText(mobileNumber)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Mobile Number!", type: "error"}})
            return;
        }
        // if(!validationCheckText(ccmobileNumber)) {
        //     setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input CCMobile Number!", type: "error"}})
        //     return;
        // }
        if(!validationCheckText(selConsultant)) {
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please select Consultant!", type: "error"}})
            return;
        }
        if(!appState.editState){
            addNewPreOpQuestionNiares(makeJSON({
                nhsNumber : nhsNumber,
                dob : dob,
                service : service,
                questionOrSection : questionOrSection.map((item: any) => {return item.ref}),
                addmission : addmission,
                returnto : returnto,
                email : email,
                ccemail : ccemail,
                personalAddmissionDate : personalAddmissionDate,
                preAddmissionAdvice : preAddmissionAdvice,
                selConsultant : selConsultant,
                expectedLos : expectedLos,
                sentBy : sentBy,
                returnBy : returnBy,
                mobileNumber : mobileNumber,
                ccmobileNumber : ccmobileNumber,
                selProcedure : selProcedure,
                sendDate: dayjs().format('YYYY-MM-DD')
            })).then((res: any)=>{
                setAppState({...appState, editState : false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                resetField();
            }).catch((rej: any)=>{
                console.log("error")
            })    
        }else {
            updatePreOpQuestionNiares(makeJSON({
                nhsNumber : nhsNumber,
                dob : dob,
                service : service,
                questionOrSection : questionOrSection.map((item: any) => {return item.ref}),
                addmission : addmission,
                returnto : returnto,
                email : email,
                ccemail : ccemail,
                personalAddmissionDate : personalAddmissionDate,
                preAddmissionAdvice : preAddmissionAdvice,
                selConsultant : selConsultant,
                expectedLos : expectedLos,
                sentBy : sentBy,
                returnBy : returnBy,
                mobileNumber : mobileNumber,
                ccmobileNumber : ccmobileNumber,
                selProcedure : selProcedure,
                completedDate : completedDate,
                ref : editData.ref
            })).then((res: any)=>{
                setAppState({...appState, editState: false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: "Successful!", type: "success"}})
                resetField();
            }).catch((rej: any)=>{
                console.log("error")
            })
        }
        
    }

    const resetField = () => {
        setAppState({...appState, editState : false});
        setNhsNumber("")
        setDob("")
        setService(appState.users.admin.service == 0 ? "" : appState.users.admin.service)
        setQuestionOrSection([])
        setAddmission("")
        setReturnto("")
        setEmail("")
        setCcemail("")
        setPersonalAddmissionDate("")
        setPreAddmissionAdvice("")
        setSelConsultant("")
        setExpectedLos("")
        setSentBy("")
        setReturnBy("")
        setMobileNumber("")
        setCcmobileNumber("")
        setSelProcedure("")
    }

    useEffect(()=>{
        if(appState.editState && editData){
            setNhsNumber(editData.nhsNumber)
            setService(editData.service)
            
            setQuestionOrSection(editData.questionOrSection)
            setAddmission(editData.addmission)
            setReturnto(editData.returnto)
            setEmail(editData.email)
            setCcemail(editData.ccemail)
            setPersonalAddmissionDate(editData.personalAddmissionDate)
            setPreAddmissionAdvice(editData.preAddmissionAdvice)
            setSelConsultant(editData.selConsultant)
            setExpectedLos(editData.expectedLos)
            setSentBy(editData.sentBy)
            setReturnBy(editData.returnBy)
            setMobileNumber(editData.mobileNumber)
            setCcmobileNumber(editData.ccmobileNumber)
            setSelProcedure(editData.selProcedure)            
            setCompletedDate(editData.completeDate)
        }
    }, [appState.editState])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <Typography variant={"h4"} component={"h4"} sx={{mt: 1, mb: 2, textAlign:"center"}}>Pre-Operative Questionniare</Typography> */}
            <Stack spacing={10} direction={"row"} >
                <Stack component={"form"} noValidate spacing={2} sx={{ width: "50%"}} >
                    <TextField type={"text"} label={"NHS Number"} value={nhsNumber} variant={"standard"} onChange={ event => setNhsNumber(event.target.value) } />
                    {appState.users.admin.service == 0 ? <FormControl variant={"standard"}>
                        <InputLabel>Select Service</InputLabel>
                        <Select value={service} onChange={(event) => setService(event.target.value)} sx={{textAlign: "left"}} >
                            {serviceList.map((item: any, index: number) => {
                                return <MenuItem key={index} value={item.ref}>{item.serviceSpecial}</MenuItem>
                            })}
                        </Select>
                    </FormControl> : null}
                    <Autocomplete multiple id="tags-standard" options={questionniaresList} defaultValue={[]} getOptionLabel={(option: any) => option.title} onChange={(event: any, value: any) => setQuestionOrSection(value)} renderInput={(params: any) => (
                        <TextField {...params} variant="standard" label="Select Question/Sections" placeholder="Select Question" />
                        )} />
                    <FormControl variant={"standard"}>
                        <InputLabel>Admission Type</InputLabel>
                        <Select value={addmission} onChange={event => setAddmission(event.target.value)} sx={{textAlign: "left"}}>
                            {admissionTypeList.map((item: any, index: number) => {
                                return <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TextField type={"text"} label={"Return to"} value={returnto} variant={"standard"} onChange={event => setReturnto(event.target.value)} />
                    <TextField type={"text"} label={"Email"} value={email} variant={"standard"} onChange={ event => setEmail(event.target.value) } />
                    <TextField type={"text"} label={"c.c.Email"} value={ccemail} variant={"standard"} onChange={ event => setCcemail(event.target.value) } />
                    <DatePicker label={"Admissions Date"} value={ personalAddmissionDate == "" ? null : dayjs(personalAddmissionDate)}
                        inputFormat={"DD/MM/YYYY"}
                        onChange={(newValue) => {
                            setPersonalAddmissionDate(newValue != null ? newValue.format('YYYY-MM-DD') : "")
                        }} renderInput={(params) => <TextField {...params} variant={"standard"} />} />
                    <TextField type={"text"} label={"Pre-Admissions Advice"} value={preAddmissionAdvice} variant={"standard"} onChange={ event => setPreAddmissionAdvice(event.target.value) } />
                </Stack>
                <Stack spacing={2} sx={{width: "50%"}} >
                    <DatePicker label={"DOB"} value={ dob == "" ? null : dayjs(dob)}
                        inputFormat={"DD/MM/YYYY"}
                        onChange={(newValue) => {
                            setDob(newValue != null ? newValue.format('YYYY-MM-DD') : "")
                        }} renderInput={(params) => <TextField {...params} variant={"standard"} />} />
                    <FormControl variant={"standard"}>
                        <InputLabel>Select Consultant</InputLabel>
                        <Select value={selConsultant} onChange={event => setSelConsultant(event.target.value)} sx={{textAlign: "left"}} >
                            {consultantList.map((item: any, index: number) => {
                                return <MenuItem key={index} value={item.ref}>{item.title}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TextField type={"text"} label={"Expected LOS"} value={expectedLos} variant={"standard"} onChange={ event => setExpectedLos(event.target.value) } />
                    <TextField type={"text"} label={"Sent By"} value={sentBy} variant={"standard"} onChange={ event => setSentBy(event.target.value) } />
                    <DatePicker label={"Return By"} value={ returnBy == "" ? null : dayjs(returnBy)}
                        inputFormat={"DD/MM/YYYY"}
                        onChange={(newValue) => {
                            setReturnBy(newValue != null ? newValue.format('YYYY-MM-DD') : "")
                        }} renderInput={(params) => <TextField {...params} variant={"standard"} />} />
                    <TextField type={"text"} label={"Mobile Number"} value={mobileNumber} variant={"standard"} onChange={ event => setMobileNumber(event.target.value) } />
                    <TextField type={"text"} label={"c.c.Mobile Number"} value={ccmobileNumber} variant={"standard"} onChange={ event => setCcmobileNumber(event.target.value) } />
                    <FormControl variant={"standard"}>
                        <InputLabel>Select Procedure</InputLabel>
                        <Select value={selProcedure} onChange={event => setSelProcedure(event.target.value)} sx={{textAlign: "left"}} >
                            {procedureList.map((item: any, index: number) => {
                                return <MenuItem key={index} value={item.ref}>{item.title}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    
                    {/* <Button variant={"contained"}  >Submit</Button> */}
                </Stack>
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={addNew} startIcon={<AddTaskIcon />} >Save to Send</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>
        </LocalizationProvider>
    )
}