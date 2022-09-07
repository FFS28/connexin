import React, { useContext, useEffect, useState } from "react";
import ContentTable from "../../../elements/AdminTable";
import { getSelectedTextRemainder, getAllTextRemainder } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import SendTextReminder from "../ManageUser/SendTextReminder.admin";

function createData(id: number, nhsNumber: string, mobile: string, email: string, reminderText: string) {
    return { id, nhsNumber, mobile, email, reminderText };
}

export default function TextRemainderManagement(){
    
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
            id: 'mobile',
            numeric: true,
            disablePadding: false,
            label: 'Mobile Number'
        },
        {
            id: 'email',
            numeric: true,
            disablePadding: false,
            label: 'Email Address'
        },
        {
            id: 'reminderText',
            numeric: true,
            disablePadding: false,
            label: 'Reminder Text'
        }
    ];

    const {appState, setAppState} = useContext(AppContext)

    const ChangeHandle = ( item: number ) => {
        getSelectedTextRemainder(makeJSON({
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
        
    })
    useEffect( () => {
        
        getAllTextRemainder().then((res: any) => {
            res.json().then((data: any)=>{
                const temp: any = []
                const ref_temp: any = []
                data.map((item: any, index: number) => {
                    ref_temp.push({ref : item.ref})
                    temp.push(createData(index, item.nhsNumber, item.mobile, item.email, item.reminderText))  
                })
                setRows(temp)
                setRefs(ref_temp)    
            })
        }).catch(rej => {console.log(rej)})
    }, [appState.changeState, appState.editState])

    return (
        <>
            <SendTextReminder editData={editData} />
            <ContentTable rows={rows.filter((row) => { return row.nhsNumber.toLowerCase().includes(searchword.toLowerCase()) || row.mobile.toLowerCase().includes(searchword.toLowerCase())})} search={SearchHandle} headCells={headCells} childrenTag={"SetupTextRemainder"} handle={ChangeHandle} />
        </>
    )
}