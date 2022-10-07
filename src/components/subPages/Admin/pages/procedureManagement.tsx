import React, { useContext, useEffect, useState } from "react";
import ContentTable from "../../../elements/AdminTable";
import { getSelectedProcedure, getAllProcedures, getServiceProcedure } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import SetupProcedureTreatment from "../ManageUser/SetupProcedureTreatment.admin";

function createData(id: number, procedure: string, service: string, timetoken: string, benifits: string, risk: string, potentialComplications: string) {
    return { id, procedure, service, timetoken, benifits, risk, potentialComplications };
}

export default function ProcedureManagement(){
    
    const [rows, setRows] = useState<any[]>([])
    const [refs, setRefs] = useState<{ref: string}[]>([])
    const [searchword, setSearchword] = useState("")
    const [editData, setEditData] = useState(null)

    const headCells = [
        {
            id: 'procedure',
            numeric: true,
            disablePadding: true,
            label: 'Procedure Title'
        },
        {
            id: 'service',
            numeric: true,
            disablePadding: false,
            label: 'Service Title'
        },
        {
            id: 'timetoken',
            numeric: true,
            disablePadding: false,
            label: 'Time Taken'
        },
        {
            id: 'benifits',
            numeric: true,
            disablePadding: false,
            label: 'Benifits'
        },
        {
            id: 'risk',
            numeric: true,
            disablePadding: false,
            label: 'Risk'
        },
        {
            id: 'potentialComplications',
            numeric: true,
            disablePadding: false,
            label: 'Potential Complications'
        }
    ];

    const {appState, setAppState} = useContext(AppContext)

    const ChangeHandle = ( item: number ) => {
        getSelectedProcedure(makeJSON({
            ref: refs[item].ref,
        })).then((res: any)=> {
            res.json().then((data: any) => {
                setEditData(data);
                setAppState({...appState, editState : true})
            })
        }).catch((rej: any) => {
            console.log(rej)
        })
    }

    const SearchHandle = ( searchWord : string ) => {
        setSearchword(searchWord)       
    }

    const change_service = (service: string) => {
        getServiceProcedure(makeJSON({service: service})).then((res: any) => {
            res.json().then((data: any)=>{
                const temp: {id: number, procedure: string, service: string, timetoken: string, benifits: string, risk: string, potentialComplications: string}[] = []
                const ref_temp: {ref: string}[] = []
                data.map((item: any, index: number) => {
                    ref_temp.push({ref : item.ref})
                    temp.push(createData(index, item.procedure, item.service, item.timeToken, item.benifits, item.risk, item.potentialComplications))  
                })
                setRows(temp)
                setRefs(ref_temp)    
            }).catch((rej: any) => {console.log(rej)})
        })
    }

    useEffect(()=>{
        return () => {
            setAppState({...appState, editState : false})
        }
        
    }, [])
    useEffect( () => {
        if(appState.users.admin.service == "0")
            getAllProcedures().then((res: any) => {
                res.json().then((data: any)=>{
                    const temp: {id: number, procedure: string, service: string, timetoken: string, benifits: string, risk: string, potentialComplications: string}[] = []
                    const ref_temp: {ref: string}[] = []
                    data.map((item: any, index: number) => {
                        ref_temp.push({ref : item.ref})
                        temp.push(createData(index, item.procedure, item.service, item.timeToken, item.benifits, item.risk, item.potentialComplications))  
                    })
                    setRows(temp)
                    setRefs(ref_temp)    
                }).catch((rej: any) => {console.log(rej)})
            })
    }, [appState.changeState, appState.editState])

    return (
        <>
            <SetupProcedureTreatment editData={editData} handle={change_service} />
            <ContentTable rows={rows.filter((row) => { return row.procedure.toLowerCase().includes(searchword.toLowerCase()) || row.service.toLowerCase().includes(searchword.toLowerCase())})} search={SearchHandle} headCells={headCells} childrenTag={"SetupProcedure"} handle={ChangeHandle} />
        </>
    )
}