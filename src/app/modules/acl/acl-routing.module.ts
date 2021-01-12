import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolesComponent} from './roles/roles.component';
import {PermissionMapComponent} from './permission-map/permission-map.component';
import {RoleMapComponent} from './role-map/role-map.component';
import {RoleManagementComponent} from './role-management/role-management.component';
import {UserComponent} from './user/user.component';


const routes: Routes = [
    {
        path: 'roles',
        component: RolesComponent,
    },
    {
        path: 'permission-map',
        component: PermissionMapComponent,
    },
    {
        path: 'role-map',
        component: RoleMapComponent,
    },
    {
        path: 'role-management',
        component: RoleManagementComponent,
    },
    {
        path: 'users',
        component: UserComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AclRoutingModule {
}
