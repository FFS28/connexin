import React, { useContext } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { AppContext } from "../../../../provider/index.provider";
import SubQuestion from "../../../elements/Questions/SubQuestion";
import YesNo from "../../../elements/Questions/YesNo";

export default function QuestionResult({showItem}: {showItem: number}){

    const { appState } = useContext(AppContext)
    const change_sub_pro = (value: any, index: number) => {
        console.log(value) 
    }
    const change_data = (value: any)=>{
        console.log(value)
    }
    return (
        <Box sx={{border: "1px solid lightgrey", borderRadius: "5px", pt: 2}}>
            {appState.EditQus == null ? <Typography variant="h6" component="div" sx={{float: "none", color: "black"}}>Title Content</Typography> : (
                <>
                    <Box sx={{mt : 1}}>
                        <Typography variant="h6" component="div" sx={{float: "none", color: "black"}}>{ appState.EditQus.questions[showItem].title == "" ? "Title Content" : appState.EditQus.questions[showItem].title }</Typography>
                    </Box>
                    {appState.EditQus.questions[showItem].type ? null : <YesNo pageHandle={change_sub_pro} proNum={0} value={null} btnSize={false} /> }
                    <Divider sx={{mt: 1, mb: 1}} />
                    <SubQuestion Data = {appState.EditQus.questions[showItem].subQuestions} change_data={change_data} />
                    <Box sx={{minHeight: "15px"}}></Box>
                </>
            )}
            
        </Box>
    )
}