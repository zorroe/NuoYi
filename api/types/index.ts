interface PageParamsBase {
  pageNum: number
  pageSize: number
}

export interface BaseResponse {
  code: number
  msg: string
}

export interface CommonResponse<T> extends BaseResponse {
  data: T
}

export interface CaptchaResponse extends BaseResponse {
  img: string
  uuid: string
  captchaEnabled: boolean
}

export interface LoginResponse extends BaseResponse {
  token: string
}

export interface InfoResponse extends BaseResponse {
  permissions: string[]
  roles: string[]
  user: any
}

export interface PageResponse<T> extends BaseResponse {
  rows: T[]
  total: number
}

export interface UserParams extends PageParamsBase {
  userName?: string
  phonenumber?: string
  status?: string | number
  deptId?: string | number
  params?: {
    beginTime?: string
    endTime?: string
  }
}

export interface SystemUser {
  createBy: string
  createTime: string
  updateBy?: any
  updateTime?: any
  remark: string
  userId: string
  deptId: number
  userName: string
  nickName: string
  email: string
  phonenumber: string
  sex: string
  avatar: string
  password?: any
  status: string
  delFlag: string
  loginIp: string
  loginDate: string
  dept: Dept
  roles: any[]
  roleIds?: any
  postIds?: any
  roleId?: any
  admin: boolean
}

export interface SystemUserMore extends CommonResponse<SystemUser> {
  postIds: string[]
  posts: Post[]
  roleIds: string[]
  roles: Role[]
}

interface Dept {
  createBy?: any
  createTime?: any
  updateBy?: any
  updateTime?: any
  remark?: any
  deptId: number
  parentId?: any
  ancestors?: any
  deptName: string
  orderNum?: any
  leader: string
  phone?: any
  email?: any
  status?: any
  delFlag?: any
  parentName?: any
  children: any[]
}

export interface DeptTree {
  id: string
  label: string
  children?: DeptTree[]
}

export interface Role {
  createBy?: any
  createTime: string
  updateBy?: any
  updateTime?: any
  remark?: any
  roleId: number
  roleName: string
  roleKey: string
  roleSort: number
  dataScope: string
  menuCheckStrictly: boolean
  deptCheckStrictly: boolean
  status: number
  delFlag: string
  flag: boolean
  menuIds?: any
  deptIds?: any
  permissions?: any
  admin: boolean
}

export interface Post {
  createBy: string
  createTime: string
  updateBy?: any
  updateTime?: any
  remark: string
  postId: number
  postCode: string
  postName: string
  postSort: number
  status: number
  flag: boolean
}

export interface SystemUserResponse extends BaseResponse {
  roles: Role[]
  posts: Post[]
}
