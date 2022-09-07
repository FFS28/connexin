const faunadb = require("faunadb")
const {Base64} = require('js-base64');

const faunaClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET as string,
    domain: 'db.fauna.com'
})

const { Let, Map, Paginate, Documents, Collection, Lambda, Get, Var, Ref, Select, Match, Index, Create, Update, Delete } = faunadb.query 

export const fnSaveQuestionNiare = async (userInfo: any) => {
    userInfo.questions.map(async (item: any, index: number) => {
        item.subQuestions.map(async (subItem: any, subIndex: number) => {
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
    userInfo.questions.map(async (item: any, index: number) => {
        item.subQuestions.map(async (subItem: any, subIndex: number) => {
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
    await faunaClient.query(
        Create(
            Collection("PreOpQuestionNiares"),
            {
                data: serviceData
            }
        )
    )
    return "success";
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

export const fnGetQuestionNiareByUser = async (userInfo: any) => {
    
    const {data} = await faunaClient.query(
        Map(
            Paginate(
                Match(
                    Index("QuestionNiareByUser"),
                    [userInfo.email]
                )
            ),
            Lambda('x', Get(Var('x')))
        )
    )
    
    const questions = [];
    if(data.length == 0)
        return [];
    const temp = data[0].data.questionOrSection;
    for( let i = 0; i< temp.length; i++){
        const sections = await faunaClient.query(
            Let(
                {
                    Section: Get(Ref(Collection('Sections'), temp[i])),
                },
                {
                    ref: Select(['ref', 'id'], Var('Section')),
                    title: Select(['data', 'title'], Var('Section')),
                    info: Select(['data', 'info'], Var('Section')),
                    link: Select(['data', 'link'], Var('Section')),
                    imgUrl: Select(['data', 'imgUrl'], Var('Section')),
                    completed: Select(['data', 'completed'], Var('Section')),
                    questions: Select(['data', 'questions'], Var('Section')),
                }
            )
        )
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
        temp[i] = sections
    }
    return temp;
}

export const fnSelectedPreOpQuestionNiares = async (data: any) => {
    let res = await faunaClient.query(
        Get( Ref(Collection("PreOpQuestionNiares"), data.ref))
    )
    res.data.ref = res.ref.id
    return res.data;
}

export const fnUpdatePreOpQuestionNiares = async (data : any ) => {
    let res = await faunaClient.query(
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
    let res = await faunaClient.query(
        Get( Ref(Collection("Sections"), data.ref))
    )
    res.data.ref = res.ref.id
    let sections = res.data
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
    // let resData = null
    // try{
    //     const { data } = await faunaClient.query(
    //         Map(
    //             Paginate(Documents(Collection('PreOpQuestionNiares')), {
    //             }),
    //             Lambda(
    //                 'X',
    //                 {
    //                     selProcedure: Select(['data', 'selProcedure'], Get(Var('X'))),
    //                     service: Select(['data', 'service'], Get(Var('X'))),
    //                     sentDate: Select(['data', 'sentDate'], Get(Var('X'))),
    //                     sentBy: Select(['data', 'sentBy'], Get(Var('X'))),
    //                     dueDate: Select(['data', 'returnBy'], Get(Var('X'))),
    //                     completedDate: Select(['data', 'completedDate'], Get(Var('X'))),
    //                     overdue: Select(['data', 'overdue'], Get(Var('X'))),
    //                 }
    //             )
    //         )
    //     )
    //     resData = data;
    // }
    // catch {
    //     console.log('err')
    // }

    const {data} = await faunaClient.query(
        Map(
            Paginate(
                Match(
                    Index("ReportsBy"),
                    [req.selProcedure, req.service, req.sentDate, req.sentBy, req.dueDate, req.completedDate, req.overdue]
                )
            ),
            Lambda('x', Get(Var('x')))
        )
    )
    let returnData = data.map((item: any) => {
        item.data.ref = item.ref.id
        return item.data
    })
    // // [req.name, req.selProcedure, req.service, req.sentDate, req.sentBy, req.dueDate, req.completedDate, req.overdue]
    // if(resData == null)
    //     return "error";
    // let returnData = resData.filter((item: any, index: number) => {
    //     return item.selProcedure == req.selProcedure && item.service == req.service && item.sentDate == req.sentDate && item.sentBy == req.sentBy && item.dueDate == req.dueDate && item.completedDate == req.completedDate && item.overvue == parseInt(req.overvue);
    // })
    return returnData;
}
