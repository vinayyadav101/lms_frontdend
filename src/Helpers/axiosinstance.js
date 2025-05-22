import axios from 'axios'

const BASEURL = "http://localhost:8082"

export const instance = axios.create({
    baseURL:BASEURL,
    withCredentials:true
})
