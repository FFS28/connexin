import React, { useContext } from "react"
import { AppContext } from "../../provider/index.provider"
import MainFooter from "../elements/MainFooter"
import MainHeader from "../elements/MainHeader"
import ContestList from "../subPages/Contest/ContestList.contest"
import ContestMain from "../subPages/Contest/ContestMain.contest"


export default function Contest(){

    const {appState, setAppState} = useContext(AppContext)

    const change_page = (pageName : string) => {
        setAppState({...appState, pageState : {...appState.pageState, curPage : pageName}})
    }
    
    return (
        <>
            <MainHeader />
                {appState.pageState.curPage == "ContestMain" ? <ContestMain pageHandle={change_page} /> : null}
                {appState.pageState.curPage == "ContestList" ? <ContestList /> : null}            
                {appState.pageState.curPage == "Contest" ? <></> : null}
                {appState.pageState.curPage == "Contest" ? <></> : null}
            <MainFooter pageHandle={change_page} />
        </>
    )
}