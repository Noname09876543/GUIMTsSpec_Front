export interface IRequestResult {
    status: string
}

export const authentification = async (username = "", password = ""): Promise<IRequestResult> =>{
    return fetch(`/user/authentication/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
            'username': username,
            'password': password
        })
      }).then((response) => response.json())
}


export const logout = async (): Promise<IRequestResult> =>{
    return fetch(`/user/logout/`, {
        method: 'POST'
      }).then((response) => response.json())
}