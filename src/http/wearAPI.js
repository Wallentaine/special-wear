import {$host} from "./index"

export const fetchAllWear = async () => {
    const {data} = await $host.get('/wear')
    return data
}

export const fetchOneWear = async (wearId) => {
    const {data} = await $host.get('/wear/' + wearId)
    if (data) return data
}

export const createNewSpecialWear = async (wearType, wearTime, wearPrice) => {
    const wearFormData = new FormData()
    wearFormData.append('type', wearType)
    wearFormData.append('wearTime', wearTime)
    wearFormData.append('price', wearPrice)
    const {data} = await $host.post('/wear', wearFormData)
    return data
}

export const updateWearById = async (wearId, wearType, wearTime, wearPrice) => {
    const {data} = await $host.put('/wear/' + wearId, {type: wearType, wearTime: wearTime, price: wearPrice})
    return data
}

export const deleteWearById = async (wearId) => {
    const {data} = await $host.delete('/wear/' + wearId)
    return data
}