import { IsTimestamp } from "faunadb";
import { ERROR_DB_CONNECTION, ERROR_GET_PERMISSION, ERROR_NOT_FOUND_DATA, ERROR_USER_ALREADY_EXIST, INFO_OPERATION_SUCCESS } from "../utils/constants";
import { RoleData, User } from "../utils/customTypes/apiData";

const faunadb = require("faunadb")
const {Base64} = require('js-base64');

const faunaClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET as string,
    domain: 'db.fauna.com'
})
const { Map, Paginate, Documents, Collection, Lambda, Get, Var, Ref, Select, Match, Index, Create, Update, Delete, Let, Union } = faunadb.query 

export const fnSignIn = async (userInfo: string) => {
    try{
        const {data} = await faunaClient.query(
            Map(
                Paginate(
                    Match(
                        Index("MyAdminByEmail"),
                        [userInfo]
                    )
                ),
                Lambda('x', Get(Var('x')))
            )
        )
        if(data.length == 0){
            return {statusCode: 401, data: {error: ERROR_NOT_FOUND_DATA}};
        }else{
            if(data[0].data.active)
                return {statusCode: 200, data: {
                    ref: data[0].ref.id,
                    name: data[0].data.name,
                    email: data[0].data.email,
                    service: data[0].data.service,
                    role: data[0].data.role,
                    level: data[0].data.level,
                    active: data[0].data.active
                }};
            else 
                return {statusCode: 401, data: {error: ERROR_GET_PERMISSION}};
        }
    }
    catch{
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}};
    }
}

export const fnCreateNewUser = async (userInfo: any) => {
    if(userInfo.level == 0)
    {
        const data = await faunaClient.query(
            Create(
                Collection("Users"),
                {
                    data: userInfo
                }
            )
        )
        data.data.ref = data.ref.id;
        return data.data;
    }else{
        const data = await faunaClient.query(
            Create(
                Collection("Admins"),
                {
                    data: userInfo
                }
            )
        )
        data.data.ref = data.ref.id;
        return data.data;
    }
}

export const fnGetAllUsers = async () => {
    try{
        const {data} = await faunaClient.query(
            Map(
                Paginate(Documents(Collection("Admins"))),
                Lambda('x', Get(Var('x')))
            )
        )
        const temp = data.map((item: any) => {
            item.data.ref = item.ref.id;
            return item.data;
        })
        return {statusCode: 200, data: temp};
    }
    catch {
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}};
    }
}

export const fnGetSelectedUser = async (userInfo: any) => {
    try {
        let temp;
        temp = await faunaClient.query(
            Get(
                Ref(Collection('Admins'), userInfo.ref)
            )
        ).then((res: any) => {
            res.data.ref= res.ref.id
            return res.data
        })
        return {statusCode: 200, data: temp};  
    }
    catch {
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}}
    }
}

export const fnUpdateUser = async (userInfo: User) => {
    try{
        await faunaClient.query(
            Update(
                Ref(Collection("Admins"), userInfo.ref),
                {
                    data: {
                        name: userInfo.name, 
                        level: userInfo.level, 
                        role: userInfo.role, 
                        active : userInfo.active,
                        service: userInfo.service,
                    }
                }
            )
        )
        return {statusCode: 200, data: INFO_OPERATION_SUCCESS}
    }
    catch{
        return {statusCode: 500, data: ERROR_DB_CONNECTION}
    }
}

export const fnDeleteUser = async (userInfo: any) => {
    if(userInfo.level == 0)
    {
        await faunaClient.query(
            Delete( Ref(Collection("Users"), userInfo.ref))
        )
    }else{
        await faunaClient.query(
            Delete( Ref(Collection("Admins"), userInfo.ref))
        )
    }
}

export const fnSaveUserRegister = async (userInfo: {
    name: string, 
    email: string, 
    level: number, 
    role: string, 
    authBy: string, 
    service: string}) => {
    try{
        const is_exist = await faunaClient.query(
            Map(
                Paginate(Match(Index("MyAdminByEmail"), userInfo.email)),
                Lambda("x", Get(Var("x")))
            )
        )
        if(is_exist.data.length > 0)
            return {statusCode: 500, data: {error: ERROR_USER_ALREADY_EXIST}};
        const temp = { ...userInfo, active: false}
        const data = await faunaClient.query(
            Create(
                Collection("Admins"),
                {
                    data: temp
                }
            )
        )
        return { statusCode: 201, data: data.ref.id};
    }
    catch {
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}};
    }
}

