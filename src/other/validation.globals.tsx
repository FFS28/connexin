export const validationCheckText = (value: string) => {
    return value != "";
}

export const validationCheckEmail = (value: string) => {
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

    return regexExp.test(value);
}

export const validationConnexinEmail = (value : string) => {
    if(validationCheckEmail(value))
        return value.split("@")[1] == "chs.net" || value.split("@")[1] == "chs.uk"
    return false 
}