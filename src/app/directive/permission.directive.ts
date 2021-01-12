import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from '../modules/acl/roles/user.service';

@Directive({
    selector: '[permission]'
})
export class PermissionDirective {

    constructor(
        private tempRef: TemplateRef<any>,
        private vcRef: ViewContainerRef,
        private userService: UserService) {
    }

    @Input() set permission(permission: string) {
        this.getPermissions(permission);
    }

    getPermissions(permission) {
        this.userService.userPermissions.subscribe(allPermissions => {
            if (allPermissions.some(perm => perm.name === permission)) {
                if (!this.vcRef.length) {
                    this.vcRef.createEmbeddedView(this.tempRef);
                }
            }
        });
    }

}
