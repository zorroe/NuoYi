interface BaseResponse {
  code: number
  msg: string
}

interface CommonResponse extends BaseResponse {
  data: any
}

export default {
  getRouterApi() {
    return useRequest<CommonResponse>({
      url: '/getRouters',
      method: 'GET',
    })
  },
}
