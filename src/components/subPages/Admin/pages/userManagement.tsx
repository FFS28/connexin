import React, { useContext, useEffect, useState } from "react";
import ContentTable from "../../../elements/AdminTable";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { getAllUserInfo, getSelectedUserInfo } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import SetupUser from "../ManageUser/SetupUser.admin";


function createData(id: number, Name: string, Email: string, Level: string, State: any) {
    return { id, Name, Email, Level, State };
}

export default function UserManagement(){
    
    const [rows, setRows] = useState<any[]>([])
    const [refs, setRefs] = useState<any[]>([])
    const [searchword, setSearchword] = useState("")
    const [editData, setEditData] = useState(null)

    const headCells = [
        {
            id: 'Name',
            numeric: true,
            disablePadding: true,
            label: 'Name'
        },
        {
            id: 'Email',
            numeric: true,
            disablePadding: false,
            label: 'Email'
        },
        {
            id: 'Level',
            numeric: true,
            disablePadding: false,
            label: 'Level'
        },
        {
            id: 'State',
            numeric: true,
            disablePadding: false,
            label: 'State'
        },
    ];

    const {appState, setAppState} = useContext(AppContext)

    const ChangeHandle = ( item: number ) => {
        setAppState({...appState, editState : false}) 
        getSelectedUserInfo(makeJSON({
            ref: refs[item].ref,
            level: appState.users.admin.level-1
        })).then((res: any)=> {
            res.json().then((data: any) => {
                setEditData(data)
                setAppState({...appState, editState : true})   
            })
        }).catch((rej: any) => {
            console.log(rej)
        })  
    }

    const SearchHandle = ( searchWord : string ) => {
        setSearchword(searchWord)       
    }

    useEffect(() => {
        return () => {
            setAppState({...appState, editState : false})
        }
    }, [])

    useEffect( () => {
        getAllUserInfo(makeJSON({
            level: appState.users.admin.level-1,
            hospital: appState.users.admin.ref
        })).then((res: any) => {
            res.json().then((data: any) => {
                const temp: {id: number, Name: string, Email: string, Level: string, State: any}[] = []
                const ref_temp: {ref: string, level: string, active: boolean}[] = []
                data.map((item: any, index: number) => {
                    ref_temp.push({ref : item.ref, level: item.level, active: item.active})
                    temp.push(createData(index, item.name, item.email, `Level ${item.level}`, item.active ? <CheckCircleIcon color="primary" /> : <DoDisturbOnIcon color="secondary" />))  
                })
                setRows(temp)
                setRefs(ref_temp)
            }).catch((rej: any) => {
                console.log(rej)
            })
        })
    }, [appState.changeState, appState.editState])

    return (
        <>
            <SetupUser editData = {editData} />
            <ContentTable rows={rows.filter((row) => { return row.Name.toLowerCase().includes(searchword.toLowerCase())})} headCells={headCells} childrenTag={"SetupUser"} search={SearchHandle} handle={ChangeHandle} />
        </>
    )
}