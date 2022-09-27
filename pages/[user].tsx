import React, { useEffect, useState } from 'react'
import CustomUser from '../src/components/CustomUser'
import User from '../src/components/User'
import { checkDataType } from '../src/other/functions.globals'
import { AppProvider } from '../src/provider/index.provider'


export default function Index({user}: {user: string}){
    const [qusnaire, setQusnaire] = useState("")

    useEffect(() => {
        checkDataType(user).then((res: any) => {
            setQusnaire(res.qusnaire);
        })
    }, [user])
    return (
        <AppProvider>
            <CustomUser qusnaire={qusnaire} />
        </AppProvider>
    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

export async function getStaticProps(context: any) {
    const params = context.params.user
    return {
        props: {user : params}
    }
}