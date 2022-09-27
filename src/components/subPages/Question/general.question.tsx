import PauseIcon from '@mui/icons-material/Pause';
import React, { useContext } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material"
import { AppContext } from "../../../provider/index.provider";
import ConnnexinBtn from "../../elements/ConnexinBtn";
import YesNo from "../../elements/Questions/YesNo";
import SubQuestion from "../../elements/Questions/SubQuestion";
import { makeJSON } from '../../../other/functions.globals';


export default function GeneralQuestion({ pageHandle }: {pageHandle : (param: any)=>void}){
    
    const { appState, setAppState } = useContext(AppContext)

    const change_state= (value: boolean, index: number) => {
        const temp = appState.useData.questionNiares;
        temp[appState.pageState.curQuestionniare].questions[appState.pageState.curQuestion].result = value;
        fetch('/api/admins/question/saveData', makeJSON(temp[appState.pageState.curQuestionniare]))
        setAppState({...appState, useData : { ...appState.useData, questionNiares : temp}});
    }
    const change_data= (value: any) => {
        const temp = appState.useData.questionNiares;
        temp[appState.pageState.curQuestionniare].questions[appState.pageState.curQuestion].subQuestions = value;
        setAppState({...appState, useData: { ...appState.useData, questionNiares: temp }});
    }

    const gotoMainPage = () => {
        setAppState({...appState, pageState: {...appState.pageState, curLayout: "MainLayout", curPage: "Home"}});
    }

    return (
        <>
            <Box sx={{minHeight: "60vh"}}>
                <Box sx={{mt: 5}}>
                    <LinearProgress variant="determinate" value={Math.round(( appState.pageState.curQuestion + 1) / appState.useData.questionNiares[appState.pageState.curQuestionniare].questions.length * 100)} />
                </Box>
                <Box >
                    <Typography variant="h5" sx={{mt :1,  mb: 1}}>Question {appState.pageState.curQuestion + 1} of {appState.useData.questionNiares[appState.pageState.curQuestionniare].questions.length}</Typography>
                </Box>
                <Box sx={{float: "none"}}>
                    <Button variant="contained" sx={{float : "right"}} onClick={gotoMainPage}><PauseIcon /></Button>
                </Box>
                <Box style={{marginTop : "70px"}}>
                    <Typography variant="h6" component="div" sx={{float: "none", fontSize: "30px"}}>{appState.useData.questionNiares[appState.pageState.curQuestionniare].questions[appState.pageState.curQuestion].title}</Typography>
                </Box>
                {appState.useData.questionNiares[appState.pageState.curQuestionniare].questions[appState.pageState.curQuestion].type == false ? (
                    <YesNo pageHandle={change_state} proNum={0} value={appState.useData.questionNiares[appState.pageState.curQuestionniare].questions[appState.pageState.curQuestion].result} btnSize={true} />
                ) : null }
                {appState.useData.questionNiares[appState.pageState.curQuestionniare].questions[appState.pageState.curQuestion].result ? <Typography sx={{textAlign: "center", mt: 2, mb: 1}} >Please select option below</Typography>: null}
                {/* <Divider sx={{mt: 1, mb: 1}} /> */}
                {/* {console.log("This is ", appState.useData.questionNiares[appState.pageState.curQuestionniare].questions)} */}
                {appState.useData.questionNiares[appState.pageState.curQuestionniare].questions[appState.pageState.curQuestion].result == true || appState.useData.questionNiares[appState.pageState.curQuestionniare].questions[appState.pageState.curQuestion].type == true ? (
                    
                    <SubQuestion Data={appState.useData.questionNiares[appState.pageState.curQuestionniare].questions[appState.pageState.curQuestion].subQuestions} change_data= {change_data} />
                ) : null }
            </Box>
            <Box sx={{minHeight: "20vh"}}>
                {appState.pageState.curQuestion < appState.useData.questionNiares[appState.pageState.curQuestionniare].questions.length - 1 ? 
                    (<ConnnexinBtn type="contained" value="Save and Continue" moveto={pageHandle} m_page={"next"} />) : 
                    (<ConnnexinBtn type="contained" value="Finish Assessment" moveto={pageHandle} m_page={"finish"} />) 
                }
                {appState.pageState.curQuestion == 0 ? <ConnnexinBtn type="blacktext" value="Back" moveto={pageHandle} m_page={ "begin" } /> : <ConnnexinBtn type="blacktext" value="Back" moveto={pageHandle} m_page={ "prev" } />}
            </Box>
        </>
    )
}