export const fnReSetPassword = async (userInfo: string) => {
    try{
        const res = await faunaClient.query(
            Update(
                Ref(Collection("Admins"), userInfo),
                {
                    data: {
                        active : false
                    }
                }
            )
        )
        res.data.ref = res.ref.id;
        const Link = process.env.DOMAIN + "setpassword/" + Base64.encode(JSON.stringify(res.data))
        return { statusCode: 200, data: Link}
    }
    catch {
        return { statusCode: 500, data: {error: ERROR_DB_CONNECTION}};
    }
}

export const fnSaveUser = async (userInfo: any) => {
    const data = await faunaClient.query(
        Create(
            Collection("Admins"),
            {
                data: userInfo
            }
        )
    )
    return ;   
}

export const fnSaveUserPass = async (userInfo: any) => {
    await faunaClient.query(
        Update(
            Ref(Collection("Admins"), userInfo.ref),
            {
                data: {
                    password : userInfo.password,
                    active: true
                }
            }
        )
    )
    return;
}

export const fnAddRole = async (roleInfo: {role: string, author: string}) => {
    try{
        const data = await faunaClient.query(
            Create(
                Collection("Roles"),
                {
                    data: roleInfo
                }
            )
        )
        return {statusCode: 200, data: INFO_OPERATION_SUCCESS}
    }
    catch {
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}}
    }
}

export const fnGetSelectedRole = async (roleInfo: string) => {
    try{
        const res = await faunaClient.query(
            Get( Ref(Collection("Roles"), roleInfo))
        )
        res.data.ref = res.ref.id
        return {statusCode: 200, data: res.data};
    }
    catch {
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}}
    }
}

export const fnUpdateRole = async (roleInfo: RoleData) => {
    try{
        await faunaClient.query(
            Update(
                Ref(Collection("Roles"), roleInfo.ref),
                {
                    data: {
                        role: roleInfo.role, 
                        author: roleInfo.author, 
                    }
                }
            )
        )
        return {statusCode: 200, data: INFO_OPERATION_SUCCESS};
    }catch {
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}}
    }
}

export const fnGetAllRoles = async () => {
    try {
        const {data} = await faunaClient.query(
            Map(
                Paginate(Documents(Collection("Roles"))),
                Lambda("x", Get(Var("x")))
            )
        )
        const temp = data.map((item: any) => {
            item.data.ref = item.ref.id;
            return item.data
        })
        return {statusCode: 200, data: temp};
    }   
    catch{
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}};
    }
}

export const fnGetLevels = async () => {
    try{
        const {data} = await faunaClient.query(
            Map(
                Paginate(Documents(Collection("Access"))),
                Lambda("x", Get(Var("x")))
            )
        )
        const temp = data.map((item: any) => {
            item.data.ref = item.ref.id;
            return item.data
        })
        return {statusCode: 200, data: temp}
    }
    catch {
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}}
    }
}

export const fnUpdateLevels = async (levels: any) => {
    try {
        for(var i = 0; i < levels.length; i ++){
            await faunaClient.query(
                Update(
                    Ref(Collection('Access'), levels[i].ref),
                    {
                        data: {
                            level: levels[i].level
                        }
                    }
                )
            )
        }
        return {statusCode: 200, data: INFO_OPERATION_SUCCESS};
    }
    catch {
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}};
    }
}

export const fnAddNewService = async (serviceData: any) => {
    
    const is_exist = await faunaClient.query(
        Map(
            Paginate(
                Match(Index("GetServiceByServiceSpecial"), serviceData.serviceSpecial)
            ),
            Lambda(
                "person",
                Get(Var("person"))
            )
        )
    )
    if(is_exist.data.length > 0)
        return "error";

    await faunaClient.query(
        Create(
            Collection("Service"),
            {
                data: {
                    serviceSpecial: serviceData.serviceSpecial, 
                    subServiceSpecial: serviceData.subServiceSpecial, 
                    where: serviceData.where, 
                    hospitalSite: serviceData.hospitalSite, 
                    address: serviceData.address, 
                    postCode: serviceData.postCode, 
                    addressForRedirection: serviceData.addressForRedirection, 
                    serviceEmail: serviceData.serviceEmail,
                }
            }
        )
    )
    return "success";
}

export const fnGetSelectedService = async (serviceInfo: any) => {
    const res = await faunaClient.query(
        Get(
            Ref(Collection("Service"), serviceInfo.ref),
        )
    )
    
    res.data.ref = res.ref.id

    return res.data;
}

