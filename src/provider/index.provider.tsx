import React, { createContext, useState } from "react";
import { ProviderStore } from "../dataType/provider.dt";

const Contestdata = [
    {active : false, title : "What to expect on the day of surgery?", data : "What to expect on the day of surgery?"},
    {active : false, title : "Complications and risks", data : "Complications and risks"},
    {active : false, title : "Benifits", data : "Benifits"},
    {active : false, title : "Potential side effects", data : "Potential side effects"}
]

const SubQuestion = [
    {
        title: "This is SubQuestion1",
        type: 1,
        data: ["Yes", "No"],
        result: ""
    },
    {
        title: "This is SubQuestion1",
        type: 2,
        data: ["Yes", "No"],
        result: ""
    }
]

const Questions = [
    {
        title: "This is Question1",
        type: true,
        result: false,
        completed: false,
        subQuestions: SubQuestion
    },
    {
        title: "This is Question2",
        type: true,
        result: false,
        completed: false,
        subQuestions: SubQuestion
    },
    {
        title: "This is Question3",
        type: true,
        result: false,
        completed: false,
        subQuestions: SubQuestion
    },
    {
        title: "This is Question4",
        type: true,
        result: false,
        completed: false,
        subQuestions: SubQuestion
    },
]

const QuestionNiarea = [
    {
        ref : "",
        title: "This is Questionniares1",
        info: "Complete this Questionniare",
        link: "Go To Link",
        imgUrl: "https://picsum.photos/536/354",
        completed: false,
        questions: Questions
    },
    {
        ref : "",
        title: "This is Questionniares2",
        info: "Complete this Questionniare",
        link: "Go To Link",
        imgUrl: "https://picsum.photos/536/354",
        completed: false,
        questions: Questions
    },
    {
        ref : "",
        title: "This is Questionniares3",
        info: "Complete this Questionniare",
        link: "Go To Link",
        imgUrl: "https://picsum.photos/536/354",
        completed: false,
        questions: Questions
    },
    {
        ref : "",
        title: "This is Questionniares4",
        info: "Complete this Questionniare",
        link: "Go To Link",
        imgUrl: "https://picsum.photos/536/354",
        completed: false,
        questions: Questions
    },
    
]

export const AppContext = createContext<any>({})

export const AppProvider = ({ children }: {children: any}) => {
    const [appState, setAppState] = useState<ProviderStore>({
        pageStyle: {
            backgroundStyle1: {
                padding: "0px 0px",
                minHeight: "100vh",
                background: "linear-gradient(#1559da, #3073ea, #5092ff)",
                textAlign: "center",
                flex: 1,
                display: "flex",
                flexDirection: "column"
            },
            backgroundStyle2: {
                padding: "0px 0px",
                minHeight: "100vh",
                background: "#fcfdfd",
                textAlign: "center",
                flex: 1,
                display: "flex",
                flexDirection: "column"
            },
            mainColors: {
                _MFBColor: "#1556da",
                _MSBColor: "#fcfdfd",
                _MFFColor: "#ffffff",
                _MSFColor: "#99a6be",
                _MTFColor: "#000000"
            }
        },
        pageState: {
            curLayout: "WelcomeLayout",
            curPage: "Splash",
            curQuestionniare : 0,
            curQuestion : 0,
            curSubQuestion : 0,
            loadingData : false
        },
        useData: {
            questionNiares: [],
            contestList : Contestdata,
            procedure : null
        },
        model: {
            userlevel: 0
        },
        users: {
            admin: {
                name: "",
                email: "",
                level: 0,
                hospital: "",
                service: 0,
                ref: ""
            },
            user: {
                name: "",
                email: "",
                level : 0,
                hospital: "",
                ref: ""
            }
        },
        alert : {
            open: false,
            message: "",
            type: "success"
        },
        EditQus: {
            ref : "",
            title: "",
            info: "",
            link: "",
            imgUrl: "",
            completed: false,
            questions: []
        },
        CtrlQN : {
            madeState : true,
            uploadState : false
        },
        SysInfo : {
            adminRoles: []
        },
        changeState: true,
        editState : false
    })

    return (
        <AppContext.Provider value={{ appState, setAppState }}>
            {children}
        </AppContext.Provider>
    )
}
