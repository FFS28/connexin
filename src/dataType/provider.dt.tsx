export interface ProviderStore {
    pageStyle: {
        backgroundStyle1: BGStyle,
        backgroundStyle2: BGStyle,
        mainColors: Colors
    },
    pageState: {
        curLayout: "WelcomeLayout" | "MainLayout" | "QuestionLayout" | "ContestLayout",
        curPage: string,
        curQuestionniare: number,
        curQuestion: number,
        curSubQuestion : number,
        loadingData: boolean
    },
    useData: {
        questionNiares: QuestionNiare[],
        contestList: ContestData[],
        procedure : any
    },
    model : {
        userlevel : number
    },
    users: {
        admin: {
            name: string,
            email: string,
            level: number,
            hospital: string,
            service: number,
            ref : string
        },
        user: {
            name: string,
            email: string,
            level : 0,
            hospital: string,
            ref : string,
            signature: string
        }
    },
    alert : {
        open: boolean,
        message: string,
        type: "success" | "error" | "warning" | "info"
    },
    EditQus: any,
    CtrlQN : {
        madeState : boolean,
        uploadState : boolean
    },
    SysInfo : {
        adminRoles :  any
    },
    changeState: boolean,
    editState: boolean
}

export interface BGStyle {
    padding: string,
    minHeight: string,
    background: string,
    textAlign: string,
    flex: number,
    display: string,
    flexDirection: string,
}

export interface Colors {
    _MFBColor: string,
    _MSBColor: string,
    _MFFColor: string,
    _MSFColor: string,
    _MTFColor: string
}

export interface QuestionNiare {
    ref : string,
    title: string,
    info: string,
    link: string,
    imgUrl: string,
    completed: boolean,
    questions: Question[]
}

export interface Question{
    title: string,
    type: boolean,
    result: any,
    completed: boolean,
    subQuestions: SubQuestion[]
}

export interface SubQuestion {
    title: string,
    type: number,
    data: any,
    result: any
}

export interface ContestData {
    title: string,
    data: string,
    active: boolean
}

export interface UserData {
    name: string,
    email: string,
    level: number,
    hospital: string,
    ref : string,
    active: boolean
}