export const fnUpdateService = async (serviceData: any) => {
    const is_exist = await faunaClient.query(
        Map(
            Paginate(
                Match(Index("GetServiceByServiceSpecial"), serviceData.serviceSpecial)
            ),
            Lambda(
                "person",
                Get(Var("person"))
            )
        )
    )
    if(is_exist.data.length > 0)
        return "error";
    try{
        await faunaClient.query(
            Update( 
                Ref(Collection("Service"), serviceData.ref), 
                {
                    data: {
                        serviceSpecial: serviceData.serviceSpecial, 
                        subServiceSpecial: serviceData.subServiceSpecial, 
                        where: serviceData.where, 
                        hospitalSite: serviceData.hospitalSite, 
                        address: serviceData.address, 
                        postCode: serviceData.postCode, 
                        addressForRedirection: serviceData.addressForRedirection, 
                        serviceEmail: serviceData.serviceEmail,
                    }
                }
            )
        )
    }
    catch(err){
        return "Invalid Operation!" 
    }
    
    return "Successful!";
}

export const fnGetAllServices = async () => {
    try {
        const {data} = await faunaClient.query(
            Map(
                Paginate(Documents(Collection("Service"))),
                Lambda("x", Get(Var("x")))
            )
        )
        const temp = data.map((item: any) => {
            item.data.ref = item.ref.id;
            return item.data
        })
        return {statusCode: 200, data: temp};
    }
    catch{
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}};
    }
}

export const fnAddNewConsultant = async (serviceData: any) => {
    await faunaClient.query(
        Create(
            Collection("Consultant"),
            {
                data: serviceData
            }
        )
    )
    return "success";
}

export const fnGetAllConsultant = async () => {
    const {data} = await faunaClient.query(
        Map(
            Paginate(Documents(Collection("Consultant"))),
            Lambda("x", Get(Var("x")))
        )
    )
    const temp=[];
    for(let i= 0; i< data.length; i++){
        try{
            const service = await faunaClient.query(
                Let(
                    {
                      doc: Get(Ref(Collection('Service'), data[i].data.serviceSpecial)),
                    },
                    {
                      document: Var('doc'),
                      reference: Select(['data', 'serviceSpecial'], Var('doc')),
                    }
                  )
            )
            data[i].data.ref = data[i].ref.id;
            data[i].data.service = service.reference
        }
        catch(err){
            data[i].data.ref = data[i].ref.id;
            data[i].data.service = "Not existed!";
        }    
        temp.push(data[i].data)
    }
    return temp
}

export const fnGetSelectedConsultant = async (consultant :any) => {
    const res = await faunaClient.query(
        Get( Ref(Collection("Consultant"), consultant.ref))
    )

    res.data.ref = res.ref.id
    return res.data;
}

export const fnGetServiceConsultant = async (consultant :any) => {
    let data = [];
    if(consultant.service.toString() == "0")
        data = await fnGetAllConsultant()
    else {
        const res = await faunaClient.query(
            Map(
                Paginate(
                    Match(
                        Index("ServiceConsultant"),
                        [ consultant.service.toString() ]
                    )
                ),
                Lambda('x', Get(Var('x')))
            )
        )
        for( let i = 0; i < res.data.length; i++){
            const item = res.data[i];
            item.data.ref = item.ref.id
            const service = await fnGetSelectedService({ref: item.data.serviceSpecial});
            item.data.service = service.serviceSpecial
            data.push(item.data);
        }
    }
    return data;
}

export const fnUpdateConsultant = async (consultant :any) => {
    const res = await faunaClient.query(
        Update(
            Ref(Collection("Consultant"), consultant.ref),
            {
                data: {
                    title: consultant.title, 
                    serviceSpecial: consultant.serviceSpecial.toString(), 
                }
            }
        )
    )

    res.data.ref = res.ref.id
    return res.data;
}

export const fnAddNewProcedure = async (serviceData: any) => {
    await faunaClient.query(
        Create(
            Collection("Procedure"),
            {
                data: serviceData
            }
        )
    )
    return "success";
}

export const fnGetAllProcedures = async () => {
    const {data} = await faunaClient.query(
        Map(
            Paginate(Documents(Collection("Procedure"))),
            Lambda("x", Get(Var("x")))
        )
    )
    
    const temp=[];
    for(let i= 0; i< data.length; i++){
        try{
            const service = await faunaClient.query(
                Let(
                    {
                      doc: Get(Ref(Collection('Service'), data[i].data.serviceSpecialty)),
                    },
                    {
                      document: Var('doc'),
                      reference: Select(['data', 'serviceSpecial'], Var('doc')),
                    }
                  )
            )
            data[i].data.ref = data[i].ref.id;
            data[i].data.service = service.reference
        }
        catch(err){
            data[i].data.ref = data[i].ref.id;
            data[i].data.service = "Not Exist!";
        }
        temp.push(data[i].data)
    }
    return temp
}

