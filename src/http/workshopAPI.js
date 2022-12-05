import {$host} from "./index"

export const fetchAllWorkshops = async () => {
    const {data} = await $host.get('/workshop')
    return data
}

export const fetchOneWorkshop = async (id) => {
    const {data} = await $host.get('/workshop/' + id)
    return data
}

export const createWorkshop = async (workshopTitle) => {
    const workshopFormData = new FormData()
    workshopFormData.append('title', workshopTitle)
    const {data} = await $host.post('/workshop/', workshopFormData)
    return data
}

export const updateWorkshop = async (workshopId, title) => {
    const {data} = await $host.put('/workshop/' + workshopId, {title: title})
    return data
}

export const deleteWorkshop = async (workshopId) => {
    const {data} = await $host.delete('/workshop/' + workshopId)
    return data
}


