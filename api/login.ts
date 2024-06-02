import type { CaptchaResponse, LoginResponse, InfoResponse, BaseResponse } from "./types";

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
  }
}