import type { NextPage } from "next";

import CustomAlert from "../../elements/common/CustomAlert";
import ConnexinHome from "../home";
import AdminContent from "./adminContent";
import SignIn from "./signin";
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from "../../../utils/providers/context";

const Admin: NextPage = () => {
    const { appState, setAppState } = useContext(AppContext)
    useEffect(() => {
        setAppState({...appState, user: {...appState.user, type: 'admin'}})
        setTimeout(() => {
            setAppState({...appState, page: {...appState.page, curPage : "signin"}})
        }, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <CustomAlert />
            {appState.page.curLayout == "welcomeLayout" && appState.page.curPage == "splash" ? <ConnexinHome /> : null}
            {appState.page.curLayout == "welcomeLayout" && appState.page.curPage == "signin" ? <SignIn /> : null}
            {appState.page.curLayout == "adminLayout" ? <AdminContent /> : null }
        </>
    )
}

export default Admin
