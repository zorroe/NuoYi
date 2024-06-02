import { getToken, setToken } from "~/utils/auth"
import { tansParams } from "~/utils/nuoyi"

interface RequestOption {
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    params?: any,
    data?: any,
}

interface ResponseData {
    code: number,
    msg: string,
    data: any,
}

const url_prefix = process.env.URL_PREFIX || '/prod-api'

export const isRelogin = { show: false }

export const useRequest = function <T = ResponseData>(options: RequestOption) {
    // 发送请求
    if (!options.method) {
        options.method = 'GET'
    }
    if (options.method === 'GET') {
        options.params = { ...options.params, timestamp: new Date().getTime() }
        options.params = tansParams(options.params)
    }
    const url = url_prefix + options.url
    return $fetch<T>(url, {
        method: options.method,
        params: options.params,
        body: options.data,
        onRequest({ request, options }) {
            options.headers = options.headers || {}
            const token = getToken()
            options.headers = {
                ...options.headers,
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        },
        onRequestError({ request, options, error }) {

        },
        onResponse({ request, response, options }) {
            if (response._data.token) {
                setToken(response._data.token)
            }
            if (response._data.code !== 200) {
                if (response._data.code === 401) {
                    navigateTo('/login')
                }
                ElMessage.error(response._data.msg)
            }
        },
        onResponseError({ request, response, options }) {
            ElMessage.error(response.statusText)
        }
    })
}