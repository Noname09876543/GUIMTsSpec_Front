import axios from "axios"

const default_specialists = {
    "specialists": [
        {
            "id": 1,
            "name": "Mock Специалист 1",
            "desc": "Описание специалиста 1",
            "preview_image": null
        },
        {
            "id": 2,
            "name": "Mock Специалист 2",
            "desc": "Описание специалиста 2",
            "preview_image": null
        },
        {
            "id": 3,
            "name": "Mock Специалист 3",
            "desc": "Описание специалиста 3",
            "preview_image": null
        }
    ]
}


export interface ISpecialist {
    id: Number
    name: string
    desc: string
    preview_image: string
}

export interface ISpecialistResult {
    service_request_id: Number,
    specialists: ISpecialist[]
}

export interface IRequestResult {
    status: string
}

export interface IAddDeleteSpecialistResult {
    id: Number,
    specialist: ISpecialist[]
}




export const getSpecialists = async (): Promise<ISpecialistResult> =>{
    return (await axios.get(`/api/specialists/`)).data
    // return fetch(`/api/specialists/`)
    //     .then((response) => response.json())
    //     .catch(()=>(default_specialists))
}

export const getSpecialist = async (id = 0): Promise<ISpecialist> =>{
    return (await axios.get(`/api/specialists/${id}`)).data
    // return fetch(`/api/specialists/${id}`)
    //     .then((response) => response.json())
    //     .catch(()=>(default_specialists['specialists'][id - 1]))
}

export const getFilteredSpecialists = async (name = ''): Promise<ISpecialistResult> =>{
    return (await axios.get(`/api/specialists/?name=${name}`)).data
    // return fetch(`/api/specialists/?name=${name}`)
    //     .then((response) => response.json())
    //     .catch(()=>(default_specialists))
}

export const add_spec = async (id = 0): Promise<IAddDeleteSpecialistResult> =>{
    return (await axios.post(`/api/specialists/${id}/`)).data
    // return fetch(`/api/specialists/${id}/`, {
    //     method: 'POST',
    // })
    // .then((response) => response.json())
}

export const delete_spec = async (id = 0): Promise<IAddDeleteSpecialistResult> =>{
    return (await axios.delete(`/api/specialists/${id}/`)).data
    // return fetch(`/api/specialists/${id}/`, {
    //     method: 'DELETE',
    // })
    // .then((response) => response.json())
}

export const change_spec = async (id = 0, name = "", desc = "", preview_image: File | undefined): Promise<ISpecialist> =>{
    const options = {
        headers: {
            // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            "Content-Type": "multipart/form-data"
        }
    }
    return (await axios.put(`/api/specialists/${id}/`,{
        'name': name,
        'desc': desc,
        'preview_image': preview_image
    }, options)).data
}

export const add_new_spec = async (name = "", desc = "", preview_image: File | undefined): Promise<ISpecialist> =>{
    const options = {
        headers: {
            // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            "Content-Type": "multipart/form-data"
        }
    }
    return (await axios.post(`/api/specialists/`,{
        'name': name,
        'desc': desc,
        'preview_image': preview_image
    }, options)).data
}

export const delete_specialist_by_moder = async (id = 0): Promise<IAddDeleteSpecialistResult> =>{
    return (await axios.delete(`/api/specialists/${id}/delete/`)).data
    // return fetch(`/api/specialists/${id}/`, {
    //     method: 'DELETE',
    // })
    // .then((response) => response.json())
}
