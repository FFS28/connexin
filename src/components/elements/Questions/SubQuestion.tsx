import React from "react";
import { Grid,Typography } from "@mui/material";

import CheckboxOpinion from "./CheckBoxOpinion";
import RadiobtnOpinion from "./RadiobtnOpinion";
import SelectOpinion from "./SelectOpinion";
import TextAreaOpinion from "./TextAreaOpinion";
import TextfieldSingle from "./TextfieldSingle";
import YesNo from "./YesNo";
import MultiSelectOpinion from "./MultiSelectOpinion";
import ListInputfield from "./ListInputfield";
import DateSelect from "./DateSelect";
import UnitText from "./UnitText";

//      1 : "Yes/No" => Data : ["Yes", "No"], value : true | false | null
//      2 : "textfield & single row" => Data : "String", value: "asdasdasd"
//      3 : select field option => Daya : ["asd", "asd", "weq"], value: "asd"
//      4 : checkbox field option => data : ["asd", "qwe", "sdfsdf"], value : [true, false, true]
//      5 : radio field option => data : ["asd", "qwe", "sdfsdf"], value: "asd"
//      6 : textArea muiti => data: "String", value: "sdfsdfsdf"
//      7 : Multi Select opinion => data ["asdas","asdas"], value : ["asda","asdasd"]
//      8 : List Inputfiled opinion => data [{title: "sdasd", value: 12, unit: "kg"}], value : [12,1,42,23]
export default function SubQuestion({Data, change_data}: {Data: any, change_data: any}){

    const data = Data;
    const change_sub_pro = (value: any, index: number) => { 
        const temp = data
        temp[index].result = value
        change_data(temp)
    }
    return (
        <>
            <Grid container spacing={2} sx={{mt: 2}} >
                {
                    data.map((item : any, index: number) => {
                        switch(item.type){
                            case 1:      
                                return (
                                    <Grid item key={index} xs={12} sx={{textAlign: "center"}}>
                                        <Typography variant="h6" component="div" >{item.title}</Typography>
                                        <YesNo proNum={index} pageHandle={change_sub_pro} value={item.result} btnSize={false} />
                                    </Grid>
                                )
                            case 2:
                                return (
                                    <Grid item key={index} xs={12} sx={{textAlign: "center"}}>
                                        <Typography variant="subtitle1" component="div" >{item.title}</Typography>
                                        <TextfieldSingle proNum={index} problem_state={change_sub_pro} value={item.result} />
                                    </Grid>
                                )
                            case 3:
                                return (
                                    <Grid item key={index} xs={12} sx={{textAlign: "center"}}>
                                        <Typography variant="subtitle1" component="div" >{item.title}</Typography>
                                        <SelectOpinion proNum={index} problem_state={change_sub_pro} data={item.data} value={item.result} />
                                    </Grid>
                                )
                            case 4:
                                return (
                                    <Grid item key={index} xs={12} sx={{textAlign: "center"}}>
                                        <Typography variant="subtitle1" component="div" >{item.title}</Typography>
                                        <CheckboxOpinion proNum={index} problem_state={change_sub_pro} data={item.data} value={item.result} />
                                    </Grid>
                                )
                            case 5:
                                return (
                                    <Grid item key={index} xs={12} sx={{textAlign: "center"}}>
                                        <Typography variant="subtitle1" component="div" >{item.title}</Typography>
                                        <RadiobtnOpinion proNum={index} problem_state={change_sub_pro} data={item.data} value={item.result} />
                                    </Grid>
                                )
                            case 6:
                                return (
                                    <Grid item key={index} xs={12} sx={{textAlign: "center"}}>
                                        <Typography variant="subtitle1" component="div" >{item.title}</Typography>
                                        <TextAreaOpinion proNum={index} problem_state={change_sub_pro} value={item.result} />
                                    </Grid>
                                )
                            case 7:
                                return (
                                    <Grid item key={index} xs={12} sx={{textAlign: "center"}}>
                                        <Typography variant="subtitle1" component="div" >{item.title}</Typography>
                                        <MultiSelectOpinion proNum={index} problem_state={change_sub_pro} data={item.data} value={item.result} />
                                    </Grid>
                                )
                            case 8:
                                return (
                                    <Grid item key={index} xs={12} sx={{textAlign: "center"}}>
                                        <Typography variant="subtitle1" component="div" >{item.title}</Typography>
                                        <ListInputfield proNum={index} problem_state={change_sub_pro} data={item.data} value={item.result} />
                                    </Grid>
                                )        
                            case 9:
                                return (
                                    <Grid key={index} item xs={12} sx={{textAlign: "center"}}>
                                        <Typography variant="subtitle1" component="div" >{item.title}</Typography>
                                    </Grid>
                                )
                            case 10:
                                return (
                                    <Grid key={index} item xs={12} sx={{textAlign: "center"}}>
                                        <Typography variant="subtitle1" component="div" >{item.title}</Typography>
                                        <DateSelect proNum={index} problem_state={change_sub_pro} value={item.result} />
                                    </Grid>
                                )
                            case 11:
                                return (
                                    <Grid key={index} item xs={12} sx={{textAlign: "center"}}>
                                        <Typography variant="subtitle1" component="div" >{item.title}</Typography>
                                        <UnitText proNum={index} problem_state={change_sub_pro} data={item.data} value={item.result} />
                                    </Grid>
                                )
                        }
                    })
                }
            </Grid>
        </>
    )
}