import { message } from 'element-ui'
import axios from './axios'
import qs from 'qs' // 序列化时候用到

// get方式
const get = async (url, params) => {
    try {
        return await axios.get(url, {
            params
        })
    } catch (error) {
        console.log(error)
    }
}
// put方式
const put = async (url, params) => {
    try {
        return await axios.put(url, params)
    } catch (error) {
        console.log(error)
    }
}
// delete 方式
const del = async (url, params) => {
    try {
        return await axios.delete(`${url}?${Object.keys(params)[0]}=${Object.values(params)[0]}`)
    } catch (error) {
        console.log(error)
    }
}
// post方式 + 序列化格式
const formData = async (url, params) => {
    try {
        return await axios.post(url, qs.stringify(params))
    } catch (error) {
        console.log(error)
    }
}
// 图片上传
const upload = async (url, params) => {
    try {
        return await axios({
            url,
            method: 'post',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        console.log(error)
    }
}
// post方式
const post = async (url, params) => {
    try {
        return await axios.post(url, params)
    } catch (error) {
        console.log(error)
    }
}

// 表格文件下载
const download = async (url, params) => {
    try {
        const res = await axios({
            method: 'post',
            url,
            data: qs.stringify(params),
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        if (res) {
            let fileName = res.headers['content-disposition'].split('filename=')[1]
            fileName = decodeURI(fileName)
            const blob = new Blob([res], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
            })
            if ('download' in document.createElement('a')) {
                const elink = document.createElement('a')
                const href = URL.createObjectURL(blob)
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = href
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(href)
                document.body.removeChild(elink)
            } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
            }
            return true
        } else {
            message.error('导出失败')
        }
    } catch (error) {
        console.log(error)
    }
}
export {
    post,
    get,
    del,
    download,
    put,
    upload,
    formData
}
