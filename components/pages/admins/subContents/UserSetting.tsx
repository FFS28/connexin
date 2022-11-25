import React, { ReactNode, useContext, useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import ContentTable from "../../../elements/common/ConnexinTable";
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Dialog, DialogContent, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import { makeJSON } from "../../../../utils/customFuntions/convertFunctions";
import { AppContext } from "../../../../utils/providers/context";
import { validationCheckEmail, validationCheckText, validationCheckNumber } from "../../../../utils/customFuntions/validationFunctions";
import { CallGetAPI, CallPostAPI } from "../../../../utils/customFuntions/callAPIFuntions";
import { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS, INFO_EMAIL_SENDING_SUCCESS } from "../../../../utils/constants";
import { RoleData, RoleListData, ServiceData, ServiceListData, User, UserTableList } from "../../../../utils/customTypes/apiData";

function createData(id: number, name: string, email: string, level: string, state: ReactNode) {
    return { id, name, email, level, state };
}

const headCells = [
    {
        id: 'name',
        numeric: true,
        disablePadding: true,
        label: 'Name'
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email'
    },
    {
        id: 'level',
        numeric: true,
        disablePadding: false,
        label: 'Level'
    },
    {
        id: 'state',
        numeric: true,
        disablePadding: false,
        label: 'State'
    },
];

export default function UserSetting(){

    const {appState, setAppState} = useContext(AppContext);
    const [rows, setRows] = useState<UserTableList[]>([]);
    const [refs, setRefs] = useState<string[]>([]);
    const [searchword, setSearchword] = useState("");
    const [editData, setEditData] = useState<User>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [access, setAccess] = useState(1);
    const [role, setRole] = useState("");
    const [service, setService] = useState("all");
    const [authBy, setAuthBy] = useState("");
    const [active, setActive] = useState(false);
    const [roleList, setRoleList] = useState<RoleListData[]>([]);
    const [serviceList, setServiceList] = useState<ServiceListData[]>([]);
    const [open, setOpen] = useState(false);
    const [editState, setEditState] = useState(false);

    const handleClose = () => {setOpen(false)}

    const handleOpen = () => {setOpen(true)}

    const ChangeHandle = (item: number) => {
        setEditState(false);
        CallPostAPI('/api/admins/getSelectedUser', makeJSON({
            ref: refs[item],
        })).then(res => {
            const data = res as User;
            setEditData(data)
            setEditState(true)
        }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
    }

    const SearchHandle = ( searchWord : string ) => {setSearchword(searchWord)}
    const SendMail = () => {
        CallPostAPI('/api/admins/sendSetPasswordLink', makeJSON({
            ref : editData == null ? "" : editData.ref,
            email : email
        })).then(res => {
            setAppState({...appState, alert: {...appState.alert, open: true, message: res, type: ALERT_TYPE_SUCCESS}})
            resetField()
        }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
    }
    const saveUser = ()=>{
        if(!validationCheckText(name))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please check Name!", type: "error"}})
            return;
        }
        if(validationCheckNumber(access, 0, 0))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please check Access!", type: "error"}})
            return;
        }
        if(!validationCheckEmail(email))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please check Email! it must be chs.net or chs.uk mail", type: "error"}})
            return;
        }
        if(!validationCheckText(role))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please select role!", type: "error"}})
            return;
        }
        if(!validationCheckText(authBy))
        {
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please input Authorised!", type: "error"}})
            return;
        }
        if(!editState){
            CallPostAPI('/api/admins/saveUserRegister', makeJSON({
                name: name, 
                email: email, 
                level: access, 
                role: role, 
                authBy: authBy, 
                service: service,
            })).then(res => {
                CallPostAPI('/api/admins/sendSetPasswordLink', makeJSON({
                    ref: res,
                    email: email
                })).then(s_res => {
                    setAppState({...appState, alert: {...appState.alert, open: true, message: s_res, type: ALERT_TYPE_SUCCESS}})
                    resetField()
                }).catch(s_rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: s_rej, type: ALERT_TYPE_ERROR}}))
            }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
        }else {
            CallPostAPI('/api/admins/updateUser', makeJSON({
                name: name, 
                email: email,
                level: access, 
                role: role, 
                active : active,
                service : service,
                ref : editData == null ? "" : editData.ref,
            })).then(res => {
                setAppState({...appState, alert: {...appState.alert, open: true, messages: res, type: ALERT_TYPE_SUCCESS}})
                resetField()
            }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
        }
    }

    const resetField = () => {
        setEditState(false)
        setName("")
        setEmail("")
        setAccess(1)
        setRole("")
        setActive(false);
        setAuthBy(appState.user.email)
    }

    useEffect(() => {
        CallGetAPI('/api/admins/getAllRoles').then(res => {
            const data = res as RoleData[];
            const temp: RoleListData[] = [];
            data.map((item: RoleData) => {
                temp.push({ref: item.ref, role: item.role})
            })
            setRoleList(temp);
        }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
        CallGetAPI('/api/admins/getAllServices').then(res => {
            const data = res as ServiceData[];
            const temp: ServiceListData[] = [];
            temp.push({ref: "all", service: "All Services"});
            data.map((item: ServiceData) => {
                temp.push({ref: item.ref, service: item.service})  
            })
            setServiceList(temp);
        }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
        setAuthBy(appState.user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect( () => {
        if(!editState){
            CallGetAPI('/api/admins/getAllUsers').then(res => {
                const data = res as User[];
                const tempUser: UserTableList[] = [];
                const refUser: string[] = [];
                data.map((item: User, index: number) => {
                    refUser.push(item.ref)
                    tempUser.push(createData(index, item.name, item.email, `Level ${item.level}`, item.active ? <CheckCircleIcon color="primary" /> : <DoDisturbOnIcon color="secondary" />))  
                })
                setRows(tempUser)
                setRefs(refUser)
            }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editState])

    useEffect(() => {
        if(editState && editData){
            setName(editData.name);
            setAccess(editData.level);
            setRole(editData.role);
            setActive(editData.active);
            setEmail(editData.email);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editState])

    return (
        <>
            <Stack component={"form"} noValidate spacing={10} direction="row" justifyContent={"center"} >
                <Stack spacing={2} width={"50%"}>
                    <TextField type={"text"} value={name} label={"Name"} variant={"standard"} onChange={ event => setName(event.target.value) } fullWidth />
                    <TextField type={"text"} value={email} label={"Email"} variant={"standard"} onChange={ event => setEmail(event.target.value) } disabled={editState} />
                    <FormControl variant={"standard"}>
                        <InputLabel>Access Rights</InputLabel>
                        <Select value={access} onChange={ event => setAccess(event.target.value as number) } sx={{textAlign: "left"}} >
                            <MenuItem value={1}>Level 1</MenuItem>
                            <MenuItem value={2}>Level 2</MenuItem>
                            <MenuItem value={3}>Level 3</MenuItem>
                        </Select>
                    </FormControl>   
                    {appState.user.service == "" ? <FormControl variant={"standard"}>
                        <InputLabel>Restrict to service</InputLabel>
                        <Select value={service} onChange={ event => setService(event.target.value) } sx={{textAlign: "left"}} >
                            {serviceList.map((item: ServiceListData, index: number)=>{
                                return <MenuItem key={index} value={item.ref}>{item.service}</MenuItem>
                            })}
                        </Select>
                    </FormControl> : null}
                </Stack>
                <Stack spacing={2} width={"50%"}>
                    <FormControl variant={"standard"}>
                        <InputLabel>Role</InputLabel>
                        <Select value={role} onChange={ event => setRole(event.target.value) } sx={{textAlign: "left"}} >
                            {roleList.map((item: RoleListData, index: number)=>{
                                return <MenuItem key={index} value={item.ref}>{item.role}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    
                    <TextField type={"text"} value={authBy} label={"Authorised By"} variant={"standard"} onChange={ event => setAuthBy(event.target.value) } disabled={editState} />
                    <Box>
                        { editState && <>
                            <FormControlLabel onChange={() => setActive(!active)} control={<Switch checked = {active} />} label="Active" />
                            <Button variant={"outlined"} color={"error"} onClick={handleOpen} startIcon={<AddTaskIcon />} >Reset Password</Button>
                        </> }
                    </Box>
                </Stack>
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={saveUser} startIcon={<AddTaskIcon />} >Save</Button>
                <Button variant={"outlined"} color={"error"} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>
            <Dialog open={open} onClose={handleClose} aria-labelledby={"alert-dialog-title"} aria-describedby={"alert-dialog-description"} maxWidth={false} >
                <DialogContent>
                    <Typography variant='h6' component={'h6'} sx={{marginBottom: '10px'}}>Do you wish to send a password reset link to {name} email address?</Typography>
                    <Box>
                        <Button variant={"outlined"} color={"error"} onClick={handleClose} startIcon={<DeleteIcon />} sx={{float: 'right'}}>No</Button>
                        <Button variant={"outlined"} color={"primary"} onClick={SendMail} startIcon={<AddTaskIcon />}  sx={{float: 'right', marginRight: '10px'}}>Yes</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            <ContentTable rows={rows.filter((row) => { return row.name.toLowerCase().includes(searchword.toLowerCase())})} headCells={headCells} childrenTag={"SetupUser"} search={SearchHandle} handle={ChangeHandle} />
        </>
    )
}