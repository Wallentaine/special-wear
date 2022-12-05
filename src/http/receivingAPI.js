import {$host} from "./index"

export const fetchAllReceiving = async () => {
    const {data} = await $host.get('/receiving')
    return data
}

export const fetchReceivingById = async (receivingId) => {
    const {data} = await $host.get('/receiving/' + receivingId)
    return data
}

export const fetchReceivingReport = async (month, year) => {
    const {data} = await $host.get('/receiving/report', {params: {month: month, year: year}})
    return data
}

export const createNewReceiving = async (workerId, receivingDate, sign, wears) => {
    const receivingFormData = new FormData()
    receivingFormData.append('workerId', workerId)
    receivingFormData.append('receivingDate', receivingDate)
    receivingFormData.append('sign', sign)
    receivingFormData.append('wears', wears)
    const {data} = await $host.post('/receiving', receivingFormData)
    return data
}

export const updateReceivingDataById = async (receivingId, workerId, receivingDate, sign, wears) => {
    const {data} = await $host.put('/receiving/' + receivingId, {workerId: workerId, receivingDate: receivingDate, sign: sign, wears: wears})
    return data
}

export const deleteReceivingDataById = async (receivingId) => {
    const {data} = await $host.delete('/receiving/' + receivingId)
    return data
}