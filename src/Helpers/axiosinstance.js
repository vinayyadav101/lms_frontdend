import axios from 'axios'

const BASEURL = "https://"

export const instance = axios.create({
    baseURL:BASEURL,
    timeout:1000,
    withCredentials:true
})
