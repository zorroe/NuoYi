import type { BaseResponse, DeptListParams } from './types'

interface Dept {
  createBy: string
  createTime: string
  updateBy?: any
  updateTime?: any
  remark?: any
  deptId: number
  parentId: number
  ancestors: string
  deptName: string
  orderNum: number
  leader: string
  phone: string
  email: string
  status: string
  delFlag: string
  parentName?: any
  children: any[]
}

interface DeptListResponse extends BaseResponse {
  data: Dept[]
}
export default {
  deptListApi(params: DeptListParams) {
    return useRequest<DeptListResponse>({
      url: '/system/dept/list',
      method: 'GET',
      params,
    })
  },

  deptDeleteApi(deptId: number | string) {
    return useRequest<BaseResponse>({
      url: `/system/dept/${deptId}`,
      method: 'DELETE',
    })
  },
}
