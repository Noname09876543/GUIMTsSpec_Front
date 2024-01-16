import axios from "axios"

export interface IRequestResult {
    status: string,
    role: string,
}

export interface ILogoutRequestResult {
    status: string,
}


export const authentification = async (username = "", password = ""): Promise<IRequestResult> =>{
    const options = {
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
    }
    return (await axios.post(`/user/authentication/`, {
        'username': username,
        'password': password
      }, options)).data

    // return fetch(`/user/authentication/`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //     },
    //     body: new URLSearchParams({
    //         'username': username,
    //         'password': password
    //     })
    //   }).then((response) => response.json())
}


export const logout = async (): Promise<ILogoutRequestResult> =>{
    const options = {
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
    }
    return (await axios.post(`/user/logout/`, options)).data
    // return fetch(`/user/logout/`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //     }
    //   }).then((response) => response.json())
}