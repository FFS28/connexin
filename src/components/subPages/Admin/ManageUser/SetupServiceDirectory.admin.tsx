import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useContext, useState, useEffect } from "react";
import { Button, Stack, TextField } from "@mui/material";

import { AppContext } from "../../../../provider/index.provider";
import { addNewService, updateService } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { validationCheckText } from "../../../../other/validation.globals";

export default function SetupServiceDirectory({editData } : {editData: any}){
    
    const {appState, setAppState} = useContext(AppContext)
    const [serviceSpecial, setServiceSpecial] = useState("");
    const [subSpecial, setSubSpecial] = useState("");
    const [where, setWhere] = useState("");
    const [hospitalSite, setHospitalSite] = useState("");
    const [address, setAddress] = useState("");
    const [postCode, setPostCode] = useState("");
    const [addressForRedirection, setAddressForRedirection] = useState("");
    const [serviceEmail, setServiceEmail] = useState("");
    
    const addNew = () => {
        if(!validationCheckText(serviceSpecial)){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your Service name!", type: "error"}})            
            return;
        }
        // if(!validationCheckText(subSpecial)){
        //     setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your sub Service name!", type: "error"}})            
        //     return;
        // }
        if(!validationCheckText(where)){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your Where field!", type: "error"}})            
            return;
        }
        if(!validationCheckText(hospitalSite)){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your Hospital Site!", type: "error"}})            
            return;
        }
        if(!validationCheckText(address)){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your Address!", type: "error"}})            
            return;
        }
        if(!validationCheckText(postCode)){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your Post Code!", type: "error"}})            
            return;
        }
        if(!validationCheckText(addressForRedirection)){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your URL address for redirection field!", type: "error"}})            
            return;
        }
        if(!validationCheckText(serviceEmail)){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check your Service Email field!", type: "error"}})            
            return;
        }
        if(!appState.editState){  
            addNewService(makeJSON({
                serviceSpecial: serviceSpecial, 
                subServiceSpecial: subSpecial,
                where: where, 
                hospitalSite: hospitalSite, 
                address: address, 
                postCode: postCode, 
                addressForRedirection: addressForRedirection, 
                serviceEmail: serviceEmail 
            })).then((res: any) => {
                res.json().then((data: any)=> {
                    setAppState({...appState, editState : false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: data, type: "success"}})
                    resetField();
                }).catch((rej: any) => {
                    console.log(rej)
                })
                resetField();
            })
        }else {
            updateService(makeJSON({
                serviceSpecial: serviceSpecial, 
                subServiceSpecial: subSpecial,
                where: where, 
                hospitalSite: hospitalSite, 
                address: address, 
                postCode: postCode, 
                addressForRedirection: addressForRedirection, 
                serviceEmail: serviceEmail,
                ref : editData.ref
            })).then((res: any) => {
                res.json().then((data: any)=> {
                    setAppState({...appState, editState : false, changeState: !appState.changeState, alert: {...appState.alert, open: true, message: data, type: "success"}})
                    resetField();
                }).catch((rej: any) => {
                    console.log(rej)
                })
                resetField()
            })
        }
    }

    const resetField = ()=>{
        setAppState({...appState, editState : false});
        setServiceSpecial("")
        setSubSpecial("")
        setWhere("")
        setHospitalSite("")
        setAddress("")
        setPostCode("")
        setAddressForRedirection("")
        setServiceEmail("")
    }

    useEffect( () => {
        if(appState.editState && editData){
            setServiceSpecial(editData.serviceSpecial)
            setSubSpecial(editData.subServiceSpecial)
            setWhere(editData.where)
            setHospitalSite(editData.hospitalSite)
            setAddress(editData.address)
            setPostCode(editData.postCode)
            setAddressForRedirection(editData.addressForRedirection)
            setServiceEmail(editData.serviceEmail)
        }
    }, [appState.editState] )

    return (
        <>
            <Stack component={"form"} noValidate spacing={10} direction="row" >
                <Stack spacing={2} width={"50%"}>
                    <TextField type={"text"} value={serviceSpecial} label={"Service/Specialty"} variant={"standard"} onChange={ event => setServiceSpecial(event.target.value) } />
                    <TextField type={"text"} value={where} label={"Where"} variant={"standard"} onChange={ event => setWhere(event.target.value) } />
                    <TextField type={"text"} value={hospitalSite} label={"Hospital Site"} variant={"standard"} onChange={ event => setHospitalSite(event.target.value) } />
                    <TextField type={"text"} value={address} label={"Address"} variant={"standard"} onChange={ event => setAddress(event.target.value) } />
                </Stack>
                <Stack spacing={2} width={"50%"}>
                    <TextField type={"text"} value={postCode} label={"Post Code"} variant={"standard"} onChange={ event => setPostCode(event.target.value) } />
                    <TextField type={"text"} value={addressForRedirection} label={"URL address for direction"} variant={"standard"} onChange={ event => setAddressForRedirection(event.target.value) } />
                    <TextField type={"text"} value={serviceEmail} label={"Service Email Address"} variant={"standard"} onChange={ event => setServiceEmail(event.target.value) } />
                </Stack>
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={addNew} startIcon={<AddTaskIcon />} >Save</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>
        </>
    )
}