export const fnGetSelectedProcedure = async (procedure :any) => {
    try{
        const res = await faunaClient.query(
            Get( Ref(Collection("Procedure"), procedure.ref))
        )
        
        res.data.ref = res.ref.id
        return res.data;
    }
    catch(err){
        return "Invalid Operation!";
    }
}

export const fnGetServiceProcedure = async (procedure :any) => {
    let data = [];
    if(procedure.service.toString() == "0")
        data = await fnGetAllProcedures()
    else {
        const res = await faunaClient.query(
            Map(
                Paginate(
                    Match(
                        Index("ServiceProcedure"),
                        [ procedure.service.toString() ]
                    )
                ),
                Lambda('x', Get(Var('x')))
            )
        )
        
        for (let i = 0; i< res.data.length; i++) {
            const item = res.data[i];
            item.data.ref = item.ref.id
            const service = await fnGetSelectedService({ref: item.data.serviceSpecialty});
            item.data.service =  service.serviceSpecial;
            data.push(item.data);
        }
    }
    return data;
}

export const fnUdpateProcedure = async (procedure :any) => {
    try{
        const res = await faunaClient.query(
            Update(
                Ref(Collection("Procedure"), procedure.ref),
                {
                    data: {
                        procedure: procedure.procedure,
                        serviceSpecialty: procedure.serviceSpecialty,
                        timeToken: procedure.timeToken,
                        risk: procedure.risk,
                        benifits: procedure.benifits,
                        potentialComplications: procedure.potentialComplications
                    }
                }
            )
        )
        
        return "successful";
    }
    catch(err){
        return "Invalid Operation!";
    }
}

export const fnGetAllAdmissionTypeList = async () => {
    const {data} = await faunaClient.query(
        Map(
            Paginate(Documents(Collection("Service"))),
            Lambda("x", Get(Var("x")))
        )
    )
    const temp = data.map((item: any) => {
        item.data.ref = item.ref.id;
        return item.data
    })
    return temp;   
}

export const fnGetAllConsultantList= async () => {
    const {data} = await faunaClient.query(
        Map(
            Paginate(Documents(Collection("Consultant"))),
            Lambda("x", Get(Var("x")))
        )
    )
    const temp = data.map((item: any) => {
        item.data.ref = item.ref.id;
        return item.data
    })
    return temp;
}

export const fnGetAllTextRemainder = async () => {
    const {data} = await faunaClient.query(
        Map(
            Paginate(Documents(Collection("TextRemainder"))),
            Lambda("x", Get(Var("x")))
        )
    )
    const temp = data.map((item: any) => {
        item.data.ref = item.ref.id;
        return item.data
    })
    return temp;
}

export const fnAddTextRemainder = async function(textremainder: any){
    await faunaClient.query(
        Create(
            Collection("TextRemainder"),
            {
                data: textremainder
            }
        )
    )
    return "success";
}

export const fnGetSelectedTextRemainder = async (reminder: any) => {
    const res = await faunaClient.query(
        Get( Ref(Collection("TextRemainder"), reminder.ref))
    )
    res.data.ref = res.ref.id
    return res.data   
}

export const fnUpdateTextRemainder = async (reminder : any) => {
    const res = await faunaClient.query(
        Update(
            Ref(Collection("TextRemainder"), reminder.ref),
            {
                data: {
                    nhsNumber : reminder.nhsNumber,
                    mobile : reminder.mobileNumber,
                    email : reminder.email,
                    reminderText : reminder.reminder
                }
            }
        )
    )
    return "successful"
}

export const fnFindSender = async (ref: string) => {
    const res = await faunaClient.query(
        Get( Ref(Collection("PreOpQuestionNiares"), ref))
    )
    
    return { patient: res.data.email, sender: res.data.sentBy};   
}

export const fnSaveQuestionNiare = async (userInfo: any) => {
    userInfo.questions.map(async (item: any) => {
        item.subQuestions.map(async (subItem: any) => {
            Object.keys(subItem).forEach((key: any) => {subItem[key] = Base64.encode(JSON.stringify(subItem[key]))} )
            const subItemData = await faunaClient.query(
                Create(
                    Collection("SubQuestions"),
                    {
                        data: subItem
                    }
                )
            )
            return subItemData.data.ref;
        })
        Object.keys(item).forEach((key: any) => {item[key] = Base64.encode(JSON.stringify(item[key]))} )
        const itemData = await faunaClient.query(
            Create(
                Collection("Questions"),
                {
                    data: item
                }
            )
        )
        return itemData.data.ref
    })
    Object.keys(userInfo).forEach((key: any) => { 
        if(key != "ref") 
            userInfo[key] = Base64.encode(JSON.stringify(userInfo[key]))} )
    const userInfoData = await faunaClient.query(
        Create(
            Collection("Sections"),
            {
                data: {
                    title : userInfo.title,
                    info : userInfo.info,
                    link : userInfo.link,
                    imgUrl : userInfo.imgUrl,
                    completed : userInfo.completed,
                    questions : userInfo.questions
                }
            }
        )
    )
    return userInfoData.ref.id
}

