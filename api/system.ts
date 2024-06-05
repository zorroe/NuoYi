import type { SystemUserResponse } from './types'

export default {
  normalDiasbleApi() {
    return useRequest<any>({
      url: '/system/dict/data/type/sys_normal_disable',
      method: 'GET',
    })
  },

  userSexApi() {
    return useRequest<any>({
      url: '/system/dict/data/type/sys_user_sex',
      method: 'GET',
    })
  },

  userApi() {
    return useRequest<SystemUserResponse>({
      url: '/system/user/',
      method: 'GET',
    })
  },
}
