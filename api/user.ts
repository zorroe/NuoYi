import type { PageResponse, SystemUser, UserParams, BaseResponse } from "./types"


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
    }
}