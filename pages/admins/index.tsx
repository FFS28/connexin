import React from "react"
import Admin from "../../src/components/Admin"
import { AppProvider } from "../../src/provider/index.provider"

export default function Manager(){
    return (
        <>
            <AppProvider>
                <Admin />
            </AppProvider>  
        </>
    )
}
