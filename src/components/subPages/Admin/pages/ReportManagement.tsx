import React, { useContext, useEffect, useState } from "react";
import ContentTable from "../../../elements/AdminTable";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { findReport, getAllUserInfo, sendNotification, getSelectedReportInfo } from "../../../../other/apis.globals";
import { makeJSON } from "../../../../other/functions.globals";
import { AppContext } from "../../../../provider/index.provider";
import Report from "../ManageUser/Report.admin";
import dayjs from 'dayjs';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup } from "@material-ui/core";


function createData(id: number, nhsnumber: string, senderemail: string, procedure: string, service: string, sentdate: string, duedate: string, completedate: string, overdueby: string) {
    return { id, nhsnumber, senderemail, procedure, service, sentdate, duedate, completedate, overdueby };
}

export default function ReportManagement(){
    
    const [rows, setRows] = useState<any[]>([])
    const [refs, setRefs] = useState<any[]>([])
    const [searchword, setSearchword] = useState("")
    const [editData, setEditData] = useState(null)
    const [notification, setNotification] = useState(false)
    const [selectedRef, setSelectedRef] = useState(-1)
    const [email_check, setEmail_check] = useState(true);
    const [phone_check, setPhone_check] = useState(true);
    const [email_active, setEmail_active] = useState(false);
    const [phone_active, setPhone_active] = useState(false);

    const headCells = [
        {
            id: 'nhsnumber',
            numeric: true,
            disablePadding: true,
            label: 'NHS number'
        },
        {
            id: 'senderemail',
            numeric: true,
            disablePadding: true,
            label: 'Sender Email Address'
        },
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

    const showNotify = ( item: number ) => {
        setSelectedRef(item);
        setAppState({...appState, editState : false})
        getSelectedReportInfo(makeJSON({
            id: refs[item].ref
        })).then((res: any)=> {
            res.json().then((data: any) => {
                console.log(data)
                setEmail_active(data.email == "" ? true : false);
                setPhone_active(data.mobileNumber == "" ? true : false);
                setNotification(true); 
            })
        }).catch((rej: any) => {
            console.log(rej)
        })  
    }

    const handleClose = () => {
        setNotification(false);
        sendNotification(makeJSON({
            id: refs[selectedRef].ref,
            email: email_active,
            phone: phone_active
        })).then(() => {
            console.log("success")
        }).catch(()=>{
            console.log("error");
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
                    temp.push(createData(index, item.nhsNumber, item.sentBy, item.selProcedure, item.service, dayjs(item.personalAddmissionDate).format('DD/MM/YYYY'), dayjs(item.returnBy).format('DD/MM/YYYY'), (item.completedDate == "" ? "-" : dayjs(item.completedDate).format('DD/MM/YYYY')) , "-" ))  
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
            <ContentTable rows={rows.filter((row) => { return row.procedure.toLowerCase().includes(searchword.toLowerCase())})} headCells={headCells} childrenTag={"Report"} search={SearchHandle} handle={showNotify} />
            <Dialog open={notification} onClose={handleClose} maxWidth={false} >
                <DialogTitle>
                    Noditication
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <FormGroup row>
                            <FormControlLabel disabled={email_active} control={<Checkbox checked={email_check} onChange={() => setEmail_check(!email_check)} />} label="Email" />
                            <FormControlLabel disabled={phone_active} control={<Checkbox checked={phone_check} onChange={() => setPhone_check(!phone_check)} />} label="Phone" />
                        </FormGroup>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}