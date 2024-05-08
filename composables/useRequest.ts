import { createFetch } from "@vueuse/core";

const fetch = createFetch({
    baseUrl: "http://110.42.210.221:8080",
    options: {
        async beforeFetch({ url, options, cancel }) {
            const token = localStorage.getItem('token')
            if (!token) {
                console.log('token不存在')
            }

            options.headers = {
                ...options.headers,
                // Authorization: `Bearer ${token}`,
            }

            return {
                options,
            }
        },

        async afterFetch({ response, data }) {
            if (data.code !== 200) {
                ElMessage.error(data.msg);
            }
            return data;
        },
    },
    fetchOptions: {
        mode: 'cors',
    },
})


export const useGet = (url: string, params?: any) => {
    const query = new URLSearchParams(params)
    url += `?${query}`
    return fetch(url, { method: 'GET' }).json()
}

export const usePost = (url: string, data: any) => {
    return fetch(url, { method: 'POST', body: data }).json()
}