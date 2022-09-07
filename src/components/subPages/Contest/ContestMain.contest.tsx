import React, { useContext } from "react"
import {Typography, Divider } from "@mui/material"
import { Box } from "@mui/system";

import ConnnexinBtn from "../../elements/ConnexinBtn";
import ConnexinImgCard from "../../elements/ConnexinImgCard";
import AssessmentHistory from "../../elements/AssessmentHistory";
import { AppContext } from "../../../provider/index.provider";
import { Question, QuestionNiare } from "../../../dataType/provider.dt";


export default function ContestMain({pageHandle}: {pageHandle: (param1:any)=>void}) {
    const { appState } = useContext(AppContext)

    return (
        <>
            <Box sx={{ mb: 10}}>
                <Box sx={{mt: 2, mb : 2}}>
                    <Typography variant="h5" gutterBottom component="div">Questionniare</Typography>
                </Box>
                <Box sx={{mt: 2 }}>
                    <Typography variant="h6" gutterBottom component="div">Pre-op assessment</Typography>
                </Box>
                <Box sx={{pt: 2}}>
                    <Typography variant="h6" gutterBottom component="div">Thank you for completing all of questionniares below. We will need your consent so we can get you ready for the procedure on 12/11/2021.</Typography>
                </Box>
                <Box sx={{pt: 2}}>
                    <ConnnexinBtn type="contained" value="Give contest" moveto={pageHandle} m_page="ContestList" />
                </Box>
                {appState.useData.questionNiares.map((item: QuestionNiare, index: number) => {
                    let subItems = 0;
                    item.questions.map((quiz : Question) => {
                        if(quiz.completed)
                            subItems ++;
                    })
                    const link_text = subItems + "/" + item.questions.length + "completed";
                    return (<ConnexinImgCard key={index}  cardnum={index}  imgURL={item.imgUrl} title={item.title} info={item.info} link={link_text} completed={item.completed} />)
                })}
                <Divider sx={{mt: 2, mb: 2}} />
                <AssessmentHistory />
            </Box>
        </>
    )
}
