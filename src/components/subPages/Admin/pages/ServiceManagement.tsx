import React, { useContext, useEffect, useState } from "react";
import ContentTable from "../../../elements/AdminTable";
import { getSelectedService, getAllServices } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import SetupServiceDirectory from "../ManageUser/SetupServiceDirectory.admin";

function createData(id: number, ServiceSpecial: string, SubServiceSpecial: string, where: string, hospitalSite: string, address: string, postCode: string, addressForRedirection: string, serviceEmail: string) {
    return { id, ServiceSpecial, SubServiceSpecial, where, hospitalSite, address, postCode, addressForRedirection, serviceEmail};
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
            label: 'Service Specialty'
        },
        {
            id: 'SubServiceSpecial',
            numeric: true,
            disablePadding: true,
            label: 'Sub Service Specialty'
        },
        {
            id: 'where',
            numeric: true,
            disablePadding: false,
            label: 'Where'
        },
        {
            id: 'hospitalSite',
            numeric: true,
            disablePadding: false,
            label: 'Hostpital Site'
        },
        {
            id: 'address',
            numeric: true,
            disablePadding: false,
            label: 'Address'
        },
        {
            id: 'postCode',
            numeric: true,
            disablePadding: false,
            label: 'Post Code'
        },
        {
            id: 'addressForRedirection',
            numeric: true,
            disablePadding: false,
            label: 'URL Address For Redirection'
        },
        {
            id: 'serviceEmail',
            numeric: true,
            disablePadding: false,
            label: 'Service Email'
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
                    temp.push(createData(index, item.serviceSpecial, item.subServiceSpecial, item.where, item.hospitalSite, item.address, item.postCode, item.addressForRedirection, item.serviceEmail))  
                })
                setRows(temp)
                console.log(temp)
                setRefs(ref_temp)    
            }).catch((rej: any) => {console.log(rej)})
        })
    }, [appState.changeState, appState.editState])

    return (
        <>
            <SetupServiceDirectory editData={editData} />
            <ContentTable rows={rows.filter((row) => { 
                    return row.ServiceSpecial.toLowerCase().includes(searchword.toLowerCase()) || 
                    row.SubServiceSpecial.toLowerCase().includes(searchword.toLowerCase())
                })} search={SearchHandle} headCells={headCells} childrenTag={"SetupService"} handle={ChangeHandle} /> 
        </>
    )
}