export const fnUpdateQuestionNiare = async (userInfo: any) => {
    userInfo.questions.map(async (item: any) => {
        item.subQuestions.map(async (subItem: any) => {
            Object.keys(subItem).forEach((key: any) => {subItem[key] = Base64.encode(JSON.stringify(subItem[key]))} )
            const subItemData = await faunaClient.query(
                Create(
                    Collection("SubQuestions"),
                    {
                        data: subItem
                    }
                )
            )
            return subItemData.data.ref;
        })
        Object.keys(item).forEach((key: any) => {item[key] = Base64.encode(JSON.stringify(item[key]))} )
        const itemData = await faunaClient.query(
            Create(
                Collection("Questions"),
                {
                    data: item
                }
            )
        )
        return itemData.data.ref
    })
    Object.keys(userInfo).forEach((key: any) => { if(key != "ref") userInfo[key] = Base64.encode(JSON.stringify(userInfo[key]))} )
    const userInfoData = await faunaClient.query(
        Update(
            Ref(Collection("Sections"), userInfo.ref),
            {
                data: {
                    title : userInfo.title,
                    info : userInfo.info,
                    link : userInfo.link,
                    imgUrl : userInfo.imgUrl,
                    completed : userInfo.completed,
                    questions : userInfo.questions
                }
            }
        )
    )
    return userInfoData.ref.id
}

export const fnGetAllQuestionNiareList = async () => {
    
    const {data} = await faunaClient.query(
        Map(
            Paginate(Documents(Collection("Sections"))),
            Lambda("x", Get(Var("x")))
        )
    )

    const temp = data.map((item: any) => {
        return {ref : item.ref.id, title: JSON.parse(Base64.decode(item.data.title))};
    })
    return temp; 
}

export const fnAddNewPreOpQuestionNiares = async (serviceData: any) => {
    for(let i = 0; i < serviceData.questionOrSection.length; i++) {
        const temp = await faunaClient.query(
            Get( Ref(Collection("Sections"), serviceData.questionOrSection[i]))
        )
        const returnData = await faunaClient.query(
            Create(
                Collection("EditSections"),
                {
                    data: {
                        content: JSON.stringify(temp.data),
                    }
                }
            )
        )
        serviceData.questionOrSection[i] = returnData.ref.id.toString()
        serviceData.completedDate = ""
    }
    
    const res = await faunaClient.query(
        Create(
            Collection("PreOpQuestionNiares"),
            {
                data: serviceData
            }
        )
    )
    
    return process.env.DOMAIN + Base64.encode(JSON.stringify({qusnaire: res.ref.id}));
}

export const fnGetAllPreOpQuestionNiares = async () => {                     
    const {data} = await faunaClient.query(
        Map(
            Paginate(Documents(Collection("PreOpQuestionNiares"))),
            Lambda("x", Get(Var("x")))
        )
    )
    const addmissionlist = [
        "Inpatient",
        "Day Case", 
        "Outpatient"
    ]
    const temp=[];
    for(let i= 0; i< data.length; i++){
        try{
            const service = await faunaClient.query(
                Let(
                    {
                        service : Get(Ref(Collection('Service'), data[i].data.service)),
                        consultant : Get(Ref(Collection('Consultant'), data[i].data.selConsultant)),
                        procedure : Get(Ref(Collection('Procedure'), data[i].data.selProcedure)),
                    },
                    {
                        service: Select(['data', 'serviceSpecial'], Var('service')),
                        consultant: Select(['data', 'title'], Var('consultant')),
                        procedure: Select(['data', 'procedure'], Var('procedure')),
                    }
                  )
            )
            data[i].data.ref = data[i].ref.id;
            data[i].data.service = service.service
            data[i].data.selConsultant = service.consultant
            data[i].data.selProcedure = service.procedure
            data[i].data.addmission = addmissionlist[data[i].data.addmission]
        }
        catch(err){
            data[i].data.ref = data[i].ref.id;
            data[i].data.service = "Incorrect Value!";
            data[i].data.selConsultant = "Incorrect Value!";
            data[i].data.selProcedure = "Incorrect Value!";
            data[i].data.addmission = addmissionlist[data[i].data.addmission]
        }
        temp.push(data[i].data)
    }
    return temp
}

