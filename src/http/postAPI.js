import {$host} from "./index"

export const fetchAllPosts = async () => {
    const {data} = await $host.get('/post/')
    return data
}

export const fetchPostById = async (id) => {
    const {data} = await $host.get('/post/' + id)
    return data
}

export const createNewPost = async (workerPost, discountPercent) => {
    const postFormData = new FormData()
    postFormData.append('title', workerPost)
    postFormData.append('discountPercent', discountPercent)

    const {data} = await $host.post('/post', postFormData)
    return data
}

export const updatePostById = async (postId, postTitle, postDiscount) => {
    const {data} = await $host.put('/post/' + postId, {title: postTitle, discountPercent: postDiscount})
    return data
}

export const deletePostById = async (postId) => {
    const {data} = await $host.delete('/post/' + postId)
    return data
}