import {NgModule} from '@angular/core';
import {RolesComponent} from './roles/roles.component';
import {RoleFormComponent} from './roles/role-form/role-form.component';
import {AclRoutingModule} from './acl-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {PermissionMapComponent} from './permission-map/permission-map.component';
import {RoleMapComponent} from './role-map/role-map.component';
import {RoleManagementComponent} from './role-management/role-management.component';
import {RoleUsersComponent} from './role-management/role-users/role-users.component';
import {UserComponent} from './user/user.component';
import {UserFormComponent} from './user/user-form/user-form.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatTreeModule} from '@angular/material/tree';
import {MatRippleModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MaterialCommonModule} from '../../shared/MaterialCommonModule';
import {FormsModule} from '@angular/forms';
import {PasswordResetComponent} from './user/password-reset/password-reset.component';


@NgModule({
    declarations: [
        RolesComponent,
        RoleFormComponent,
        PermissionMapComponent,
        RoleMapComponent,
        RoleManagementComponent,
        RoleUsersComponent,
        UserComponent,
        UserFormComponent,
        PasswordResetComponent
    ],
    imports: [
        SharedModule,
        AclRoutingModule,
        MaterialCommonModule,
        ScrollingModule,
        MatTreeModule,
        MatRippleModule,
        MatListModule,
        FormsModule
    ]
})
export class AclModule {
}
