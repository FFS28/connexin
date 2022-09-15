export const saveUserRegister = (userData: any) => {
    // validationcheck
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/saveUserRegister', userData).then(res).catch(rej)
    })
}

export const setPassword = (userData: any) => {
    // validationcheck
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/setPassword', userData).then(res).catch(rej)
    })
}

export const saveUserData = (userData: any) => {
    // validationcheck
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/saveUser', userData).then(res).catch(rej)
    })
}

export const saveUserPassData = (userData: any) => {
    // validationcheck
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/saveUserPassData', userData).then(res).catch(rej)
    })
}

export const addRole = (userData: any) => {
    // validationcheck
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/addRole', userData).then(res).catch(rej)
    })
}

export const getAllRoles = () => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getAllRoles').then(res).catch(rej)
    })
}

export const getSelectedRole = (editinfo: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getSelectedRole', editinfo).then(res).catch(rej)
    })
}

export const updateRole = (roleData: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/updateRole', roleData).then(res).catch(rej)
    })
}

export const getAllUserLevel = () => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getAllUserLevel').then(res).catch(rej)
    })
}

export const saveAllAccess = (data :any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/saveAllAccess', data).then(res).catch(rej)
    })
}

export const addNewService = (data :any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/addNewService', data).then(res).catch(rej)
    })
}

export const updateService = (data :any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/updateService', data).then(res).catch(rej)
    })
}

export const getAllServices = () => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getAllServices').then(res).catch(rej)
    })
}

export const getSelectedService = (data : any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getSelectedService', data).then(res).catch(rej)
    })
}

export const addNewConsultant = (data :any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/addNewConsultant', data).then(res).catch(rej)
    })
}

export const updateConsultant = (data :any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/updateConsultant', data).then(res).catch(rej)
    })
}

export const getSelectedConsultant = (data :any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getSelectedConsultant', data).then(res).catch(rej)
    })
}


export const getAllConsultant = () => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getAllConsultant').then(res).catch(rej)
    })
}

export const getServiceConsultant = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getServiceConsultant', data).then(res).catch(rej)
    })
}


export const addNewProcedure = (data :any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/addNewProcedure', data).then(res).catch(rej)
    })
}

export const getAllProcedures = () => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getAllProcedures').then(res).catch(rej)
    })
}

export const getServiceProcedure = (procedure: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getServiceProcedure', procedure).then(res).catch(rej)
    })
}

export const getSelectedProcedure = (procedure: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getSelectedProcedure', procedure).then(res).catch(rej)
    })
}

export const udpateProcedure = (procedure: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/udpateProcedure', procedure).then(res).catch(rej)
    })
}

export const addNewPreOpQuestionNiares = (data :any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/question/addNewPreOpQuestionNiares', data).then(res).catch(rej)
    })
}

export const updatePreOpQuestionNiares = (data :any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/question/updatePreOpQuestionNiares', data).then(res).catch(rej)
    })
}


export const getAllPreOpQuestionNiares = () => {
    return new Promise((res, rej) => {
        fetch('/api/admins/question/getAllPreOpQuestionNiares').then(res).catch(rej)
    })
}

export const getSelectedPreOpQuestionNiares = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/question/getSelectedPreOpQuestionNiares', data).then(res).catch(rej)
    })
}

export const getServiceQuestionnaire = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/question/getServiceQuestionnaire', data).then(res).catch(rej)
    })
}


export const getAllQuestionNiareList = () => {
    return new Promise((res, rej) => {
        fetch('/api/admins/question/getAllQuestionNiareList').then(res).catch(rej)
    })
}

export const getAllAdmissionTypeList = () => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getAllAdmissionTypeList').then(res).catch(rej)
    })
}

export const getAllConsultantList = () => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getAllConsultantList').then(res).catch(rej)
    })
}

export const sendTextRemainder = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/sendTextRemainder', data).then(res).catch(rej)
    })
}

export const getAllTextRemainder = () => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getAllTextRemainder').then(res).catch(rej)
    })
}

export const getSelectedTextRemainder = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getSelectedTextRemainder', data).then(res).catch(rej)
    })
}

export const updateTextRemainder = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/updateTextRemainder', data).then(res).catch(rej)
    })
}

export const getAllUserInfo = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getLevelUsers', data).then(res).catch(rej)
    })
}

export const getSelectedUserInfo = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/getSelectedUser', data).then(res).catch(rej)
    })
}


export const updateUserInfo = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/updateUser', data).then(res).catch(rej)
    })
}

export const deleteUserInfo = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/auth/deleteUser', data).then(res).catch(rej)
    })
}

export const getAllQuestionSections = () => {
    return new Promise((res, rej) => {
        fetch('/api/admins/question/getAllQuestionSections').then(res).catch(rej)
    })
}

// user

export const getQuestionNiare = (userInfo: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/question/getQuestionNiare', userInfo).then(res).catch(rej)
    })
}

export const getSelectedQuestionSection = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/question/getSelectedQuestionSection', data).then(res).catch(rej)
    })
}

export const findReport = (data: any) => {
    return new Promise((res, rej) => {
        fetch('/api/admins/question/findReport', data).then(res).catch(rej)
    })
}
