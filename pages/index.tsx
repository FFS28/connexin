import React from 'react'
import User from '../src/components/User'
import { AppProvider } from '../src/provider/index.provider'

export default function Index(){
    return (
        <AppProvider>
            <User />
        </AppProvider>
    )
}