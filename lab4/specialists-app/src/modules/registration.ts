export interface IRequestResult {
    status: string
}

export const registration = async (username = "", full_name = "", email = "",  phone = "", password = "",  is_staff = ""): Promise<IRequestResult> =>{
    if (is_staff == "true"){
        is_staff = "True";
    }
    return fetch(`/api/user/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
            'username': username,
            'full_name': full_name,
            'email': email,
            'phone': phone,
            'password': password,
            'is_staff': is_staff
        })
      }).then((response) => response.json())
}
