import React, { useContext, useEffect, useState } from "react";
import ContentTable from "../../../elements/AdminTable";
import { getSelectedQuestionSection, getAllQuestionSections } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";

function createData(id: number, title: string, info: string, link: string) {
    return { id, title, info, link};
}

export default function QuestionSectionsManagement(){
    
    const [rows, setRows] = useState<any[]>([])
    const [refs, setRefs] = useState<{ref: string}[]>([])
    const [searchword, setSearchword] = useState("")

    const headCells = [
        {
            id: 'title',
            numeric: true,
            disablePadding: true,
            label: 'Title'
        },
        {
            id: 'info',
            numeric: true,
            disablePadding: false,
            label: 'Info'
        },
        {
            id: 'link',
            numeric: true,
            disablePadding: false,
            label: 'Link'
        }
    ];

    const {appState, setAppState} = useContext(AppContext)

    const ChangeHandle = ( item: number ) => {

        getSelectedQuestionSection(makeJSON({
            ref: refs[item].ref,
        })).then((res: any)=> {
            res.json().then((data: any) => {
                setAppState({...appState, editState : true, EditQus : data, CtrlQN: {...appState.CtrlQN, madeState: true} })
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
        getAllQuestionSections().then((res: any) => {
            res.json().then((data: any)=>{
                const temp: any = []
                const ref_temp: any = []
                data.map((item: any, index: number) => {
                    ref_temp.push({ref : item.ref})
                    temp.push(createData(index, item.title, item.info, item.link))  
                })
                setRows(temp)
                setRefs(ref_temp)    
            }).catch((rej: any) => {console.log(rej)})
        })
    }, [appState.changeState, appState.editState])

    return (
        <>
            <ContentTable rows={rows.filter((row) => { return row.title.toLowerCase().includes(searchword.toLowerCase()) || row.info.toLowerCase().includes(searchword.toLowerCase())})} search={SearchHandle} headCells={headCells} childrenTag={"makeQuestion"} handle={ChangeHandle} />
        </>
    )
}