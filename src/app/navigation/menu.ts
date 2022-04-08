export interface Menu {
    icon: string;
    link?: string;
    key?: string;
    name: string;
    children?: Menu[];
    permissions?: string;
    parent?: boolean;
    count?: number;
}
export const DEFAULT_MENU: Menu[] = [
    {
        icon: 'tachometer-alt',
        link: '/',
        name: 'Dashboard',
        key: 'dashboard',
        children: []
    },
    {
        icon: 'file-invoice-dollar',
        link: '/sales',
        name: 'Sales',
        key: 'sales',
        children: []
    },
    {
        icon: 'shield-check',
        link: '/acl/permission-map',
        name: 'ACL',
        parent: true,
        permissions: null,
        key: 'acl',
        children: [
            {
                icon: 'users-cog',
                link: '/',
                name: 'Manage',
                parent: true,
                key: 'acl_manage',
                children: [
                    {
                        icon: 'user-lock',
                        link: '/acl/permission-map',
                        name: 'Permission Map',
                        children: [],
                        permissions: 'permission_map',
                        key: 'acl_manage_permission_map'
                    },
                    {
                        icon: 'user-lock',
                        link: '/acl/role-map',
                        name: 'Role Map',
                        children: [],
                        permissions: 'role_map',
                        key: 'acl_manage_role_map'
                    },
                    {
                        icon: 'user-lock',
                        link: '/acl/role-management',
                        name: 'Role Management',
                        children: [],
                        permissions: 'role_management',
                        key: 'acl_manage_role_management'
                    },
                ],
                permissions: null
            },
            {
                icon: 'user-lock',
                link: '/acl/users',
                name: 'Users',
                children: [],
                permissions: 'users',
                parent: false,
                key: 'acl_users'
            },
            {
                icon: 'lock-alt',
                link: '/acl/roles',
                name: 'Roles',
                children: [],
                permissions: 'roles',
                parent: false,
                key: 'acl_roles',
            },
        ],
    },
];
