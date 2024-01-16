const default_moderator_rights_requests = {
    "moderator_rights_requests": []
}

export interface IModeratorRightsRequest {
    id: number
    username: string
}

export interface IModeratorRightsRequestsResult {
    moderator_rights_requests: IModeratorRightsRequest[]
}

export const getModeratorRightsRequests = async (): Promise<IModeratorRightsRequestsResult> =>{
    return fetch(`/api/moderator_rights_requests/`)
        .then((response) => response.json())
        .catch(()=>(default_moderator_rights_requests))
}

export const grantModeratorRights = async (id = 0): Promise<IModeratorRightsRequestsResult> =>{
    return fetch(`/api/moderator_rights_requests/${id}/approve/`, {
        method: 'PUT'
      }).then((response) => response.json())
}