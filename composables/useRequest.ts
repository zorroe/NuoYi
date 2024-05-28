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
    const url = url_prefix + options.url
    return $fetch<T>(url, {
        method: options.method,
        params: options.params,
        body: options.data,
        onRequest({ request, options }) {
            options.headers = options.headers || {}
            const token = localStorage.getItem('token')
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
                localStorage.setItem('token', response._data.token)
            }
            if (response._data.code !== 200) {
                ElMessage.error(response._data.msg)
            }
        },
        onResponseError({ request, response, options }) {
            ElMessage.error(response.statusText)
        }
    })
}