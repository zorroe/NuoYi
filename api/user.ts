import type { PageResponse, SystemUser, UserParams, BaseResponse, CommonResponse, DeptTree } from "./types"

interface PwdParams {
    userId: string,
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
    }
}