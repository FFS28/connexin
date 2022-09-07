const faunadb = require("faunadb")
const {Base64} = require('js-base64');
const nodemailer = require('nodemailer')
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
                        active : userInfo.active
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
    const data = await faunaClient.query(
        Create(
            Collection("TempRegister"),
            {
                data: userInfo
            }
        )
    )
    data.data.ref = data.ref.id
    // This is sendlink part
    const Link = process.env.DOMAIN + "resetpassword/" + Base64.encode(JSON.stringify(data.data))
    // const msg = {
    //     to: data.data.sendLink,
    //     from: 'Connexin Admin',
    //     subject: 'Welcome to get invitation from Connexin!',
    //     text: 'Please click Link and then set Password!',
    //     html: `<a href=${Link}>Here</a>`,
    //   };
    // sgMail.send(msg);
    
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "mail.digitalquill.co.uk",
        auth: {
            user: 'connexin@voittaa.co.uk',
            pass: 'BJ87u1mj!',
        },
        secure: true,
    });
    const mailData = {
        from: 'connexin@voittaa.co.uk',
        to: 'rasulovasliddin245@gmail.com',
        subject: `Message From Yeti`,
        text: "This is Test Message",
        html: '<div>This is Test</div>'
    }
    console.log(mailData)
    transporter.sendMail(mailData, function (err: any, info: any) {
        if(err)
          console.log(err)
        else
          console.log(info)
    })

    return "success";
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
    
    var res = await faunaClient.query(
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
                    role: roleInfo.name, 
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
        Update(
            Ref(Collection("Service"), serviceData.ref),
            {
                data: {
                    serviceSpecial: serviceData.serviceSpecial, 
                    subServiceSpecial: serviceData.subServiceSpecial, 
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
                    data : {
                        serviceSpecial : serviceData.serviceSpecial,
                        subServiceSpecial : serviceData.subServiceSpecial
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
    let res = await faunaClient.query(
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
            let item = res.data[i];
            item.data.ref = item.ref.id
            let service = await fnGetSelectedService({ref: item.data.serviceSpecial});
            item.data.service = service.serviceSpecial
            data.push(item.data);
        }
    }
    return data;
}

export const fnUpdateConsultant = async (consultant :any) => {
    let res = await faunaClient.query(
        Update(
            Ref(Collection("Consultant"), consultant.ref),
            {
                data: {
                    title: consultant.title, 
                    serviceSpecial: consultant.serviceSpecial, 
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
        let res = await faunaClient.query(
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
            let item = res.data[i];
            item.data.ref = item.ref.id
            let service = await fnGetSelectedService({ref: item.data.serviceSpecialty});
            item.data.service =  service.serviceSpecial;
            data.push(item.data);
        }
    }
    return data;
}

export const fnUdpateProcedure = async (procedure :any) => {
    try{
        let res = await faunaClient.query(
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
    let res = await faunaClient.query(
        Get( Ref(Collection("TextRemainder"), reminder.ref))
    )
    res.data.ref = res.ref.id
    return res.data   
}

export const fnUpdateTextRemainder = async (reminder : any) => {
    let res = await faunaClient.query(
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