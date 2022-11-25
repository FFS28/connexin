export const validationCheckNumber = (value: number, arg1: number, arg2: number) => {
    return value >= arg1 && value <= arg2;
}

export const validationCheckDate = (value: string) => {
    const regexExp = /^(?:(?:31(-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(-)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/gi;
    return regexExp.test(value);
}

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