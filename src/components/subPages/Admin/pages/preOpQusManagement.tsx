import React, { useContext, useEffect, useState } from "react";
import ContentTable from "../../../elements/AdminTable";
import { getSelectedPreOpQuestionNiares, getAllPreOpQuestionNiares, getServiceQuestionnaire } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import SendPreOpQuestionNiare from "../ManageUser/SendPreOpQuestionNiare.admin";

function createData(id: number, nhsNumber: string, service: string, addmission: string, consultant: string, procedure: string, email: string) {
    return { id, nhsNumber, service, addmission, consultant, procedure, email};
}

export default function PreOpQusManagement(){
    
    const [rows, setRows] = useState<any[]>([])
    const [refs, setRefs] = useState<{ref: string}[]>([])
    const [searchword, setSearchword] = useState("")
    const [editData, setEditData] = useState(null)

    const headCells = [
        {
            id: 'nhsNumber',
            numeric: true,
            disablePadding: true,
            label: 'NHS Number'
        },
        {
            id: 'service',
            numeric: true,
            disablePadding: false,
            label: 'Service'
        },
        {
            id: 'addmission',
            numeric: true,
            disablePadding: false,
            label: 'Addmission'
        },
        {
            id: 'consultant',
            numeric: true,
            disablePadding: false,
            label: 'Consultant'
        },
        {
            id: 'procedure',
            numeric: true,
            disablePadding: false,
            label: 'Procedure'
        },
        {
            id: 'email',
            numeric: true,
            disablePadding: false,
            label: 'Patient'
        }
    ];

    const {appState, setAppState} = useContext(AppContext)

    const ChangeHandle = ( item: number ) => {
        getSelectedPreOpQuestionNiares(makeJSON({
            ref: refs[item].ref,
        })).then((res: any)=> {
            res.json().then((data: any) => {
                setEditData(data);
                setAppState({...appState, editState : true})    
            }).catch((rej: any)=>{
                console.log("This request has some issues!")
            })
        })
    }

    const SearchHandle = ( searchWord : string ) => {
        setSearchword(searchWord)       
    }

    const change_service = (service: string) => {
        getServiceQuestionnaire(makeJSON({service: service})).then((res: any) => {
            res.json().then((data: any)=>{
                const temp: any = []
                const ref_temp: any = []
                data.map((item: any, index: number) => {
                    ref_temp.push({ref : item.ref})
                    temp.push(createData(index, item.nhsNumber, item.service, item.addmission, item.selConsultant, item.selProcedure, item.email ))  
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
            getAllPreOpQuestionNiares().then((res: any) => {
                res.json().then((data: any)=>{
                    const temp: any = []
                    const ref_temp: any = []
                    data.map((item: any, index: number) => {
                        ref_temp.push({ref : item.ref})
                        temp.push(createData(index, item.nhsNumber, item.service, item.addmission, item.selConsultant, item.selProcedure, item.email ))  
                    })
                    setRows(temp)
                    setRefs(ref_temp)    
                }).catch((rej: any) => {console.log("This request has some issues!")})
            })
    }, [appState.changeState, appState.editState])

    return (
        <>
            <SendPreOpQuestionNiare editData={editData} handle={change_service} />
            {/* <ContentTable rows={rows.filter((row) => { return row.nhsNumber.toLowerCase().includes(searchword.toLowerCase()) || row.service.toLowerCase().includes(searchword.toLowerCase())})} search={SearchHandle} headCells={headCells} childrenTag={"PreOpQuestionNiares"} handle={ChangeHandle} /> */}
        </>
    )
}