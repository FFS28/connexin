import styled from '@emotion/styled';
import React, { useContext } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ConnnexinBtn from '../../elements/ConnexinBtn';
import { AppContext } from '../../../provider/index.provider';
import { Question } from '../../../dataType/provider.dt';


function createData(name: string, value: number | string) {
    return { name, value };
}



function StartPanel() {
    const { appState } = useContext(AppContext);
    const rows = [
        createData('Estimated time', "5mins"),
        createData('Number of Questions', appState.useData.questionNiares[appState.pageState.curQuestionniare].questions.length)
    ];

    let temp = 0
    appState.useData.questionNiares[appState.pageState.curQuestionniare].questions.map((item : Question)=>{
        temp = item.completed ? temp+1 : temp
    })
    rows.push(createData('Completed Questions', temp))

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const Img = styled('img')({
    margin: '30px auto',
    display: 'block',
    borderRadius: "50%"
});

export default function BeginPage({ pageHandle } : { pageHandle : (param1: any)=>void }) {
    return (
        <>
            <Box sx={{ minHeight: "60vh" }} >
                <Box>
                    <Typography variant={"subtitle1"} component={"div"}>Questionnaire</Typography>
                    <Typography variant={"h6"} component={"div"} >General infomation</Typography>
                </Box>
                <Box>
                    <Img src={"https://visualpharm.com/assets/448/User-595b40b85ba036ed117dbd22.svg"} alt={"Question Section Image"} width={"250px"} height={"250px"} />
                </Box>
                <Box>
                    <StartPanel />
                </Box>
            </Box>
            <Box sx={{ minHeight: "20vh" }} >
                <ConnnexinBtn type={"contained"} value={"Begin"} moveto={pageHandle} m_page={"generalQuestion"} />
                <ConnnexinBtn type={"blacktext"} value={"Close"} moveto={pageHandle} m_page={"Question"} />
            </Box>
        </>
    )
}