import React, { useContext, useEffect, useState } from "react";
import ContentTable from "../../../elements/AdminTable";
import { getAllRoles, getSelectedRole } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import AddRole from "../ManageUser/AddRole.admin";

function createData(id: number, Title: string, Author: string) {
    return { id, Title, Author};
}

export default function RoleManagement(){
    
    const [rows, setRows] = useState<any[]>([])
    const [refs, setRefs] = useState<{ref: string}[]>([])
    const [searchword, setSearchword] = useState("")
    const [editData, setEditData] = useState(null)

    const headCells = [
        {
            id: 'Title',
            numeric: true,
            disablePadding: true,
            label: 'Title'
        },
        {
            id: 'Author',
            numeric: true,
            disablePadding: false,
            label: 'Author'
        }
    ];

    const {appState, setAppState} = useContext(AppContext)

    const ChangeHandle = (item: number ) => {
        getSelectedRole(makeJSON({
            ref: refs[item].ref,
        })).then((res: any)=> {
            res.json().then((data: any) => {
                setEditData(data);
                setAppState({...appState, editState : true})
            }).catch((rej: any) => {
                console.log(rej)
            })
        })
    }

    const SearchHandle = ( searchWord : string ) => {
        setSearchword(searchWord)       
    }

    useEffect(()=>{
        return () => {
            setAppState({...appState, editState : false})
        }
    }, [])
    useEffect( () => {
        getAllRoles().then((res: any) => {
            res.json().then((data: any)=>{
                const temp: {id: number, Title: string, Author: string}[] = []
                const ref_temp: {ref: string}[] = []
                data.map((item: any, index: number) => {
                    ref_temp.push({ref : item.ref})
                    temp.push(createData(index, item.role, item.author))  
                })
                setRows(temp)
                setRefs(ref_temp)    
            }).catch((rej: any) => {console.log(rej)})
        })
    }, [appState.changeState, appState.editState])

    return (
        <>
            <AddRole editData = {editData} />
            <ContentTable rows={rows.filter((row) => { return row.Title.toLowerCase().includes(searchword.toLowerCase()) || row.Author.toLowerCase().includes(searchword.toLowerCase())})} search={SearchHandle} headCells={headCells} childrenTag={"SetupRole"} handle={ChangeHandle} />
        </>
    )
}