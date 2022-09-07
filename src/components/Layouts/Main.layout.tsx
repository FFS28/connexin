import React, { useContext } from "react"
import { AppContext } from "../../provider/index.provider"
import MainFooter from "../elements/MainFooter"
import MainHeader from "../elements/MainHeader"
import Advice from "../subPages/Main/Advice.main"
import MainHome from "../subPages/Main/Home.main"
import QuestionPanel from "../subPages/Main/Question.main"



export default function Main(){

    const {appState, setAppState} = useContext(AppContext)

    const change_page = (pageName : string) => {
        if(pageName == "ReturnQus"){
            setAppState({...appState, pageState : {...appState.pageState, curPage : "generalQuestion", curLayout: "QuestionLayout"}})
        }    
        else
            setAppState({...appState, pageState : {...appState.pageState, curPage : pageName}})
    }

    return(
        <>
            <MainHeader />
                {appState.pageState.curPage == "Home" ? <MainHome pageHandle={change_page} /> : null}
                {appState.pageState.curPage == "Question" ? <QuestionPanel /> : null}
                {appState.pageState.curPage == "Advice" ? <Advice /> : null}
            <MainFooter pageHandle={change_page} />
        </>
    )
}