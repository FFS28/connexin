import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, Box, Chip, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AppContext } from "../../../../provider/index.provider";
import AddListInputfield from "./addListInputfield";

const subItemList = [
    "Yes/No Question",
    "Single Textfield",
    "Select field",
    "Tickbox",
    "Radio Button",
    "TextArea",
    "MultiSelect",
    "ListInputfield",
    "Text",
    "Datefield",
    "UnitText"
]

export default function SubQusEdit({showItem, showSubItem}: {showItem: number, showSubItem: number}){

    const {appState, setAppState} = useContext(AppContext)
    const [ opinion, setOpinion ] = useState("")
    
    const change_value = (event: any) => {
        setOpinion(event.target.value)
        let type = 0;
        for(let i = 0; i < subItemList.length; i++){
            if(subItemList[i] == event.target.value )
                type = i+1;
        }   
        const temp = appState.EditQus.questions;
        temp[showItem].subQuestions[showSubItem].type = type;
        switch(type){
            case 1:
                temp[showItem].subQuestions[showSubItem].data = "";
                temp[showItem].subQuestions[showSubItem].result = null;
                break;
            case 2:
                temp[showItem].subQuestions[showSubItem].data = "";
                temp[showItem].subQuestions[showSubItem].result = "";
                break;
            case 3:
                temp[showItem].subQuestions[showSubItem].data = "";
                temp[showItem].subQuestions[showSubItem].result = "";
                break;
            case 4:
                // temp[showItem].subQuestions[showSubItem].result = appState.EditQus.questions[showItem].subQuestions[showSubItem].data.map(()=> {
                //     return false;
                // })
                temp[showItem].subQuestions[showSubItem].data = [];
                temp[showItem].subQuestions[showSubItem].result = []
                break;
            case 5:
                temp[showItem].subQuestions[showSubItem].data = "";
                temp[showItem].subQuestions[showSubItem].result = "";
                break;
            case 6:
                temp[showItem].subQuestions[showSubItem].data = "";
                temp[showItem].subQuestions[showSubItem].result = "";
                break;
            case 7:
                temp[showItem].subQuestions[showSubItem].data = [];
                temp[showItem].subQuestions[showSubItem].result = [""];
                break;
            case 8:
                temp[showItem].subQuestions[showSubItem].data = [];
                temp[showItem].subQuestions[showSubItem].result = [];
                break;
            case 9:
                temp[showItem].subQuestions[showSubItem].data = "";
                temp[showItem].subQuestions[showSubItem].result = "";
                break;
            case 10:
                temp[showItem].subQuestions[showSubItem].data = "";
                temp[showItem].subQuestions[showSubItem].result = "";
                break;
            case 11:
                temp[showItem].subQuestions[showSubItem].data = "";
                temp[showItem].subQuestions[showSubItem].result = "";
                break;
        }
        setAppState({...appState, EditQus: {...appState.EditQus, questions: temp}})
    }

    const change_text = (event: any) => {
        const temp = appState.EditQus.questions;
        temp[showItem].subQuestions[showSubItem].title = event.target.value;
        setAppState({...appState, EditQus : {...appState.EditQus, questions: temp}})
    }

    const change_data = (value: any) => {
        const temp = appState.EditQus.questions;
        temp[showItem].subQuestions[showSubItem].data = value;
        if(temp[showItem].subQuestions[showSubItem].type == 8)
            temp[showItem].subQuestions[showSubItem].result = appState.EditQus.questions[showItem].subQuestions[showSubItem].data.map(()=> {
                return 0;
            })
        setAppState({...appState, EditQus : {...appState.EditQus, questions: temp}})
    }

    useEffect(()=>{
        setOpinion(subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1]); 
    }, [])

    return ( 

        <Box sx={{mt: 1, mb: 1}}>
            <FormControl sx={{mt: 1, mb: 1}} fullWidth>
                <InputLabel id="demo-simple-select-label">Quiz Type</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={opinion==undefined?"":opinion} label="Opinion" onChange={change_value} >
                    <MenuItem key={-1} value={''}>Please select Type</MenuItem>
                    {subItemList.map(( item: string, index: number ) => {
                        return <MenuItem key={index} value={item}>{item}</MenuItem>
                    })}
                </Select>
                
            </FormControl>
            { subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1] == "Yes/No Question" ? (
                <>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="h6" component="h6" sx={{textAlign: "left"}} >Type : {opinion}</Typography>
                    </Box>
                    <Box sx={{mt: 1 , mb: 1}}>
                        <TextField label="Title" multiline maxRows={4} onChange={change_text} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].title} type="text" fullWidth />
                    </Box>
                </>
            ) : null}
            { subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1] == "Single Textfield" ? (
                <>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="h6" component="h6" sx={{textAlign: "left"}} >Type : {opinion}</Typography>
                    </Box>
                    <Box sx={{mt: 1 , mb: 1}}>
                        <TextField label="Title" multiline maxRows={4} onChange={change_text} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].title} type="text" fullWidth />
                    </Box>
                </>
            ) : null}
            { subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1] == "Select field" ? (
                <>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="h6" component="h6" sx={{textAlign: "left"}} >Type : {opinion}</Typography>
                    </Box>
                    <Box sx={{mt: 1 , mb: 1}}>
                        <TextField label="Title" multiline maxRows={4} onChange={change_text} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].title} type="text" fullWidth />
                    </Box>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Autocomplete multiple options={[]} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].data} freeSolo onChange={(event, value) => change_data(value)} renderTags={(value: readonly string[], getTagProps) => value.map((option: string, index: number) => (<Chip variant={"outlined"} label={option} key={index} data-tag-index={index} tabIndex={-1} className={getTagProps({ index }).className} onDelete={getTagProps({ index }).onDelete} /> ))} renderInput={(params) => ( <TextField {...params} variant={"outlined"} label={"Data List"} placeholder={"Items"} /> )} />
                    </Box>
                </>
            ) : null}
            { subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1] == "Tickbox" ? (
                <>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="h6" component="h6" sx={{textAlign: "left"}} >Type : {opinion}</Typography>
                    </Box>
                    <Box sx={{mt: 1 , mb: 1}}>
                        <TextField label="Title" multiline maxRows={4} onChange={change_text} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].title} type="text" fullWidth />
                    </Box>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Autocomplete multiple options={[]} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].data} freeSolo onChange={(event, value) => change_data(value)} renderTags={(value: readonly string[], getTagProps) => value.map((option: string, index: number) => (<Chip variant={"outlined"} label={option} key={index} data-tag-index={index} tabIndex={-1} className={getTagProps({ index }).className} onDelete={getTagProps({ index }).onDelete} /> ))} renderInput={(params) => ( <TextField {...params} variant={"outlined"} label="Data List" placeholder="Items" /> )} />
                    </Box>
                </>
            ) : null}
            { subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1] == "Radio Button" ? (
                <>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="h6" component="h6" sx={{textAlign: "left"}} >Type : {opinion}</Typography>
                    </Box>
                    <Box sx={{mt: 1 , mb: 1}}>
                        <TextField label="Title" multiline maxRows={4} onChange={change_text} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].title} type="text" fullWidth />
                    </Box>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Autocomplete multiple options={[]} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].data} freeSolo onChange={(event, value) => change_data(value)} renderTags={(value: readonly string[], getTagProps) => value.map((option: string, index: number) => (<Chip variant={"outlined"} label={option} key={index} data-tag-index={index} tabIndex={-1} className={getTagProps({ index }).className} onDelete={getTagProps({ index }).onDelete} /> ))} renderInput={(params) => ( <TextField {...params} variant={"outlined"} label="Data List" placeholder="Items" /> )} />
                    </Box>
                </>
            ) : null}
            { subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1] == "TextArea" ? (
                <>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="h6" component="h6" sx={{textAlign: "left"}} >Type : {opinion}</Typography>
                    </Box>
                    <Box sx={{mt: 1 , mb: 1}}>
                        <TextField label="Title" multiline maxRows={4} onChange={change_text} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].title} type="text" fullWidth />
                    </Box>
                </>
            ) : null}
            { subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1] == "MultiSelect" ? (
                <>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="h6" component="h6" sx={{textAlign: "left"}} >Type : {opinion}</Typography>
                    </Box>
                    <Box sx={{mt: 1 , mb: 1}}>
                        <TextField label="Title" multiline maxRows={4} onChange={change_text} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].title} type="text" fullWidth />
                    </Box>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Autocomplete multiple options={[]} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].data} freeSolo onChange={(event, value) => change_data(value)} renderTags={(value: readonly string[], getTagProps) => value.map((option: string, index: number) => (<Chip variant={"outlined"} label={option} key={index} data-tag-index={index} tabIndex={-1} className={getTagProps({ index }).className} onDelete={getTagProps({ index }).onDelete} /> ))} renderInput={(params) => ( <TextField {...params} variant={"outlined"} label="Data List" placeholder="Items" /> )} />
                    </Box>
                </>
            ) : null}
            { subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1] == "ListInputfield" ? (
                <>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="h6" component="h6" sx={{textAlign: "left"}} >Type : {opinion}</Typography>
                    </Box>
                    <Box sx={{mt: 1 , mb: 1}}>
                        <TextField label="Title" multiline maxRows={4} onChange={change_text} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].title} type="text" fullWidth />
                    </Box>
                    <Box sx={{mt: 1, mb: 1}}>
                        <AddListInputfield changeData={change_data} data={appState.EditQus.questions[showItem].subQuestions[showSubItem].data} />
                    </Box>
                </>
            ) : null }
            { subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1] == "Text" ? (
                <>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="h6" component="h6" sx={{textAlign: "left"}} >Type : {opinion}</Typography>
                    </Box>
                    <Box sx={{mt: 1 , mb: 1}}>
                        <TextField label="Title" multiline maxRows={4} onChange={change_text} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].title} type="text" fullWidth />
                    </Box>
                </>
            ) : null}
            { subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1] == "Datefield" ? (
                <>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="h6" component="h6" sx={{textAlign: "left"}} >Type : {opinion}</Typography>
                    </Box>
                    <Box sx={{mt: 1 , mb: 1}}>
                        <TextField type={"date"} label="Date" multiline maxRows={4} onChange={change_text} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].title} fullWidth />
                    </Box>
                </>
            ) : null}
            { subItemList[appState.EditQus.questions[showItem].subQuestions[showSubItem].type - 1] == "UnitText" ? (
                <>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="h6" component="h6" sx={{textAlign: "left"}} >Type : {opinion}</Typography>
                    </Box>
                    <Box sx={{mt: 1 , mb: 1}}>
                        <TextField label="Title" multiline maxRows={4} onChange={change_text} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].title} type="text" fullWidth />
                    </Box>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Autocomplete multiple options={[]} value={appState.EditQus.questions[showItem].subQuestions[showSubItem].data} freeSolo onChange={(event, value) => change_data(value)} renderTags={(value: readonly string[], getTagProps) => value.map((option: string, index: number) => (<Chip variant={"outlined"} label={option} key={index} data-tag-index={index} tabIndex={-1} className={getTagProps({ index }).className} onDelete={getTagProps({ index }).onDelete} /> ))} renderInput={(params) => ( <TextField {...params} variant={"outlined"} label="Data List" placeholder="Items" /> )} />
                    </Box>
                </>
            ) : null}
            <Divider sx={{mt: 1, mb: 1}} />
        </Box>
    )
}