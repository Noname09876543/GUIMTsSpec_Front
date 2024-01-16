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
    specialists: ISpecialist[]
}


export const getSpecialists = async (): Promise<ISpecialistResult> =>{
    return fetch(`/api/specialists/`)
        .then((response) => response.json())
        .catch(()=>(default_specialists))
}

export const getSpecialist = async (id = 0): Promise<ISpecialist> =>{
    return fetch(`/api/specialists/${id}`)
        .then((response) => response.json())
        .catch(()=>(default_specialists['specialists'][id - 1]))
}

export const getFilteredSpecialists = async (name = ''): Promise<ISpecialistResult> =>{
    return fetch(`/api/specialists/?name=${name}`)
        .then((response) => response.json())
        .catch(()=>(default_specialists))
}