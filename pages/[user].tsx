import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CustomUser from '../src/components/CustomUser'
import { checkDataType } from '../src/other/functions.globals'
import { AppProvider } from '../src/provider/index.provider'


export default function Index({user}: {user: string}){
    const [qusnaire, setQusnaire] = useState("")
    const route = useRouter();

    useEffect(() => {
        if( user && user != "")
            checkDataType(user).then((res: any) => {
                setQusnaire(res.qusnaire);
            }).catch(() => route.push('/'))
    }, [user])
    return (
        <AppProvider>
            { qusnaire != "" ? <CustomUser qusnaire={qusnaire} /> : null }
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
    const params = context.params.user;
    return {
        props: {user : params}
    }
}