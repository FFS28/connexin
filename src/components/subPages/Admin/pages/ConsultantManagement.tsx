import React, { useContext, useEffect, useState } from "react";
import ContentTable from "../../../elements/AdminTable";
import { getSelectedConsultant, getAllConsultant, getServiceConsultant } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import SetupConsultant from "../ManageUser/SetupConsultant.admin";

function createData(id: number, Consultant: string, ServiceSpecial: string) {
    return { id, Consultant, ServiceSpecial};
}

export default function ConsultantManagement(){
    
    const [rows, setRows] = useState<any[]>([])
    const [refs, setRefs] = useState<{ref: string}[]>([])
    const [searchword, setSearchword] = useState("")
    const [editData, setEditData] = useState(null)
    
    const headCells = [
        {
            id: 'Consultant',
            numeric: true,
            disablePadding: true,
            label: 'Consultant Title'
        },
        {
            id: 'Service/Specialty',
            numeric: true,
            disablePadding: false,
            label: 'ServiceSpecial Title'
        }
    ];

    const {appState, setAppState} = useContext(AppContext)

    const ChangeHandle = ( item: number ) => {
        getSelectedConsultant(makeJSON({
            ref: refs[item].ref,
        })).then((res: any)=> {
            res.json().then((data: any) => {
                setEditData(data)
                setAppState({...appState, editState : true})   
            }).catch((rej: any) => {console.log("This request has some errors.")})
        })
    }

    const SearchHandle = ( searchWord : string ) => {
        setSearchword(searchWord)       
    }

    const getConsultant = (service: string) => {
        getServiceConsultant(makeJSON({service: service})).then((res: any) => {
            res.json().then((data: any)=>{
                const temp: {id: any, Consultant: string, ServiceSpecial: string}[] = []
                const ref_temp: {ref: string}[] = []
                data.map((item: any, index: number) => {
                    ref_temp.push({ref : item.ref})
                    temp.push(createData(index, item.title, item.service))  
                })
                setRows(temp)
                setRefs(ref_temp)    
            }).catch((rej: any)=>{
                console.log("This request has some errors.")
            })
        })
    }

    useEffect(()=> {
        return () => {
            setAppState({...appState, editState : false})
        }
        
    }, [])
    useEffect( () => {
        getAllConsultant().then((res: any) => {
            res.json().then((data: any)=>{
                const temp: {id: any, Consultant: string, ServiceSpecial: string}[] = []
                const ref_temp: {ref: string}[] = []
                data.map((item: any, index: number) => {
                    ref_temp.push({ref : item.ref})
                    temp.push(createData(index, item.title, item.service))  
                })
                setRows(temp)
                setRefs(ref_temp)    
            }).catch((rej: any)=>{
                console.log("This request has some errors.")
            })
        })
    }, [appState.changeState, appState.editState])

    return (
        <>
            <SetupConsultant editData={editData} handle={getConsultant} />
            <ContentTable rows={rows.filter((row) => { return row.Consultant.toLowerCase().includes(searchword.toLowerCase()) || row.ServiceSpecial.toLowerCase().includes(searchword.toLowerCase())})} search={SearchHandle} headCells={headCells} childrenTag={"SetupConsultant"} handle={ChangeHandle} />
        </>
    )
}