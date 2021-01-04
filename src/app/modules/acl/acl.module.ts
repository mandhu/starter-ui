import { NgModule } from '@angular/core';
import { RolesComponent } from './roles/roles.component';
import { RoleFormComponent } from './roles/role-form/role-form.component';
import { AclRoutingModule } from './acl-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
    declarations: [
        RolesComponent,
        RoleFormComponent
    ],
    imports: [
        SharedModule,
        AclRoutingModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class AclModule { }
