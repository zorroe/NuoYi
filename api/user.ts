import type { PageResponse, SystemUser, UserParams } from "./types"


export default {
    systemUserListApi(params: UserParams) {
        return useRequest<PageResponse<SystemUser>>({
            url: '/system/user/list',
            method: 'GET',
            params,
        })
    },
}