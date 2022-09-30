import React, { useContext, useEffect } from "react"
import { Box } from "@mui/material"
import { AppContext } from "../../provider/index.provider"
import Splash from "../subPages/Welcome/Splach.welcome"
import SignIn from "../subPages/Welcome/SignIn.welcome"
import Verify from "../subPages/Welcome/Verify.welcome"
import Detail from "../subPages/Welcome/Detail.welcome"
import Intro1 from "../subPages/Welcome/Intro1.welcome"
import Intro2 from "../subPages/Welcome/Intro2.welcome"
import { getQuestionNiare } from "../../other/apis.globals"
import { makeJSON } from "../../other/functions.globals"


export default function Welcome(){
    
    const {appState, setAppState} = useContext(AppContext)
    const changePage = (pageName : string) => {
        if(pageName == "MainLayout"){
            setAppState({...appState, pageState : {...appState.pageState, curLayout : pageName, curPage : "Question"}})
        }    
        else
            setAppState({...appState, pageState : {...appState.pageState, curPage : pageName}})
    }
    useEffect(()=>{
        getQuestionNiare(makeJSON({
            qusRef: appState.users.user.ref
        })).then((res: any)=>{
            res.json().then((data: any)=>{
                setAppState({...appState, pageState: {...appState.pageState, curPage : "Detail"}, alert: {...appState.alert, open: false}, useData: {...appState.useData, questionNiares: data.qusData}, users: { ...appState.users, user: {...appState.users.user, addmissionDate: data.addmissionDate, returnByDate: data.returnByDate, procedure: data.procedure}}})
            })
        }).catch((res: any)=> {
            console.log(res)
        })
    }, [])

    return (
        <>
            <Box>
                {appState.pageState.curPage == "Splash" ? <Splash /> : null}
                {appState.pageState.curPage == "SignIn" ? <SignIn pageHandle={changePage} /> : null}
                {appState.pageState.curPage == "Verify" ? <Verify pageHandle={changePage} /> : null}
                {appState.pageState.curPage == "Detail" ? <Detail pageHandle={changePage} /> : null}
                {appState.pageState.curPage == "Intro1" ? <Intro1 pageHandle={changePage} /> : null}
                {appState.pageState.curPage == "Intro2" ? <Intro2 pageHandle={changePage} /> : null}
            </Box>
        </>
    )
}