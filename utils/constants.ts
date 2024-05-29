
// @unocss-include
export const constantRoutes = [
    {
        path: '/system',
        name: 'System',
        meta: {
            title: '系统管理',
            icon: 'i-material-symbols:settings-applications-outline-rounded'
        },
        hidden: false,
        children: [
            {
                path: '/system/user',
                name: 'User',
                meta: {
                    title: '用户管理',
                    icon: 'i-material-symbols:person-2-outline-rounded'
                },
                hidden: false,
                children: [
                    {
                        path: '/system/user/add',
                        name: 'AddUser',
                        meta: {
                            title: '新增用户',
                            icon: 'i-material-symbols:person-add-outline-rounded'
                        },
                        hidden: false,
                    },
                    {
                        path: '/system/user/edit',
                        name: 'EditUser',
                        meta: {
                            title: '编辑用户',
                            icon: 'i-material-symbols:edit-document-outline-rounded'
                        },
                        hidden: false,
                    }
                ]
            },
            {
                path: '/system/role',
                name: 'Role',
                meta: {
                    title: '角色管理',
                    icon: 'i-material-symbols:person-check-outline-rounded'
                },
                hidden: false,
            },
            {
                path: '/system/menu',
                name: 'Menu',
                meta: {
                    title: '菜单管理',
                    icon: 'i-material-symbols:menu-open-rounded'
                },
                hidden: false,
            },
            {
                path: '/system/dept',
                name: 'Dept',
                meta: {
                    title: '部门管理',
                    icon: 'i-material-symbols:account-tree-outline-rounded'
                },
                hidden: false,
            }
        ]
    }
]