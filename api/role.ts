import type { RoleParams } from './types'

export default {
  systemRoleListApi(params: RoleParams) {
    return useRequest<any>({
      url: '/system/role/list',
      method: 'GET',
      params,
    })
  },
}
