interface BaseResponse {
  code: number
  msg: string
}

interface CommonResponse extends BaseResponse {
  data: any
}

interface CaptchaResponse extends BaseResponse {
  img: string
  uuid: string
  captchaEnabled: boolean
}

interface LoginResponse extends BaseResponse {
  token: string
}

interface InfoResponse extends BaseResponse {
  permissions: string[]
  roles: string[]
  user: any
}

export default {
  captchaApi() {
    return useRequest<CaptchaResponse>({
      url: '/captchaImage',
    })
  },

  loginApi(data: any) {
    return useRequest<LoginResponse>({
      url: '/login',
      method: 'POST',
      data,
    })
  },

  getInfoApi() {
    return useRequest<InfoResponse>({
      url: '/getInfo',
      method: 'GET',
    })
  },

  logoutApi() {
    return useRequest<BaseResponse>({
      url: '/logout',
      method: 'POST',
    })
  },

  getRouterApi() {
    return useRequest<CommonResponse>({
      url: '/getRouters',
      method: 'GET',
    })
  }
}