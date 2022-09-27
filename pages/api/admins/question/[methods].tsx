import { 
    fnSaveQuestionNiare, 
    fnUpdateQuestionNiare,
    fnGetAllQuestionNiareList,
    fnAddNewPreOpQuestionNiares,
    fnGetAllPreOpQuestionNiares,
    fnGetQuestionNiareByUser,
    fnSelectedPreOpQuestionNiares,
    fnGetAllQuestionSections,
    fnGetServiceQuestionnaire,
    fnGetSelectedQuestionSection,
    fnUpdatePreOpQuestionNiares,
    fnGetReport,
    fnGetFilterResult
} from "../../../../models/questionNiare";

const nodemailer = require('nodemailer');

export default async function handler(req : any, res: any) {
    const url = req.url.split("/");
    const methods = url[url.length - 1];
    let temp;
    const transporter = nodemailer.createTransport({
        port: process.env.SMTP_PORT,
        host: process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_KEY,
        },
        secure: true,
    });

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
            transporter.sendMail({
                from: 'preop@voittaa.co.uk',
                to: req.body.email,
                subject: `Welcome to Connexin`,
                text: "",
                html: `<div> Welcome to Connexin <br> ENJOY WITH US >>> click <a href="https://asd-amber-six.vercel.app/">Visit</a></div>`
            }, function (err: any, info: any) {
                if(err){
                    return res.end(JSON.stringify("errors"))
                }else{
                    return res.end(JSON.stringify("success"))
                }
            })
            break;
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
        case "getServiceQuestionnaire":
            temp = await fnGetServiceQuestionnaire(req.body)
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
        case "filter":
            temp = await fnGetFilterResult(req.body)
            res.end(JSON.stringify(temp))
            return res;
        default :
            return res;
    }
}
