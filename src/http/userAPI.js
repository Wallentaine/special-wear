import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

export const registration = async(email, password) => {
    const registrationFormData = new FormData()
    registrationFormData.append("email", email)
    registrationFormData.append("password", password)
    registrationFormData.append("role", "DEFAULT")
    const {data} = await $host.post('/user/registration', registrationFormData)
    localStorage.setItem('token', data)

    if (data.error) return data

    return jwt_decode(data)
}

export const login = async(email, password) => {
    const loginFormData = new FormData()
    loginFormData.append("email", email)
    loginFormData.append("password", password)
    const {data} = await $host.post('/user/login', loginFormData)
    localStorage.setItem('token', data)

    if (data.error) return data

    return jwt_decode(data)
}

export const check = async () => {
    if (localStorage.getItem('token')) {
        const {data} = await $authHost.get('/user/check')

        if (data.error) return

        localStorage.setItem('token', data)
        return jwt_decode(data)
    }
}