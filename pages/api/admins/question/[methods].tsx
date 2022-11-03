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
    fnGetFilterResult,
    fnSaveEditQuestionNiare,
    fnGetSelectedReportInfo
} from "../../../../models/questionNiare";
import multer from 'multer';

const nodemailer = require('nodemailer');
const {Base64} = require('js-base64');


export default async function handler(req : any, res: any) {
    const url = req.url.split("/");
    const methods = url[url.length - 1];
    const pwd = process.env.SMTP_KEY + "";
    let temp;
    const transporter = nodemailer.createTransport({
        port: process.env.SMTP_PORT,
        host: process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_USER,
            pass: pwd.split('.')[0],
        },
        secure: true,
    });

    switch(methods){
        case "saveEditData":
            console.log(req.body.content)
            await fnSaveEditQuestionNiare(req.body)
            res.end(JSON.stringify("success"))
            return res;
            break;
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
            temp = await fnAddNewPreOpQuestionNiares(req.body);
            transporter.sendMail({
                from: process.env.SMTP_SENDER,
                to: req.body.email,
                bcc: req.body.ccemail,
                subject: `Welcome`,
                text: "",
                html: `<div> Please click the link below to complete and return the questionnaire to us <br> 
                <a href="${temp}">${temp}</a></div>`
            }, async function (err: any) {
                if(err){
                    return res.end(JSON.stringify("errors"))                
                }
                else{
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
        case "getSelectedReportInfo":
            temp = await fnGetSelectedReportInfo(req.body)
            res.send(JSON.stringify(temp))
            return res;
        case "sendNotification":
            temp = await fnGetSelectedReportInfo(req.body)
            
            transporter.sendMail({
                from: process.env.SMTP_SENDER,
                to: temp.email,
                bcc: temp.ccemail,
                subject: `REMINDER`,
                text: "",
                html: `<div><p>
                    Please complete the pre-op and consent questionnaire, which is due on ${temp.returnBy}.
                    </p><p>
                    Failure to complete the questionnaire may delay your treatment.
                    </p><p>
                    ${process.env.DOMAIN + Base64.encode(JSON.stringify({qusnaire: temp.ref}))}
                    </p><p>
                    Kind regards
                    </p><p>
                    Hospital Administration Team</p></div>`
            }, async function (err: any) {
                if(err){
                    return res.end(JSON.stringify("errors"))                
                }
                else{
                    return res.end(JSON.stringify("success"))
                }
            })

            return res;
            
        case 'upload_files':
            console.log("=====================")
            console.log(req.data)
            res.send(JSON.stringify("success"));
            return res;

        default :
            return res;
    }
}
