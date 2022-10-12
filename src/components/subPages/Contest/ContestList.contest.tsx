import React, { useState, useContext } from "react"
import {Typography, TextField, ButtonGroup, Button, Stack } from "@mui/material"
import { Box } from "@mui/system";
import { jsPDF } from "jspdf";
import ConnnexinBtn from "../../elements/ConnexinBtn";
import { AppContext } from "../../../provider/index.provider";
import YesNo from "../../elements/Questions/YesNo";
import ConnecxinCheckCard from "../../elements/ConnexniCheckCard";
import Signature from "../../elements/Signature";
import { sendingPDF } from "../../../other/apis.globals";
import { makeJSON } from "../../../other/functions.globals";


export default function ContestList() {
    const { appState, setAppState } = useContext(AppContext)
    const [curpage, setCurpage] = useState(-1)
    const [contestQus, setContestQus] = useState(true)
    const [drawType, setDrawType] = useState("draw")
    const [drawData, setDrawData] = useState<any>(null)
    const change_page = (index: any) => {
        const padding = 7;
        if(index == "complete") {
            const doc = new jsPDF();
            doc.setFont("normal");
            doc.setFontSize(11);
            
            let nI = 0;
            let cN = 1;
            doc.text(`NHS Number: ${appState.users.user.nhsnumber}`, null, 20, { align: 'right'} );
            nI += padding * cN;
                
            appState.useData.questionNiares.map((questionnaire: any) => {
                cN = 1;
                nI += padding * cN;
                doc.text(questionnaire.title, padding, nI);
                cN = questionnaire.title.split('\n').length; 
                questionnaire.questions.map((question: any) => {
                    nI += padding * cN;
                    doc.text(question.title, padding * 2, nI);
                    cN = question.title.split('\n').length;
                    nI += padding * cN;
                    if(question.result)
                        doc.text("YES", padding * 2, nI)
                    else 
                        return;
                    cN = 1;
                    question.subQuestions.map((subquestion: any) => {
                        nI += padding * cN;
                        doc.text(subquestion.title, padding * 3, nI);
                        if (nI > 280) {
                            nI = 10;
                            doc.addPage();
                        }
                        nI += padding * cN;
                        if(typeof(subquestion.result) == "string")
                            doc.text(subquestion.result, padding * 3, nI);
                        else 
                            doc.text(subquestion.result.join(","), padding * 3, nI);
                        if (nI > 280) {
                            nI = 10;
                            doc.addPage();
                        }
                    })
                })    
                        
            })
            // sendingPDF(makeJSON({
            //     pdf: doc.output('datauristring').split('base64,')[1],
            //     ref: appState.users.user.ref
            // })).then((res: any) => {
            //     console.log(res)
            // }).catch((err: any) => {
            //     console.log(err)
            // })
            // doc.save("Connnexin-Questionnaire.pdf");
            setAppState({...appState, pageState: { ...appState.pageState, curLayout : "MainLayout", curPage : "Question"}})
            return;
        }
        if(index == "home"){
            setAppState({...appState, pageState: { ...appState.pageState, curLayout : "MainLayout", curPage : "Question"}})
            return;
        }
        if(index == -2)
        {
            const temp = appState.useData.contestList
            for(let i =0 ; i < appState.useData.contestList.length; i++){
                if(temp[i].active == false)
                {
                    setCurpage(i)
                    return;
                }
            }
            setCurpage(-3)
            return;
        }    
        setCurpage(index)
    }

    const read_page = (index : any) => {
        const temp = appState.useData.contestList
        temp[curpage].active = true
        setAppState({...appState, useData: { ...appState.useData, ContestList : temp}})
        setCurpage(index)
    }

    const change_contestQus = (value: boolean, index: number) => {
        setContestQus(value)
    }

    const upload_file = (event: any) => {
        const image = new Image();
        try{
            image.src = URL.createObjectURL(event.target.files[0]);
        }
        catch(err){
            setAppState({...appState, alert: {...appState.alert, open: true, message: "Pleasae try again", type: "warning"}})
        }
        setDrawData(image)
    }

    return (
        <>
            <Box sx={{pl : 0.5, pr: 0.5, position : "relative", mb : 2}}>
                <Box sx={{mt: 2, mb : 2}}>
                    <Typography variant="h5" gutterBottom component="div">Contest</Typography>
                </Box>
                {curpage == -1 ? (
                    <Box>
                        <Box sx={{minHeight : "60vh"}}>
                            <Box sx={{mt: 2 }}>
                                <Typography variant="h6" gutterBottom component="div">Your planned treatment</Typography>
                            </Box>
                            <Box sx={{mt: 2 }}>
                                <Typography variant="subtitle1" gutterBottom component="div">Date/time of procedure</Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">{appState.users.user.addmissionDate}</Typography>
                            </Box>
                            <Box sx={{mt: 2 }}>
                                <Typography variant="subtitle1" gutterBottom component="div">Planned procedure</Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">{appState.users.user.procedure}</Typography>
                            </Box>
                            <Box sx={{mt: 2 }}>
                                <Typography variant="subtitle1" gutterBottom component="div">Please complete the following questions and provide us with consent by {appState.users.user.returnByDate}.</Typography>
                            </Box>
                            <Box>
                                {appState.useData.contestList.map((item: any, index: number) => {
                                    return <ConnecxinCheckCard pageHandle={change_page} key={index} title={item.title} action={item.active} listNum={item.active == true ? -1 : index } />
                                })}
                            </Box>
                        </Box>
                        <Box sx={{minHeight: "20vh"}}>
                            <ConnnexinBtn type="contained" value= "Next" moveto={change_page} m_page={-2} />
                        </Box>
                    </Box>
                ) : null }
                {(curpage > -1) && (curpage < appState.useData.contestList.length) ? (
                    <Box>
                        <Box sx={{minHeight: "60vh"}}>
                            <Box sx={{mt: 2, mb: 4 }}>
                                <Typography variant="h6" gutterBottom component="div">{appState.useData.contestList[curpage].title}</Typography>
                            </Box>
                            <Box sx={{mt: 2 }}>
                                <Typography variant="subtitle1" gutterBottom component="div">{appState.useData.contestList[curpage].data}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{minHeight: "20vh"}}>
                            <ConnnexinBtn type="contained" value= "I have read, and understood" moveto={read_page} m_page={-1} />
                        </Box>
                    </Box>
                ) : null }
                {curpage == -3 ? (
                    <Box>
                        <Box sx={{minHeight : "60vh"}}>
                            <Box sx={{mt: 2, mb: 4, pt: 8}} >
                                <Typography variant="h5" component="div">Do you have any questions, or concerns that you have not been answered by infomation provided?</Typography>
                            </Box>
                            <YesNo pageHandle={change_contestQus} value={contestQus} proNum={0} btnSize={false} />
                        </Box>
                        <Box sx={{minHeight: "20vh"}}>
                            <ConnnexinBtn type="contained" value= "Next" moveto={change_page} m_page={-4} />
                        </Box>
                    </Box>
                ) : null}
                { curpage == -4 && contestQus == true ? (<>
                    <Box>
                        <Box sx={{minHeight : "60vh"}}>
                            <Box sx={{mt: 2, mb: 4, pt: 8}} >
                                <Typography variant="h5" component="div">Do you have any questions, or concerns that you have not been answered by infomation provided?</Typography>
                            </Box>
                            <TextField id="outlined-basic" multiline label="Enter details here" variant="outlined" fullWidth />
                        </Box>
                        <Box sx={{minHeight: "10vh"}}>
                            <ConnnexinBtn type="contained" value= "Submit" moveto={change_page} m_page={-5} />
                        </Box>
                    </Box>
                </>) : null}
                { curpage == -4 && contestQus == false ? (<>
                    <Box>
                        <Box sx={{minHeight : "60vh"}}>
                            <Box sx={{mt: 2, mb: 2, pt: 4}} >
                                <Typography variant="h5" component="div">Do you have any questions, or concerns that you have not been answered by infomation provided?</Typography>
                            </Box>
                            <Box sx={{mt: 1, mb: 1}} >
                                <Typography variant="h6" component="div">Date/Time of procedure</Typography>
                                <Typography variant="subtitle1" component="div">15/11/2021 01:30 pm</Typography>
                            </Box>
                            <Box sx={{mt: 1, mb: 1}} >
                                <Typography variant="h6" component="div">Planned procedure</Typography>
                                <Typography variant="subtitle1" component="div">Heart surgery</Typography>
                            </Box>
                            <Box sx={{mt: 1, mb: 1}} >
                                <Typography variant="h6" component="div">Name</Typography>
                                <Typography variant="subtitle1" component="div">John Smith</Typography>
                            </Box>
                            <Box sx={{mt: 1, mb: 1}} >
                                <Typography variant="h6" component="div">NHS Number</Typography>
                                <Typography variant="subtitle1" component="div">123456789</Typography>
                            </Box>
                            <Box sx={{mt: 4, mb: 1}} >
                                <Typography variant="subtitle1" component="div" sx={{textAlign: "justify"}}>I, John Smith have read and understood the information relating to my planned procedure and wish to proceed with my treatment. I agree to the procedure or course of my treatment described in this section and information provided diring my consultation with my consultant or member of his team.</Typography>
                            </Box>
                            <Box sx={{mt: 1, mb: 1}} >
                                <Typography variant="subtitle1" component="div" sx={{textAlign: "justify"}}>I understood that you cannot give me a guarantee that a particular person will, perform the procedure. The person will, however, have appropriate experience.</Typography>
                            </Box>
                            <Box sx={{mt: 1, mb: 1}} >
                                <Typography variant="subtitle1" component="div" sx={{textAlign: "justify"}}>I, John Smith have read and understood the information relating to my planned procedure and wish to proceed with my treatment. I agree to the procedure or course of my treatment described in this section and information provided diring my consultation with my consultant or member of his team.</Typography>
                            </Box>
                            <Box sx={{mt: 1, mb: 1}} >
                                <Typography variant="subtitle1" component="div" sx={{textAlign: "justify"}}>I understood that you cannot give me a guarantee that a particular person will, perform the procedure. The person will, however, have appropriate experience.</Typography>
                            </Box>
                            <Box sx={{mt: 1, mb: 1}} >
                                <Typography variant="subtitle1" component="div" sx={{textAlign: "justify"}}>I, John Smith have read and understood the information relating to my planned procedure and wish to proceed with my treatment. I agree to the procedure or course of my treatment described in this section and information provided diring my consultation with my consultant or member of his team.</Typography>
                            </Box>
                            <Box sx={{mt: 1, mb: 1}} >
                                <Typography variant="h6" component="div">Procedure I do not widh to be carried out without further discussion, even if I become at ridk of death</Typography>
                                <TextField id="outlined-basic" multiline label="Enter details here" variant="outlined" fullWidth />
                            </Box>
                            
                        </Box>
                        <Box sx={{minHeight: "20vh"}}>
                            <ConnnexinBtn type="contained" value= "Submit" moveto={change_page} m_page={-6} />
                        </Box>
                    </Box>
                </>) : null}
                { curpage == -5 ? (<>
                    <Box>
                        <Box sx={{minHeight : "60vh"}}>
                            <Box sx={{mt: 2, mb: 4, pt: 8}} >
                                <Typography variant="h5" component="div">Thank you for your feedback.</Typography>
                            </Box>
                        </Box>
                        <Box sx={{minHeight: "20vh"}}>
                            <ConnnexinBtn type="contained" value= "Return Home" moveto={change_page} m_page={"home"} />
                        </Box>
                    </Box>
                </>) : null}
                { curpage == -6 ? (<>
                    <Box>
                        <Box sx={{minHeight : "60vh"}}>
                            <Box sx={{mt: 2, mb: 10, pt: 8}}>
                                <ButtonGroup  aria-label="outlined primary button group">
                                    <Button variant={drawType == "draw" ? "contained" : "outlined"} onClick={()=>{setDrawType("draw")}} >Draw</Button>
                                    <Button variant={drawType == "type" ? "contained" : "outlined"} onClick={()=>{setDrawType("type")}} >Type</Button>
                                    <Button variant={drawType == "upload" ? "contained" : "outlined"} onClick={()=>{setDrawType("upload")}} >Upload</Button>
                                </ButtonGroup>
                            </Box>
                            <Box sx={{mt: 10, mb: 10}}>
                                <Stack spacing={2} direction={"column"}>
                                    {drawType == "type" ? <TextField label="Input Name" onChange={ event=>setDrawData(event.target.value) } variant="standard" /> : null }
                                    {drawType == "upload" ? <Button variant="contained" component="label"> 
                                        Upload File 
                                        <input type="file" onChange={upload_file} hidden accept=".jpg,.png"/>
                                    </Button> : null }
                                    <Signature type={drawType} data={drawData} />
                                </Stack>
                            </Box>
                        </Box>
                        <Box sx={{minHeight: "20vh"}}>
                            <ConnnexinBtn type="contained" value= "Accept and Sign In" moveto={change_page} m_page={"complete"} />
                        </Box>
                    </Box>
                </>) : null}
            </Box>
        </>
    )
}
