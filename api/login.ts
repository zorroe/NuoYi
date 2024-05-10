interface CaptchaResponse {
    code: number
    img: string
    uuid: string
    captchaEnabled: boolean
    msg: string
  }

export default {
    captchaApi() {
        return useRequest<CaptchaResponse>({
            url: '/captchaImage',
          })
    }
}