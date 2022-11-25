import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Stack, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "../../../../utils/constants";
import { CallGetAPI, CallPostAPI } from "../../../../utils/customFuntions/callAPIFuntions";
import { makeJSON } from "../../../../utils/customFuntions/convertFunctions";
import { validationCheckText } from "../../../../utils/customFuntions/validationFunctions";
import { RoleData, RoleTableList } from "../../../../utils/customTypes/apiData";
import { AppContext } from "../../../../utils/providers/context";
import ContentTable from "../../../elements/common/ConnexinTable";


function createData(id: number, role: string, author: string): RoleTableList {
    return { id, role, author};
}

const headCells = [
    {
        id: 'role',
        numeric: true,
        disablePadding: true,
        label: 'Title'
    },
    {
        id: 'author',
        numeric: true,
        disablePadding: false,
        label: 'Author'
    }
];

export default function RoleSetting(){
    
    const [rows, setRows] = useState<RoleTableList[]>([]);
    const [refs, setRefs] = useState<string[]>([]);
    const [searchword, setSearchword] = useState("");
    const [editData, setEditData] = useState<RoleData>();
    const [editState, setEditState] = useState(false);
    const {appState, setAppState} = useContext(AppContext);
    const [role, setRole] = useState("")
    const [authBy, setAuthBy] = useState("")

    const addNewRole = () => {
        if(!validationCheckText(role)){
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please check your role name!", type: ALERT_TYPE_ERROR}})            
            return;
        }
        if(!validationCheckText(authBy)){
            setAppState({...appState, alert: {...appState.alert, open: true, messages: "Please check your authorised!", type: ALERT_TYPE_ERROR}})
            return;
        }
        if(!editState){
            CallPostAPI('/api/admins/addRole', makeJSON({
                role: role, 
                author: authBy
            })).then(res => {
                setAppState({...appState, alert: {...appState.alert, open: true, messages: res, type: ALERT_TYPE_SUCCESS}})
                resetField()
            }).catch(rej => {
                setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}})
            })
        }else {
            CallPostAPI('/api/admins/updateRole', makeJSON({
                role: role, author: authBy, ref: editData == null ? "" : editData.ref
            })).then(res => {
                setAppState({...appState, alert: {...appState.alert, open: true, messages: res, type: ALERT_TYPE_SUCCESS}})
                resetField()
            }).catch(rej => {
                setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}})
            })
        }
    }
    const resetField = () => {
        setEditState(false)
        setRole("")
        setAuthBy(appState.user.email)
    }
    const ChangeHandle = (item: number ) => {
        CallPostAPI('/api/admins/getSelectedRole', makeJSON({
            ref: refs[item]
        })).then(res => {
            const data = res as RoleData;
            setEditData(data);
            setEditState(true);
        }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
    }
    const SearchHandle = ( searchWord : string ) => {
        setSearchword(searchWord)       
    }
    useEffect( () => {
        CallGetAPI('/api/admins/getAllRoles').then(res => {
            const data = res as RoleData[];
            const tempRole: RoleTableList[] = [];
            const refRole: string[] = [];
            data.map((item: RoleData, index: number) => {
                refRole.push(item.ref);
                tempRole.push(createData(index, item.role, item.author))
            })
            setRows(tempRole)
            setRefs(refRole) 
        }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
        if(editState && editData){
            setRole(editData.role)
            setAuthBy(editData.author)
        }
        setAuthBy(appState.user.email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editState])

    return (
        <>
            <Stack component={"form"} spacing={10} direction="row">
                <Stack spacing={2} width={"50%"}>
                    <TextField type={"text"} label="Role" value={role} variant={"standard"} onChange={ event => setRole(event.target.value) } />
                </Stack>
                <Stack spacing={2} width={"50%"}>
                    <TextField type={"text"} label="Authorised By" value={authBy} variant={"standard"} onChange={ event => setAuthBy(event.target.value) } />
                </Stack>            
            </Stack>
            <Stack component={"form"} noValidate spacing={4} direction="row" justifyContent={"right"} sx={{mt: 4}} >
                <Button variant={"outlined"} color={"primary"} onClick={addNewRole} startIcon={<AddTaskIcon />} >Save</Button>
                <Button variant={"outlined"} color={ALERT_TYPE_ERROR} onClick={resetField} startIcon={<DeleteIcon />} >Cancel</Button>
            </Stack>
            <ContentTable rows={rows.filter((row) => { return row.role.toLowerCase().includes(searchword.toLowerCase()) || row.author.toLowerCase().includes(searchword.toLowerCase())})} search={SearchHandle} headCells={headCells} childrenTag={"SetupRole"} handle={ChangeHandle} />
        </>
    )
}