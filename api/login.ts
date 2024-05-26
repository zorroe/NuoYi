interface CommonResponse {
  code: number
  msg: string
  data: any
}

interface CaptchaResponse {
  code: number
  img: string
  uuid: string
  captchaEnabled: boolean
  msg: string
}

interface LoginResponse {
  code: number,
  msg: string,
  token: string
}

interface InfoResponse {
  code: number
  msg: string
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

  getRouterApi() {
    return useRequest<CommonResponse>({
      url: '/getRouters',
      method: 'GET',
    })
  }
}