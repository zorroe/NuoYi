type ResponseData = {
    code: number,
    msg: string,
    data: object | object[]
}

export const useRequest = async (url: string, options: object) => {
    const headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token') || null,
    };
    const defaultOptions: object = {
        //baseURL也可以在nuxt.config.ts中定义然后此处引入
        baseURL: "http://example.com",
        headers,
        //响应拦截
        onResponse({ response }: { response: ResponseData }) {
            console.log("response", response);
            const res = response.data;
            if (response.code !== 200) {
                ElMessage.error(response.msg);
            }
        },
    };
    const newOptions: object = { ...defaultOptions, ...options };
    const loadingInstance = ElLoading.service({ fullscreen: false });
    const { data, pending, refresh } = await useFetch(url, newOptions);
    if (!pending.value) {
        loadingInstance.close();
    }
    return { data, refresh };
};
