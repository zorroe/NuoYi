import type { BaseResponse, RoleParams } from './types'

export default {
  systemRoleListApi(params: RoleParams) {
    return useRequest<any>({
      url: '/system/role/list',
      method: 'GET',
      params,
    })
  },

  roleChangeStatusApi(data: any) {
    return useRequest<BaseResponse>({
      url: '/system/role/changeStatus',
      method: 'PUT',
      data,
    })
  },

  deleteSystemRoleApi(id: string) {
    return useRequest<BaseResponse>({
      url: `/system/role/${id}`,
      method: 'DELETE',
    })
  },
}
