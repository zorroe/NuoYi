interface PageParamsBase {
    pageNum: number,
    pageSize: number
}

export interface BaseResponse {
    code: number
    msg: string
}

export interface CommonResponse extends BaseResponse {
    data: any
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
    rows: T[],
    total: number
}

export interface UserParams extends PageParamsBase {
    userName?: string,
    phonenumber?: string,
    status?: string | number,
    params?: {
        beginTime?: string,
        endTime?: string,
    }
}


export interface SystemUser {
    createBy: string;
    createTime: string;
    updateBy?: any;
    updateTime?: any;
    remark: string;
    userId: string;
    deptId: number;
    userName: string;
    nickName: string;
    email: string;
    phonenumber: string;
    sex: string;
    avatar: string;
    password?: any;
    status: string;
    delFlag: string;
    loginIp: string;
    loginDate: string;
    dept: Dept;
    roles: any[];
    roleIds?: any;
    postIds?: any;
    roleId?: any;
    admin: boolean;
}

interface Dept {
    createBy?: any;
    createTime?: any;
    updateBy?: any;
    updateTime?: any;
    remark?: any;
    deptId: number;
    parentId?: any;
    ancestors?: any;
    deptName: string;
    orderNum?: any;
    leader: string;
    phone?: any;
    email?: any;
    status?: any;
    delFlag?: any;
    parentName?: any;
    children: any[];
}