export const fnSaveEditQuestionNiare = async (qusInfo: any) => {
    const questionnaire = qusInfo.content;
    questionnaire.questions.map(async (item: any) => {
        item.subQuestions.map(async (subItem: any) => {
            Object.keys(subItem).forEach((key: any) => {subItem[key] = Base64.encode(JSON.stringify(subItem[key]))} )
        })
        Object.keys(item).forEach((key: any) => {item[key] = Base64.encode(JSON.stringify(item[key]))} )
    })
    Object.keys(questionnaire).forEach((key: any) => { 
        if(key != "ref") 
            questionnaire[key] = Base64.encode(JSON.stringify(questionnaire[key]))} )
    await faunaClient.query(
        Update(
            Ref(Collection("EditSections"), qusInfo.ref),
            {
                data: {
                    content: JSON.stringify(questionnaire)
                }
            }
        )
    )
    return ;
}

export const fnGetQuestionNiareByUser = async (userInfo: any) => {
    const res = await faunaClient.query(
        Get( Ref(Collection("PreOpQuestionNiares"), userInfo.qusRef))
    )
    const procedure = await faunaClient.query(
        Get( Ref( Collection("Procedure"), res.data.selProcedure ))
    )

    const service = await faunaClient.query(
        Get( Ref( Collection("Service"), res.data.service ))
    )
    const temp = res.data.questionOrSection;
    for( let i = 0; i< temp.length; i++){
        const returnData = await faunaClient.query(
            Let(
                {
                    Section: Get(Ref(Collection('EditSections'), temp[i])),
                },
                {
                    ref: Select(['ref', 'id'], Var('Section')),
                    content: Select(['data', 'content'], Var('Section')),
                }
            )
        )
        returnData.content = JSON.parse(returnData.content);

        const sections = {
            ref: returnData.ref,
            title: JSON.parse(Base64.decode(returnData.content.title)),
            info: JSON.parse(Base64.decode(returnData.content.info)),
            link: JSON.parse(Base64.decode(returnData.content.link)),
            imgUrl: JSON.parse(Base64.decode(returnData.content.imgUrl)),
            completed: JSON.parse(Base64.decode(returnData.content.completed)),
            questions: JSON.parse(Base64.decode(returnData.content.questions))        ,
        }
        
        const question_temp = sections.questions;
        
        for(let j = 0; j< question_temp.length; j++){
            question_temp[j].title = JSON.parse(Base64.decode(question_temp[j].title))
            question_temp[j].type = JSON.parse(Base64.decode(question_temp[j].type))
            question_temp[j].result = JSON.parse(Base64.decode(question_temp[j].result))
            question_temp[j].completed = JSON.parse(Base64.decode(question_temp[j].completed))
            question_temp[j].subQuestions = JSON.parse(Base64.decode(question_temp[j].subQuestions))
            const subquestions_temp = question_temp[j].subQuestions;    
            for(let  k=0; k< subquestions_temp.length; k++){
                subquestions_temp[k].title = JSON.parse(Base64.decode(subquestions_temp[k].title))
                subquestions_temp[k].type = JSON.parse(Base64.decode(subquestions_temp[k].type))
                subquestions_temp[k].data = JSON.parse(Base64.decode(subquestions_temp[k].data))
                subquestions_temp[k].result = JSON.parse(Base64.decode(subquestions_temp[k].result))
            }
            question_temp[j].subQuestions = subquestions_temp;
        }
        sections.questions = question_temp 
        temp[i] = sections
    }
    return {
        addmissionDate: res.data.personalAddmissionDate.split('-')[2] + "-" + res.data.personalAddmissionDate.split('-')[1] + "-" + res.data.personalAddmissionDate.split('-')[0], 
        returnByDate: res.data.returnBy.split('-')[2] + "-" + res.data.returnBy.split('-')[1] + "-" + res.data.returnBy.split('-')[0], 
        procedure: procedure.data.procedure,
        hospitalSite: service.data.hospitalSite, 
        qusData: temp
    };
}

export const fnSelectedPreOpQuestionNiares = async (data: any) => {
    const res = await faunaClient.query(
        Get( Ref(Collection("PreOpQuestionNiares"), data.ref))
    )
    res.data.ref = res.ref.id
    return res.data;
}

