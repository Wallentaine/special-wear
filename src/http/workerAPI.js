import {$host} from "./index"

export const fetchWorkers = async () => {
    const {data} = await $host.get('/worker')
    return data
}

export const fetchOneWorker = async (id) => {
    const {data} = await $host.get('/worker/' + id)
    if (data) return data
}

export const fetchBossByWorkerId = async (id) => {
    const {data} = await $host.get('/worker/' + id + '/getBoss')
    return data
}

export const fetchWorkerReceiving = async (id) => {
    const {data} = await $host.get('/worker/' + id + '/receiving')
    if (data) return data
}

export const fetchWorkersByWorkshop = async (workshopId) => {
    const {data} = await $host.get('/worker/workshop/' + workshopId)
    return data
}

export const fetchWorkerByReceivingMonth = async (receivingMonth) => {
    const {data} = await $host.get('/worker/receivingByMonth', {params: {month: receivingMonth}})
    return data
}

export const fetchWorkerBetweenDiscount = async (from, before) => {
    const {data} = await $host.get('/worker/discountbetween', {params: {from: from, before: before}})
    return data
}

export const fetchWorkerNotReceiving = async () => {
    const {data} = await $host.get('/worker/notreceiving')
    return data
}

export const createNewWorker = async (workshopId, postId, fullName) => {
    const workerFormData = new FormData()
    workerFormData.append('workshopId', workshopId)
    workerFormData.append('postId', postId)
    workerFormData.append('fullName', fullName)
    const {data} = await $host.post('/worker/', workerFormData)
    return data
}

export const updateWorkerById = async (workerId, workshopId, postId, fullName) => {
    const {data} = await $host.put('/worker/' + workerId, {workshopId: workshopId, postId: postId, fullName: fullName})
    return data
}

export const deleteWorkerById = async (workerId) => {
    const {data} = await $host.delete('/worker/' + workerId)
    return data
}