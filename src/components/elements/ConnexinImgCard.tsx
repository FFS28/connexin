import CheckIcon from '@mui/icons-material/Check';
import React, { useContext } from "react"
import {Typography, Card, CardContent } from "@mui/material"
import { Box, styled } from "@mui/system";

import { AppContext } from "../../provider/index.provider";

const Img = styled('img')({
    margin: 'auto 10px',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius : "10px"
});

export default function ConnexinImgCard({ cardnum, imgURL, title, info, link, completed = false }: { cardnum: number, imgURL: any, title: string, info: string, link: string, completed: boolean }){
    const { appState, setAppState } = useContext(AppContext);
    const selProblem= () => {
        if(!completed)
            setAppState({...appState, pageState: {...appState.pageState, curQuestionniare : cardnum, curQuestion: 0, curLayout: "QuestionLayout", curPage: "begin"}})
    }
    return (
        <>
            <Box sx={{mt: 2, mb : 2}}>
                <Card onClick={selProblem} sx={{display: 'flex', borderRadius: "10px", position:"relative"}}> 
                    <Img alt="Image" src={imgURL} style={{width: "70px", height: "70px",backgroundColor : "grey"}} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ textAlign: "left"}} >
                            <Typography variant="subtitle1" component="div" sx={{fontSize: 10, color: "#9797ab"}}>
                                {title}
                            </Typography>
                            <Typography variant="h6" component="div" sx={{fontSize: 12, fontWeight: "bold"}}>
                                {info}
                            </Typography>
                            <Typography variant="caption" component="div" sx={{fontSize: 10, color: "#9797ab"}}>
                                {link} 
                            </Typography>
                            {completed == true ? <CheckIcon sx={{position : "absolute", right : "10px", top: "40%"}} /> : null }
                        </CardContent>
                    </Box>
                </Card>
            </Box>
        </>
    )
}

