import React, { useContext } from "react"
import { AppContext } from "../../provider/index.provider"
import MainHeader from "../elements/MainHeader"
import BeginPage from "../subPages/Question/begin.question"
import GeneralQuestion from "../subPages/Question/general.question"


export default function Question(){
    
    const {appState, setAppState} = useContext(AppContext)
    
                 
    const change_page = (value : string) => {
        const temp = appState.useData.questionNiares;
        const ftemp = appState.useData.questionNiares;
        switch(value){
            case "Question": 
                setAppState({...appState, pageState : {...appState.pageState, curLayout : "MainLayout", curPage : "Question" } })
                break;
            case "next":
                temp[appState.pageState.curQuestionniare].questions[appState.pageState.curQuestion].completed = true;
                setAppState({...appState, useData: {...appState.useData, questionNiares : temp}, pageState : {...appState.pageState, curQuestion: appState.pageState.curQuestion + 1 } })
                break;
            case "prev":
                setAppState({...appState, pageState : {...appState.pageState, curQuestion: appState.pageState.curQuestion - 1 } })
                break;
            case "finish":
                ftemp[appState.pageState.curQuestionniare].questions[appState.pageState.curQuestion].completed = true;
                ftemp[appState.pageState.curQuestionniare].completed = true;
                setAppState({...appState, pageState : {...appState.pageState, curLayout : "MainLayout", curPage : "Question" }, useData: {...appState.useData, questionNiares : ftemp} })
                break;
            case "begin":
                setAppState({...appState, pageState : {...appState.pageState, curPage : "begin" } })
                break;
            default : 
                setAppState({...appState, pageState : {...appState.pageState, curPage : "generalQuestion" } })
        }
    }

    return (
        <>
            <MainHeader />
            {appState.pageState.curPage == "begin" ? <BeginPage pageHandle= {change_page}/> : null}
            {appState.pageState.curPage == "generalQuestion" ? <GeneralQuestion pageHandle={change_page} /> : null}
        </>
    )
}