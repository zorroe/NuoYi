import type { BaseResponse, CommonResponse, DeptTree, PageResponse, SystemUser, SystemUserMore, UserParams } from './types'

interface PwdParams {
  userId: string
  password: string
}

export default {
  systemUserListApi(params: UserParams) {
    return useRequest<PageResponse<SystemUser>>({
      url: '/system/user/list',
      method: 'GET',
      params,
    })
  },

  getUserApi(id: string) {
    return useRequest<SystemUserMore>({
      url: `/system/user/${id}`,
      method: 'GET',
    })
  },

  deleteUserApi(id: string) {
    return useRequest<BaseResponse>({
      url: `/system/user/${id}`,
      method: 'DELETE',
    })
  },

  resetPwdApi(data: PwdParams) {
    return useRequest<BaseResponse>({
      url: `/system/user/resetPwd`,
      method: 'PUT',
      data,
    })
  },

  userDeptApi() {
    return useRequest<CommonResponse<DeptTree[]>>({
      url: '/system/user/deptTree',
      method: 'GET',
    })
  },

  addUserApi(data: any) {
    return useRequest<BaseResponse>({
      url: '/system/user',
      method: 'POST',
      data,
    })
  },

  updateUserApi(data: any) {
    return useRequest<BaseResponse>({
      url: '/system/user',
      method: 'PUT',
      data,
    })
  },
}
