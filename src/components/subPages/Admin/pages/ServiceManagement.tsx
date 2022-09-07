import React, { useContext, useEffect, useState } from "react";
import ContentTable from "../../../elements/AdminTable";
import { getSelectedService, getAllServices } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import SetupServiceDirectory from "../ManageUser/SetupServiceDirectory.admin";

function createData(id: number, ServiceSpecial: string, SubServiceSpecial: string) {
    return { id, ServiceSpecial, SubServiceSpecial};
}

export default function ServiceManagement(){
    
    const [rows, setRows] = useState<any[]>([])
    const [refs, setRefs] = useState<{ref: string}[]>([])
    const [searchword, setSearchword] = useState("")
    const [editData, setEditData] = useState(null)

    const headCells = [
        {
            id: 'ServiceSpecial',
            numeric: true,
            disablePadding: true,
            label: 'Service Special'
        },
        {
            id: 'SubServiceSpecial',
            numeric: true,
            disablePadding: false,
            label: 'Sub Service Special'
        }
    ];

    const {appState, setAppState} = useContext(AppContext)

    const ChangeHandle = ( item: number ) => {
        getSelectedService(makeJSON({
            ref: refs[item].ref,
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
        getAllServices().then((res: any) => {
            res.json().then((data: any)=>{
                const temp: any = []
                const ref_temp: any = []
                data.map((item: any, index: number) => {
                    ref_temp.push({ref : item.ref})
                    temp.push(createData(index, item.serviceSpecial, item.subServiceSpecial))  
                })
                setRows(temp)
                setRefs(ref_temp)    
            }).catch((rej: any) => {console.log(rej)})
        })
    }, [appState.changeState, appState.editState])

    return (
        <>
            <SetupServiceDirectory editData={editData} />
            <ContentTable rows={rows.filter((row) => { return row.ServiceSpecial.toLowerCase().includes(searchword.toLowerCase()) || row.SubServiceSpecial.toLowerCase().includes(searchword.toLowerCase())})} search={SearchHandle} headCells={headCells} childrenTag={"SetupService"} handle={ChangeHandle} /> 
        </>
    )
}