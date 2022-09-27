import { decode } from 'js-base64';

export const makeJSON = (data: any) => {
    return {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }
}

export const checkDataType = (data: any) => {
    // validationcheck
    console.log(data)
    return new Promise((res, rej) => {
        data = JSON.parse(decode(data))
        if(data)
            if(typeof(data) == "object")
                res(data)
            else
                rej("Please check page Url!")    
        else
            rej("Please check page Url!")
    })
}