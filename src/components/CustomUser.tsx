import React, { useContext, useEffect } from 'react'
import { AppContext } from '../provider/index.provider'
import User from './User'

export default function CustomUser({ qusnaire }: { qusnaire: string }){
    
    const { appState, setAppState } = useContext(AppContext)
    useEffect(() => {
        setAppState({...appState, users: {...appState.users, user:{...appState.users.user, ref: qusnaire}}})
    }, [])

    return (
        <div>
            {qusnaire != "" ? <User /> : null}
        </div>
    )
}