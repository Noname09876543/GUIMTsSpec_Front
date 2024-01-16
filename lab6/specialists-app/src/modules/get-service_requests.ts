import axios from 'axios'
import { ISpecialist,} from './get-specialist'

export interface IServiceRequest {
    id: Number
    creator: string
    specialist: ISpecialist[]
    comment: string
    status: string
    created_at: string
    formed_at: string
    finished_at: string
    canceled_at: string
}

export interface IServiceRequestResult {
    service_requests: IServiceRequest[]
}

export interface IRequestResult {
    status: string
}


export const getServiceRequests = async (): Promise<IServiceRequestResult> =>{
    return (await axios.get(`/api/service_requests/`)).data
    // return fetch(`/api/service_requests/`)
    //     .then((response) => response.json())
}

export const get_service_request = async (id = 0): Promise<IServiceRequest> =>{
    return (await axios.get(`/api/service_requests/${id}/`)).data
    // return fetch(`/api/service_requests/${id}/`)
    // .then((response) => response.json())
}


export const delete_service_request = async (id = 0): Promise<IRequestResult> =>{
    return (await axios.delete(`/api/service_requests/${id}/`)).data
    // return fetch(`/api/service_requests/${id}/`, {
    //     method: 'DELETE',
    // })
    // .then((response) => response.json())
}

export const form_service_request = async (id = 0): Promise<IRequestResult> =>{
    return (await axios.put(`/api/service_requests/${id}/form/`)).data
    // return fetch(`/api/service_requests/${id}/form/`, {
    //     method: 'PUT',
    // })
    // .then((response) => response.json())
}



export const getFilteredServiceRequests = async (status = '', formed_at_from = '', formed_at_to=''): Promise<IServiceRequestResult> =>{
    let req_str = `/api/service_requests/`
    if (status != "ALL"){
        req_str += `?status=${status}`
    }
    if (formed_at_from != ""){
        if (status != "ALL"){
            req_str += "&"
        } else {
            req_str += "?"
        }
        req_str += `formed_at_from=${formed_at_from}`
    }
    if (formed_at_to != ""){
        if (status != "ALL" || formed_at_from != ""){
            req_str += "&"
        } else {
            req_str += "?"
        }
        req_str += `formed_at_to=${formed_at_to}`
    }
    console.log((await axios.get(req_str)).data)
    return (await axios.get(req_str)).data
    // let req_str = `/api/service_requests/?status=IN_WORK&formed_at_from=2023-12-15&formed_at_to=2023-12-15`
    // return fetch(req_str)
    //     .then((response) => response.json())
}

export const cancel_service_request = async (id = 0): Promise<IServiceRequest> =>{
    const options = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    return (await axios.put(`/api/service_requests/${id}/change_status/`,{
        'status': "CANCELED",
    }, options)).data
}

export const finish_service_request = async (id = 0): Promise<IServiceRequest> =>{
    const options = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    }
    return (await axios.put(`/api/service_requests/${id}/change_status/`,{
        'status': "FINISHED",
    }, options)).data
}
