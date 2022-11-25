import type { NextApiRequest, NextApiResponse } from 'next'
import { fnGetLevels, fnUpdateRole, fnGetSelectedRole, fnAddRole, fnSignIn, fnGetFilterResult, fnGetAllServices, fnGetAllRoles, fnGetAllUsers, fnSaveUserRegister, fnReSetPassword, fnGetSelectedUser, fnUpdateUser } from '../../../fauna';
import { ERROR_EMAIL_SENDING_FAILD, ERROR_URL_NOT_MATCH, INFO_EMAIL_SENDING_SUCCESS } from '../../../utils/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const nodemailer = require('nodemailer');
    const md5 = require('md5');
    const { Base64 } = require('js-base64');
    let result = null;
    const transporter = nodemailer.createTransport({
        port: process.env.SMTP_PORT,
        host: process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_KEY
        },
        secure: true,
    });

    const endpoint = req.url?.split('/').pop();
    const reqData = req.body;

    switch(endpoint) {
        case "signin":
            result = await fnSignIn(reqData.email);
            res.send(result);
            break;
        case "getAllUsers":
            result = await fnGetAllUsers();
            res.send(result);
            break;
        case "getSelectedUser":
            result = await fnGetSelectedUser(reqData);
            res.send(result);
            return res;
        case "saveUserRegister":
            result = await fnSaveUserRegister(reqData);
            res.send(result);
            break;
        case "updateUser":
            result = await fnUpdateUser(reqData);
            res.send(result);
            break;
        case "sendSetPasswordLink":
            result = await fnReSetPassword(reqData.ref)
            if(result.statusCode == 500){
                res.send(result);
            }else {
                transporter.sendMail({
                    from: process.env.SMTP_SENDER,
                    to: reqData.email,
                    subject: `From Admin`,
                    text: "This is set Password Link",
                    html: `<div> Welcome <br> Please click the sign in and set your password <br><a href=${result}>${result}</a><br></div>`
                }, function (err: any, info: any) {
                    if(err){
                        res.send({statusCode: 200, data: INFO_EMAIL_SENDING_SUCCESS})
                    }else{
                        res.send({statusCode: 500, data: {error: ERROR_EMAIL_SENDING_FAILD}})
                    }
                })
            }
            break;
        case "filter":
            result = await fnGetFilterResult(reqData);
            res.send(result);
            break;
        case "getAllServices":
            result = await fnGetAllServices();
            res.send(result);
            break;
        case "addRole":
            result = await fnAddRole(reqData);
            res.send(result);
            break;
        case "updateRole" : 
            result = await fnUpdateRole(reqData);
            res.send(result)
            return res;
        case "getSelectedRole":
            result = await fnGetSelectedRole(reqData.ref)
            res.send(result)
            break;
        case "getAllRoles":
            result = await fnGetAllRoles();
            res.send(result);
            break;
        case "getLevels":
            result = await fnGetLevels();
            res.send(result)
            break;
        default:
            res.send({ statusCode: 404, data: {error: ERROR_URL_NOT_MATCH}});
    }
}