import axios from "axios"

export interface IRequestResult {
    status: string
}

const defaultError = {
    status: "Error"
}

export const registration = async (username = "", full_name = "", email = "",  phone = "", password = "",  is_staff = ""): Promise<IRequestResult> =>{
    if (is_staff == "true"){
        is_staff = "True";
    }
    const options = {
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
    }

    try {
        return (await axios.post(`/api/user/`, {
            'username': username,
            'full_name': full_name,
            'email': email,
            'phone': phone,
            'password': password,
            'is_staff': is_staff
            }, options)).data
    } catch {
        return defaultError
    }


    // return fetch(`/api/user/`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //     },
    //     body: new URLSearchParams({
    //         'username': username,
    //         'full_name': full_name,
    //         'email': email,
    //         'phone': phone,
    //         'password': password,
    //         'is_staff': is_staff
    //     })
    //   }).then((response) => response.json())
}
