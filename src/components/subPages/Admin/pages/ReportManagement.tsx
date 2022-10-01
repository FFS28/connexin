import React, { useContext, useEffect, useState } from "react";
import ContentTable from "../../../elements/AdminTable";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { findReport, getAllUserInfo, getSelectedUserInfo } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import Report from "../ManageUser/Report.admin";


function createData(id: number, procedure: string, service: string, sentdate: string, duedate: string, completedate: string, overdueby: string) {
    return { id, procedure, service, sentdate, duedate, completedate, overdueby };
}

export default function ReportManagement(){
    
    const [rows, setRows] = useState<any[]>([])
    const [refs, setRefs] = useState<any[]>([])
    const [searchword, setSearchword] = useState("")
    const [editData, setEditData] = useState(null)

    const headCells = [
        {
            id: 'procedure',
            numeric: true,
            disablePadding: true,
            label: 'Procedure'
        },
        {
            id: 'service',
            numeric: true,
            disablePadding: false,
            label: 'Service'
        },
        {
            id: 'sentdate',
            numeric: true,
            disablePadding: false,
            label: 'Sent date'
        },
        {
            id: 'duedate',
            numeric: true,
            disablePadding: false,
            label: 'Due Date'
        },
        {
            id: 'completedate',
            numeric: true,
            disablePadding: false,
            label: 'Completed Date'
        },
        {
            id: 'overdueby',
            numeric: true,
            disablePadding: false,
            label: 'OverDue By'
        },
    ];

    const {appState, setAppState} = useContext(AppContext)

    const ChangeHandle = ( item: number ) => {
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

    const filterHandle = (data: any) => {
        findReport(data).then((res: any) => {
            res.json().then((data: any) => {
                const temp: {id: number, procedure: string, service: string, sentdate: string, duedate: string, completedate: string, overdueby: string}[] = []
                const ref_temp: {ref: string}[] = []
                data.map((item: any, index: number) => {
                    ref_temp.push({ref : item.ref})
                    temp.push(createData(index, item.selProcedure, item.service, item.personalAddmissionDate, item.returnBy, (item.completedDate == "" ? "-" : item.completedDate) , "-" ))  
                })
                setRows(temp)
                setRefs(ref_temp)
            })
        })
    }

    useEffect(() => {
        return () => {
            setAppState({...appState, editState : false})
        }
    }, [])

    return (
        <>
            <Report filterHandle={filterHandle} />
            <ContentTable rows={rows.filter((row) => { return row.procedure.toLowerCase().includes(searchword.toLowerCase())})} headCells={headCells} childrenTag={"Report"} search={SearchHandle} handle={ChangeHandle} />
        </>
    )
}