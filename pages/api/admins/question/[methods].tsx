import { 
    fnSaveQuestionNiare, 
    fnUpdateQuestionNiare,
    fnGetAllQuestionNiareList,
    fnAddNewPreOpQuestionNiares,
    fnGetAllPreOpQuestionNiares,
    fnGetQuestionNiareByUser,
    fnSelectedPreOpQuestionNiares,
    fnGetAllQuestionSections,
    fnGetSelectedQuestionSection,
    fnUpdatePreOpQuestionNiares,
    fnGetReport
} from "../../../../models/questionNiare";

export default async function handler(req : any, res: any) {
    const url = req.url.split("/")
    const methods = url[url.length - 1]    
    let temp
    switch(methods){
        case "saveData":
            if(req.body.ref == "")
                temp = await fnSaveQuestionNiare(req.body)
            else
                temp = await fnUpdateQuestionNiare(req.body)
            res.end(JSON.stringify(temp))    
            return res;
        case "getAllQuestionNiareList":
            temp = await fnGetAllQuestionNiareList()
            res.end(JSON.stringify(temp))
            return res;
        case "addNewPreOpQuestionNiares":
            await fnAddNewPreOpQuestionNiares(req.body)
            res.end(JSON.stringify("success"))
            return res;
        case "getAllPreOpQuestionNiares":
            temp = await fnGetAllPreOpQuestionNiares()
            res.end(JSON.stringify(temp))
            return res;
        case "updatePreOpQuestionNiares":
            temp = await fnUpdatePreOpQuestionNiares(req.body)
            res.end(JSON.stringify(temp))
            return res;
            
        case "getSelectedPreOpQuestionNiares":
            temp = await fnSelectedPreOpQuestionNiares(req.body)
            res.end(JSON.stringify(temp))
            return res;
        case "getQuestionNiare": //users 
            temp = await fnGetQuestionNiareByUser(req.body)
            res.end(JSON.stringify(temp))
            return res;
        case "getAllQuestionSections":
            temp = await fnGetAllQuestionSections()
            res.end(JSON.stringify(temp))
            return res;
        case "getSelectedQuestionSection":
            temp = await fnGetSelectedQuestionSection(req.body)
            res.end(JSON.stringify(temp))
            return res;
        case "findReport" :
            temp = await fnGetReport(req.body)
            res.end(JSON.stringify(temp))
            return res;
        default :
            return res;
    }
}
