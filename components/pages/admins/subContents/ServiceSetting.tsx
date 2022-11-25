import React, { useContext, useEffect, useState } from "react";
// import ContentTable from "../../../elements/AdminTable";
// import { getSelectedService, getAllServices } from "../../../../other/apis.globals";
// import SetupServiceDirectory from "../ManageUser/SetupServiceDirectory.admin";
import { AppContext } from "../../../../utils/providers/context";
import { makeJSON } from "../../../../utils/customFuntions/convertFunctions";
import { validationCheckText } from "../../../../utils/customFuntions/validationFunctions";
import { CallGetAPI, CallPostAPI } from "../../../../utils/customFuntions/callAPIFuntions";
import { ServiceData, ServiceTableList } from "../../../../utils/customTypes/apiData";
import { ALERT_TYPE_ERROR } from "../../../../utils/constants";

function createData(id: number, service: string, subservice: string, where: string, hospital: string, address: string, postalcode: string, adsforredirect: string, serviceemail: string) {
    return { id, service, subservice, where, hospital, address, postalcode, adsforredirect, serviceemail};
}

export default function ServiceManagement(){
    
    const [rows, setRows] = useState<ServiceTableList[]>([])
    const [refs, setRefs] = useState<string[]>([])
    const [searchword, setSearchword] = useState("")
    const [editData, setEditData] = useState<ServiceData>()
    const [editState, setEditState] = useState(false);

    const headCells = [
        {
            id: 'service',
            numeric: true,
            disablePadding: true,
            label: 'Service Specialty'
        },
        {
            id: 'subservice',
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
            id: 'hospital',
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
            id: 'postalcode',
            numeric: true,
            disablePadding: false,
            label: 'Post Code'
        },
        {
            id: 'adsforredirect',
            numeric: true,
            disablePadding: false,
            label: 'URL Address For Redirection'
        },
        {
            id: 'serviceemail',
            numeric: true,
            disablePadding: false,
            label: 'Service Email'
        }
    ];

    const {appState, setAppState} = useContext(AppContext)

    const ChangeHandle = ( item: number ) => {
        CallPostAPI('/api/admins/getSelectedService', makeJSON({
            ref: refs[item],
        })).then(res => {
            const data = res as ServiceData;
            setEditData(data);
            setEditState(false);  
        }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
    }

    const SearchHandle = ( searchWord : string ) => {
        setSearchword(searchWord)       
    }

    useEffect( () => {
        CallGetAPI('/api/admins/getServices').then(res => {
            const data = res as ServiceData[];
            const tempService: ServiceTableList[] = [];
            const refService: string[] = [];
            data.map((item: ServiceData, index: number) => {
                refService.push(item.ref);
                tempService.push(createData(index, item.service, item.subservice, item.where, item.hospital, item.address, item.postalcode, item.adsforredirect, item.serviceemail))
            })
            setRows(tempService);
            setRefs(refService);
        }).catch(rej => setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editState])

    return (
        <>
            {/* <SetupServiceDirectory editData={editData} />
            <ContentTable rows={rows.filter((row) => { 
                    return row.ServiceSpecial.toLowerCase().includes(searchword.toLowerCase()) || 
                    row.SubServiceSpecial.toLowerCase().includes(searchword.toLowerCase())
                })} search={SearchHandle} headCells={headCells} childrenTag={"SetupService"} handle={ChangeHandle} />  */}
        </>
    )
}