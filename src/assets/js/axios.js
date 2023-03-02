import axios from 'axios'
import { Message } from 'element-ui'
import router from '../../router'

axios.defaults.withCredentials = true
axios.defaults.timeout = 5000

axios.interceptors.request.use(config => {
    config.headers.Authentication = localStorage.getItem('token') || ''
    return config
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use(res => {
    if (res.status === 200) {
        const { code, msg, data } = res.data
        if (code === 1) {
            return data
        } else {
            console.error(res)
            Message.error(msg)
            if (code === 403) {
                router.push('/login')
            }
            return false
        }
    }
}, error => {
    Message.error('服务器出错了，请稍后再试')
    return Promise.reject(error)
})
export default axios
