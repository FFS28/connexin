import { ERROR_INTERNET_CONNECTION } from "../constants";

export const CallGetAPI = (url: string) => {
    return new Promise((res, rej) => {
        fetch(url).then((response) => {
            response.json().then(JResponse => {
                if(JResponse.statusCode == 200 || JResponse.statusCode == 201) 
                    res(JResponse.data) 
                else 
                    rej(JResponse.data.error)
            })
        }).catch(() => {
            rej(ERROR_INTERNET_CONNECTION);
        })
    })
}

export const CallPostAPI = (url: string, data: object) => {
    return new Promise((res, rej) => {
        fetch(url, data).then((response) => {
            response.json().then(JResponse => {
                if(JResponse.statusCode == 200 || JResponse.statusCode == 201) 
                    res(JResponse.data) 
                else 
                    rej(JResponse.data.error)
            })
        }).catch(() => {
            rej(ERROR_INTERNET_CONNECTION);
        })
    })
}
