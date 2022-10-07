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
    return new Promise((res, rej) => {
        try{
            data = JSON.parse(decode(data))
            if(data)
                if(typeof(data) == "object")
                    res(data)
                else
                    rej("Please check page Url!")    
            else
                rej("Please check page Url!")
        }
        catch {
            rej("Please check page Url!")
        }
    })
}