type Response = {
    url: string;
    body: any,
    status: number;
    type: string,
    statusText?: string;
    _data?: any;
    headers?: object,
    ok?: boolean,
    redirected?: boolean,
    bodyUsed?: boolean,
};

type ResponseData = {
    code: number,
    msg: string,
    data: object | object[]
}

export const useRequest = async (url: string, options: object) => {
    const runtimeConfig = useRuntimeConfig();
    const headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token') || null,
    };
    const defaultOptions: object = {
        //baseURL也可以在nuxt.config.ts中定义然后此处引入
        baseURL: runtimeConfig.public.baseUrl,
        headers,
        //响应拦截
        onResponse({ response }: { response: Response }) {
            const data = response._data;
            if (data.code !== 200) {
                ElMessage.error(data.msg);
            }
        },
    };
    const newOptions: object = { ...defaultOptions, ...options };
    const loadingInstance = ElLoading.service({ fullscreen: true });
    try {
        const { data, refresh } = await useFetch(url, newOptions);
        return { data, refresh };
    } catch {
        ElMessage.error('请求失败');
        return { data: null, refresh: () => { } }
    } finally {
        loadingInstance.close();
    }

};
