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
  }
}