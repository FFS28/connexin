import { 
    fnSignIn, 
    fnCreateNewUser, 
    fnGetLevelUsers, 
    fnUpdateUser, 
    fnDeleteUser, 
    fnSaveUserRegister, 
    fnSaveUser, 
    fnAddRole,
    fnGetAllRoles,
    fnGetAllUserLevel,
    fnSaveAllAccess,
    fnAddNewService,
    fnAddNewConsultant,
    fnGetAllServices,
    fnAddNewProcedure,
    fnGetAllAdmissionTypeList,
    fnGetAllConsultantList,
    fnGetSelectedRole,
    fnUpdateService,
    fnGetSelectedService,
    fnGetAllConsultant,
    fnGetSelectedConsultant,
    fnGetServiceConsultant,
    fnUpdateConsultant,
    fnGetAllProcedures,
    fnGetSelectedProcedure,
    fnGetServiceProcedure,
    fnGetAllTextRemainder,
    fnAddTextRemainder,
    fnGetSelectedTextRemainder,
    fnGetSelectedUser,
    fnUpdateRole,
    fnUdpateProcedure,
    fnUpdateTextRemainder,
    fnReSetPassword,
    fnSaveUserPass
} from "../../../../models/auth";

const md5 = require('md5');
const nodemailer = require('nodemailer');

export default async function handler(req : any, res: any) {
    const url = req.url.split("/")
    const methods = url[url.length - 1]    
    let data;
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
        case "signin":
            data = await fnSignIn(req.body)
            res.end(JSON.stringify({ notification : checkUser(data, req.body), user: data}))
            return res;
        case "createNewUser":
            req.body.password = md5(req.body.password)
            data = await fnCreateNewUser(req.body)
            res.end(JSON.stringify({ notification : {type: "success", message: "Successful!"}, user: data}))
            return res;
        case "getLevelUsers": 
            data = await fnGetLevelUsers(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "getSelectedUser": 
            data = await fnGetSelectedUser(req.body)
            res.end(JSON.stringify(data))
            return res;
            
        case "updateUser":
            await fnUpdateUser(req.body)
            res.end(JSON.stringify("Successful Updated!"))
            return res;
        case "deleteUser":
            await fnDeleteUser(req.body)
            res.end(JSON.stringify({ notification : {type: "success", message: "Successful!"}}))
            return res;
        case "saveUserRegister":
            data = await fnSaveUserRegister(req.body)
            transporter.sendMail({
                from: 'preop@voittaa.co.uk',
                to: req.body.email,
                subject: `Welcome to Connexin`,
                text: "",
                html: `<div> Please click the link below to complete and return the questionnaire to us <br> <a href=${data}>Sign In</a></div>`
            }, function (err: any, info: any) {
                if(err){
                    return res.end(JSON.stringify("errors"))
                }else{
                    return res.end(JSON.stringify("success"))
                }
            })
            break;
        case "setPassword": 
            data = await fnReSetPassword(req.body)
                
            transporter.sendMail({
                from: 'preop@voittaa.co.uk',
                to: req.body.email,
                subject: `From Connexin`,
                text: "This is Reset Password Link",
                html: `<a href=${data}>Reset Password</a>`
            }, function (err: any, info: any) {
                if(err){
                    return res.end("errors")
                }else{
                    return res.end("success")
                }
            })
            break;
        case "saveUser":
            req.body.password = md5(req.body.password)
            await fnSaveUser(req.body)
            res.end(JSON.stringify("success"))
            return res;
        case "saveUserPassData":
            req.body.password = md5(req.body.password)
            await fnSaveUserPass(req.body)
            res.end(JSON.stringify("success"))
            return res;
        case "addRole":
            await fnAddRole(req.body)
            res.end(JSON.stringify("success"))
            return res;
        case "getSelectedRole":
            data = await fnGetSelectedRole(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "getAllRoles":
            data = await fnGetAllRoles();
            res.end(JSON.stringify(data))
            return res;
        
        case "updateRole" : 
            data = await fnUpdateRole(req.body);
            res.end(JSON.stringify(data))
            return res;

        case "getAllUserLevel":
            data = await fnGetAllUserLevel();
            res.end(JSON.stringify(data))
            return res;
        case "saveAllAccess": 
            await fnSaveAllAccess(req.body)
            res.end(JSON.stringify("success"))
            return res;
        case "addNewService":
            data = await fnAddNewService(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "updateService":
            data = await fnUpdateService(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "getSelectedService":
            data = await fnGetSelectedService(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "addNewConsultant":
            data = await fnAddNewConsultant(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "getAllConsultant":
            data = await fnGetAllConsultant()
            res.end(JSON.stringify(data))
            return res;
        case "getSelectedConsultant":
            data = await fnGetSelectedConsultant(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "getServiceConsultant":
            data = await fnGetServiceConsultant(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "updateConsultant" : 
            data = await fnUpdateConsultant(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "getAllServices": 
            data= await fnGetAllServices()
            res.end(JSON.stringify(data))
            return res;
        case "addNewProcedure":
            data= await fnAddNewProcedure(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "getServiceProcedure": 
            data = await fnGetServiceProcedure(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "getAllProcedures":
            data= await fnGetAllProcedures()
            res.end(JSON.stringify(data))
            return res;
        case "udpateProcedure":
            data= await fnUdpateProcedure(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "getSelectedProcedure":
            data = await fnGetSelectedProcedure(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "sendTextRemainder":
            data= await fnAddTextRemainder(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "getAllTextRemainder":
            data = await fnGetAllTextRemainder()
            res.end(JSON.stringify(data))
            return res;
        case "getSelectedTextRemainder":
            data = await fnGetSelectedTextRemainder(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "updateTextRemainder":
            data = await fnUpdateTextRemainder(req.body)
            res.end(JSON.stringify(data))
            return res;
        case "getAllAdmissionTypeList":
            data = await fnGetAllAdmissionTypeList()
            res.end(JSON.stringify(data))
            return res;
        case "getAllConsultantList":
            data = await fnGetAllConsultantList()
            res.end(JSON.stringify(data))
            return res;
    }
}



const checkUser = (userdata: any, logindata: any) => {
    if(userdata == false)
        return {type: "error", message: "Incorrect Email!"}
    if(userdata.active)
        if(userdata.password == md5(logindata.pwd)){
            return {type: "success", message: `Welcome ${userdata.name}`}}
        else
            return {type: "error", message: "Incorrect Password!"}
    else
        return {type: "error", message: "Please Active Your Account!"}
}