export const fnGetServiceQuestionnaire = async (questionnaire: any) => {
    
    let data = [];
    if(questionnaire.service.toString() == "0")
        data = await fnGetAllPreOpQuestionNiares()
    else {
        const res = await faunaClient.query(
            Map(
                Paginate(
                    Match(
                        Index("ServiceQuestionnaire"),
                        [ questionnaire.service.toString() ]
                    )
                ),
                Lambda('x', Get(Var('x')))
            )
        )
        
        for (let i = 0; i< res.data.length; i++) {
            const item = res.data[i];
            item.data.ref = item.ref.id
            const service = await fnGetSelectedService({ref: item.data.service});
            item.data.service =  service.serviceSpecial;
            data.push(item.data);
        }
    }
    return data;
}

export const fnUpdatePreOpQuestionNiares = async (data : any ) => {
    await faunaClient.query(
        Update(
            Ref(Collection("PreOpQuestionNiares"), data.ref),
            {
                data: {
                    nhsNumber : data.nhsNumber,
                    dob : data.dob,
                    service : data.service,
                    questionOrSection : data.questionOrSection,
                    addmission : data.addmission,
                    returnto : data.returnto,
                    email : data.email,
                    ccemail : data.ccemail,
                    personalAddmissionDate : data.personalAddmissionDate,
                    preAddmissionAdvice : data.preAddmissionAdvice,
                    selConsultant : data.selConsultant,
                    expectedLos : data.expectedLos,
                    sentBy : data.sentBy,
                    returnBy : data.returnBy,
                    mobileNumber : data.mobileNumber,
                    ccmobileNumber : data.ccmobileNumber,
                    selProcedure : data.selProcedure,
                }
            }
        )
    )
    return "success";
}

export const fnGetAllQuestionSections = async () => {
    const {data} = await faunaClient.query(
        Map(
            Paginate(Documents(Collection("Sections"))),
            Lambda("x", Get(Var("x")))
        )
    )
    const temp = data.map((item: any) => {
        item.data.ref = item.ref.id;
        item.data.title = JSON.parse(Base64.decode(item.data.title))
        item.data.info = JSON.parse(Base64.decode(item.data.info))
        item.data.link = JSON.parse(Base64.decode(item.data.link))
        item.data.imgUrl = JSON.parse(Base64.decode(item.data.imgUrl))
        item.data.completed = null;
        item.data.questions = null;
        return item.data
    })
    return temp;
}

export const fnGetSelectedQuestionSection = async (data : any) => {
    const res = await faunaClient.query(
        Get( Ref(Collection("Sections"), data.ref))
    )
    res.data.ref = res.ref.id
    const sections = res.data
    sections.title = JSON.parse(Base64.decode(sections.title))
    sections.info = JSON.parse(Base64.decode(sections.info))
    sections.link = JSON.parse(Base64.decode(sections.link))
    sections.imgUrl = JSON.parse(Base64.decode(sections.imgUrl))
    sections.completed = JSON.parse(Base64.decode(sections.completed))
    sections.questions = JSON.parse(Base64.decode(sections.questions))
    const question_temp = sections.questions;
    
    for(let j = 0; j< question_temp.length; j++){
        question_temp[j].title = JSON.parse(Base64.decode(question_temp[j].title))
        question_temp[j].type = JSON.parse(Base64.decode(question_temp[j].type))
        question_temp[j].result = JSON.parse(Base64.decode(question_temp[j].result))
        question_temp[j].completed = JSON.parse(Base64.decode(question_temp[j].completed))
        question_temp[j].subQuestions = JSON.parse(Base64.decode(question_temp[j].subQuestions))
        const subquestions_temp = question_temp[j].subQuestions;    
        for(let  k=0; k< subquestions_temp.length; k++){
            subquestions_temp[k].title = JSON.parse(Base64.decode(subquestions_temp[k].title))
            subquestions_temp[k].type = JSON.parse(Base64.decode(subquestions_temp[k].type))
            subquestions_temp[k].data = JSON.parse(Base64.decode(subquestions_temp[k].data))
            subquestions_temp[k].result = JSON.parse(Base64.decode(subquestions_temp[k].result))
        }
        question_temp[j].subQuestions = subquestions_temp;
    }
    sections.questions = question_temp 
    return sections;
}

