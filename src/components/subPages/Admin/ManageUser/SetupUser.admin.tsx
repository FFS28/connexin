import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from "@mui/material";

import { AppContext } from "../../../../provider/index.provider";
import { makeJSON } from "../../../../other/functions.globals";
import { getAllRoles, saveUserRegister, updateUserInfo, getAllServices } from "../../../../other/apis.globals";
import { validationCheckEmail, validationCheckText, validationConnexinEmail } from "../../../../other/validation.globals";

export default function SetupUser({editData}: {editData : any}){
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [access, setAccess] = useState("")
    const [role, setRole] = useState("")
    const [service, setService] = useState("0")
    const [authBy, setAuthBy] = useState("")
    const [sendLink, setSendLink] = useState("")
    const [active, setActive] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [serviceList, setServiceList] = useState([])
    const {appState, setAppState} = useContext(AppContext)
    const [open, setOpen] = useState(false);
    
    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const SendMail = () => {
        console.log("This is Sending Email Part")
    }

    const saveUser = ()=>{
        if(!appState.editState){
            if(!validationCheckText(name))
            {
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check Name!", type: "error"}})
                return;
            }
            if(!validationConnexinEmail(email))
            {
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check Email! it must be chs.net or chs.uk mail", type: "error"}})
                return;
            }
            if(!validationCheckText(access))
            {
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please select Access!", type: "error"}})
                return;
            }
            if(!validationCheckText(role))
            {
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please select role!", type: "error"}})
                return;
            }
            if(!validationCheckText(authBy))
            {
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please input Authorised!", type: "error"}})
                return;
            }
            if(!validationCheckEmail(sendLink))
            {
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check sendlink!", type: "error"}})
                return;
            }
            const data = makeJSON({
                name: name, 
                email: email, 
                access: access, 
                role: role, 
                authBy: authBy, 
                sendLink: sendLink, 
                service: service,
                hospital: appState.users.admin.ref 
            })

            saveUserRegister(data).then((res: any) => { 
                res.json().then((data: string)=>{
                    resetField()
                    setAppState({...appState, alert: {...appState.alert, open: true, message: data, type: "success"}})
                }).catch((rej: any) => {
                    setAppState({...appState, alert: {...appState.alert, open: true, message: "Please try again!", type: "warning"}})
                })
            })
        }else {
            if(!validationCheckText(name))
            {
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please check Name!", type: "error"}})
                return;
            }
            if(!validationCheckText(access))
            {
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please select Access!", type: "error"}})
                return;
            }
            if(!validationCheckText(role))
            {
                setAppState({...appState, alert: {...appState.alert, open: true, message: "Please select role!", type: "error"}})
                return;
            }

            const data = makeJSON({
                name: name, 
                access: access, 
                role: role, 
                active : active,
                service : service,
                ref : editData == null ? "" : editData.ref
            })

            updateUserInfo(data).then((res: any) => { 
                res.json().then((data: string)=>{
                    setAppState({...appState, editState : false, alert: {...appState.alert, open: true, message: data, type: "success"}})
                }).catch((rej: any) => {
                    setAppState({...appState, alert: {...appState.alert, open: true, message: "Please try again!", type: "warning"}})
                })
                resetField()
            })
        }
    }

    const resetField = () => {
        setAppState({...appState, editState : false});
        setName("")
        setEmail("")
        setAccess("")
        setRole("")
        setAuthBy("")
        setSendLink("")
    }

    useEffect(()=>{
        getAllRoles().then((res: any) => {
            res.json().then((data: any)=>{
                setRoleList(data)    
            }).catch((rej: any) => {console.log(rej)})
        })
        getAllServices().then((res: any) => {
            res.json().then((data: any)=>{
                const temp: any = []
                temp.push({ref: "0", servicetitle: "All Services"})
                data.map((item: any) => {
                    temp.push({ref: item.ref, servicetitle: item.serviceSpecial})  
                })
                setServiceList(temp)   
            }).catch((rej: any) => {console.log(rej)})
        })
    }, [])

    useEffect( () => {
        if(appState.editState && editData){
            setName(editData.name)
            setAccess(editData.level)
            setRole(editData.role)
            setActive(editData.active)
        }
    }, [appState.editState] )

    return (
        <>       
            <Stack component={"form"} noValidate spacing={10} direction="row" justifyContent={"center"} >
                <Stack spacing={2} width={"50%"}>
                    <TextField type={"text"} value={name} label={"Name"} variant={"standard"} onChange={ event => setName(event.target.value) } fullWidth />
                    <TextField type={"text"} value={email} label={"Email"} variant={"standard"} onChange={ event => setEmail(event.target.value) } disabled={appState.editState} />
                    <FormControl variant={"standard"}>
                        <InputLabel>Access Rights</InputLabel>
                        <Select value={access} onChange={ event => setAccess(event.target.value) } sx={{textAlign: "left"}} >
                            <MenuItem value={"1"}>Level 1</MenuItem>
                            <MenuItem value={"2"}>Level 2</MenuItem>
                            <MenuItem value={"3"}>Level 3</MenuItem>
                        </Select>
                    </FormControl>   
                    {appState.users.admin.service == 0 ? <FormControl variant={"standard"}>
                        <InputLabel>Restrict to service</InputLabel>
                        <Select value={service} onChange={ event => setService(event.target.value) } sx={{textAlign: "left"}} >
                            {serviceList.map((item: any, index: number)=>{
                                return <MenuItem key={index} value={item.ref}>{item.servicetitle}</MenuItem>
                            })}
                        </Select>
                    </FormControl> : null}
                </Stack>
                <Stack spacing={2} width={"50%"}>
                    <FormControl variant={"standard"}>
                        <InputLabel>Role</InputLabel>
                        <Select value={role} onChange={ event => setRole(event.target.value) } sx={{textAlign: "left"}} >
                            {roleList.map((item: any, index: number)=>{
                                return <MenuItem key={index} value={item.ref}>{item.role}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TextField type={"text"} value={authBy} label={"Authorised By"} variant={"standard"} onChange={ event => setAuthBy(event.target.value) } disabled={appState.editState} />
                    <TextField type={"text"} value={sendLink} label={"Send link to register and setup password"} variant={"standard"} onChange={ event => setSendLink(event.target.value) } disabled={appState.editState} />
                    <Box>
                        { appState.editState && <><FormControlLabel onChange={event => setActive(!active)} control={<Switch checked = {active} />} label="Active" /><Button variant={"outlined"} color={"error"} onClick={handleOpen} startIcon={<AddTaskIcon />} >Reset Password</Button></> }
                    </Box>
                </Stack>
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={saveUser} startIcon={<AddTaskIcon />} >Save</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>
            
            <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby={"alert-dialog-title"} aria-describedby={"alert-dialog-description"} maxWidth={false} >
                <DialogContent>
                    <Typography variant='h6' component={'h6'} ></Typography>
                    <Box>
                        <Button variant={"outlined"} color={"primary"} onClick={SendMail} startIcon={<AddTaskIcon />} >Yes</Button>
                        <Button variant={"outlined"} color={"error"} onClick={handleClose} startIcon={<DeleteIcon />} >No</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}