const faunadb = require("faunadb")
const {Base64} = require('js-base64');
// const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const faunaClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET as string,
    domain: 'db.fauna.com'
})
const { Map, Paginate, Documents, Collection, Lambda, Get, Var, Ref, Select, Match, Index, Create, Update, Delete, Join, Let, Merge } = faunadb.query 

export const fnSignIn = async (userInfo: any) => {
    if(userInfo.level == 0){
        const {data} = await faunaClient.query(
            Map(
                Paginate(
                    Match(
                        Index("MyUserByEmailAndLevel"),
                        [userInfo.email, userInfo.level]
                    )
                ),
                Lambda('x', Get(Var('x')))
            )
        )
        if(data.length == 0){
            return false
        }else{
            data[0].data.ref = data[0].ref.id
            return data[0].data
        }
    }else{
        const {data} = await faunaClient.query(
            Map(
                Paginate(
                    Match(
                        Index("MyAdminByEmail"),
                        [userInfo.email]
                    )
                ),
                Lambda('x', Get(Var('x')))
            )
        )
        if(data.length == 0){
            return false
        }else{
            data[0].data.ref = data[0].ref.id
            return data[0].data
        }
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

export const fnGetLevelUsers = async (userInfo: any) => {
    if(userInfo.level == 0){
        const {data} = await faunaClient.query(
            Map(
                Paginate(
                    Match(
                        Index("MyUserByLevelAndHospital"),
                        [ userInfo.level, userInfo.hospital]
                    )
                ),
                Lambda('x', Get(Var('x')))
            )
        )
        const temp = data.map((item: any) => {
            item.data.ref = item.ref.id;
            return item.data;
        })
        return temp
    }
    else{
        const {data} = await faunaClient.query(
            Map(
                Paginate(
                    Match(
                        Index("MyAdminByHospital"),
                        [ userInfo.hospital]
                    )
                ),
                Lambda('x', Get(Var('x')))
            )
        )
        const temp = data.map((item: any) => {
            item.data.ref = item.ref.id;
            return item.data;
        })
        return temp
    }   
}

export const fnGetSelectedUser = async (userInfo: any) => {
    let temp;
    
    if(userInfo.level == 0){
        temp = await faunaClient.query(
            Get(
                Ref(Collection('Users'), userInfo.ref)
            )
        ).then((res: any) => {
            res.data.ref= res.ref.id
            return res.data
        })
    }else {
        temp = await faunaClient.query(
            Get(
                Ref(Collection('Admins'), userInfo.ref)
            )
        ).then((res: any) => {
            res.data.ref= res.ref.id
            return res.data
        })
    }

    return temp;  
}

export const fnUpdateUser = async (userInfo: any) => {
    if(userInfo.level == 0)
    {
        await faunaClient.query(
            Update(
                Ref(Collection("Users"), userInfo.ref),
                {
                    data: {
                        name: userInfo.name, 
                        access: userInfo.access, 
                        role: userInfo.role, 
                        active : userInfo.active
                    }
                }
            )
        )
    }else{
        await faunaClient.query(
            Update(
                Ref(Collection("Admins"), userInfo.ref),
                {
                    data: {
                        name: userInfo.name, 
                        access: userInfo.access, 
                        role: userInfo.role, 
                        active : userInfo.active,
                        service: userInfo.service,
                        level: userInfo.access
                    }
                }
            )
        )
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

export const fnSaveUserRegister = async (userInfo: any) => {
    const is_exist = await faunaClient.query(
        Map(
            Paginate(
                Match(Index("MyAdminByEmail"), userInfo.email)
            ),
            Lambda(
                "person",
                Get(Var("person"))
            )
        )
    )
    if(is_exist.data.length > 0)
        return null;
    const data = await faunaClient.query(
        Create(
            Collection("Admins"),
            {
                data: userInfo
            }
        )
    )
    return data.ref.id.toString();
}

export const fnReSetPassword = async (userInfo: any) => {
    console.log(userInfo)
    const res = await faunaClient.query(
        Update(
            Ref(Collection("Admins"), userInfo.ref.toString()),
            {
                data: {
                    active : false
                }
            }
        )
    )
    res.data.ref = res.ref.id;
    // This is sendlink part
    const Link = process.env.DOMAIN + "setpassword/" + Base64.encode(JSON.stringify(res.data))
    return Link;
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

export const fnAddRole = async (roleInfo: any) => {
    
    const data = await faunaClient.query(
        Create(
            Collection("Roles"),
            {
                data: roleInfo
            }
        )
    )
    
    data.data.ref = data.ref.id
    return data.data;   
}

export const fnGetSelectedRole = async (roleInfo: any) => {
    
    const res = await faunaClient.query(
        Get( Ref(Collection("Roles"), roleInfo.ref))
    )
    res.data.ref = res.ref.id
    return res.data;
}

export const fnUpdateRole = async (roleInfo: any) => {
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
    return "success";
}

export const fnGetAllRoles = async () => {
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
    return temp;   
}

export const fnGetAllUserLevel = async () => {
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
    return temp;   
}

export const fnSaveAllAccess = async (userInfo: any) => {
    userInfo.map( async (item: any, index: number)=> {
        await faunaClient.query(
            Update(
                Ref(Collection("Access"), userInfo[index].ref),
                {
                    data: {
                        level: userInfo[index].level
                    }
                }
            )
        )
    })
    return true;
}

export const fnAddNewService = async (serviceData: any) => {
    
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