export const fnGetReport = async (req: any) => {
    if(req.completeDate == "" && req.dueDate == "" && req.sendBy == "" && req.sentDate && req.service && req.selProcedure)
        return fnGetAllPreOpQuestionNiares();
    const { data } = await faunaClient.query(
        Map(
            Paginate(
                Union(
                    Match(Index("QuestionNairesByCompletedDate"), req.completedDate),
                    Match(Index("QuestionNairesBydueDate"), req.dueDate),
                    Match(Index("QuestionNairesBySentBy"), req.sentBy),
                    Match(Index("QuestionNairesBySentDate"), req.sentDate),
                    Match(Index("QuestionNairesByService"), req.service),
                    Match(Index("QuestionNairesByProcedure"), req.selProcedure)
                )
            ),
            Lambda("questionNaire", Get(Var("questionNaire")))
        )
    )
    const temp=[];
    for(let i= 0; i< data.length; i++){
        try{
            const service = await faunaClient.query(
                Let(
                    {
                        service : Get(Ref(Collection('Service'), data[i].data.service)),
                        consultant : Get(Ref(Collection('Consultant'), data[i].data.selConsultant)),
                        procedure : Get(Ref(Collection('Procedure'), data[i].data.selProcedure)),
                    },
                    {
                        service: Select(['data', 'serviceSpecial'], Var('service')),
                        consultant: Select(['data', 'title'], Var('consultant')),
                        procedure: Select(['data', 'procedure'], Var('procedure')),
                    }
                  )
            )
            data[i].data.ref = data[i].ref.id;
            data[i].data.service = service.service
            data[i].data.selConsultant = service.consultant
            data[i].data.selProcedure = service.procedure
        }
        catch(err){
            data[i].data.ref = data[i].ref.id;
            data[i].data.service = "Incorrect Value!";
            data[i].data.selConsultant = "Incorrect Value!";
            data[i].data.selProcedure = "Incorrect Value!";
        }
        temp.push(data[i].data)
    }
    return temp
}

export const fnGetFilterResult = async (req: any) => {
    const temp = {sent: 0, await: 0, overdue: 0, completed: 0}
    try{
        const {data} = await faunaClient.query(
            Map(
                Paginate(Documents(Collection("PreOpQuestionNiares"))),
                Lambda("x", Get(Var("x")))
            )
        )
        switch(req.filterOption) {
            case 0:
                data.map((questionnaire: any) => {
                    if((new Date().getTime() - new Date(questionnaire.data.personalAddmissionDate).getTime()) / 86400000 < 28){
                        temp.sent ++;
                        if(questionnaire.data.completedDate == ""){
                            temp.await ++;
                        }else {
                            temp.completed ++;
                        }
                        if((new Date().getTime() - new Date(questionnaire.data.personalAddmissionDate).getTime()) / 86400000 > questionnaire.data.dueDate){
                            temp.overdue ++;
                        }  
                    }
                })
                break;
            case 1:
                data.map((questionnaire: any) => {
                    if((new Date().getTime() - new Date(questionnaire.data.personalAddmissionDate).getTime()) / 86400000 < 1){
                        temp.sent ++;
                        if(questionnaire.data.completedDate == ""){
                            temp.await ++;
                        }else {
                            temp.completed ++;
                        }
                        if((new Date().getTime() - new Date(questionnaire.data.personalAddmissionDate).getTime()) / 86400000 > questionnaire.data.dueDate){
                            temp.overdue ++;
                        }  
                    }
                })
                break;
            case 2:
                data.map((questionnaire: any) => {
                    if((new Date().getTime() - new Date(questionnaire.data.personalAddmissionDate).getTime()) / 86400000 < 7){
                        temp.sent ++;
                        if(questionnaire.data.completedDate == ""){
                            temp.await ++;
                        }else {
                            temp.completed ++;
                        }
                        if((new Date().getTime() - new Date(questionnaire.data.personalAddmissionDate).getTime()) / 86400000 > questionnaire.data.dueDate){
                            temp.overdue ++;
                        }  
                    }
                })
                break;
            case 3:
                data.map((questionnaire: any) => {
                    if((new Date().getTime() - new Date(questionnaire.data.personalAddmissionDate).getTime()) / 86400000 < 90){
                        temp.sent ++;
                        if(questionnaire.data.completedDate == ""){
                            temp.await ++;
                        }else {
                            temp.completed ++;
                        }
                        if((new Date().getTime() - new Date(questionnaire.data.personalAddmissionDate).getTime()) / 86400000 > questionnaire.data.dueDate){
                            temp.overdue ++;
                        }  
                    }
                })
                break;
            case 4:
                data.map((questionnaire: any) => {
                    temp.sent ++;
                    if(questionnaire.data.completedDate == ""){
                        temp.await ++;
                    }else {
                        temp.completed ++;
                    }
                    if((new Date().getTime() - new Date(questionnaire.data.personalAddmissionDate).getTime()) / 86400000 > questionnaire.data.dueDate){
                        temp.overdue ++;
                    }  
                })
                break;    
        }
        return {statusCode: 200, data: temp}
    }
    catch {
        return {statusCode: 500, data: {error: ERROR_DB_CONNECTION}};
    }
    
}
