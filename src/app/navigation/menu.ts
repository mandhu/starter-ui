export interface Menu {
    icon: string;
    link?: string;
    name: string;
    children?: Menu[];
    permissions?: string;
    parent?: boolean;
}
export const DEFAULT_MENU: Menu[] = [
    {
        icon: 'tachometer-alt',
        link: '/',
        name: 'Dashboard',
        children: []
    },
    {
        icon: 'file-invoice-dollar',
        link: '/sales',
        name: 'Sales',
        children: []
    },
    {
        icon: 'shield-check',
        link: '/',
        name: 'ACL',
        parent: true,
        permissions: null,
        children: [
            {
                icon: 'users-cog',
                link: '/',
                name: 'Manage',
                parent: true,
                children: [
                    {
                        icon: 'user-lock',
                        link: '/acl/permission-map',
                        name: 'Permission Map',
                        children: [],
                        permissions: 'permission_map'
                    },
                    {
                        icon: 'user-lock',
                        link: '/acl/role-map',
                        name: 'Role Map',
                        children: [],
                        permissions: 'role_map'
                    },
                    {
                        icon: 'user-lock',
                        link: '/acl/role-management',
                        name: 'Role Management',
                        children: [],
                        permissions: 'role_management'
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
            },
            {
                icon: 'lock-alt',
                link: '/acl/roles',
                name: 'Roles',
                children: [],
                permissions: 'roles',
                parent: false,
            },
        ],
    },
];
