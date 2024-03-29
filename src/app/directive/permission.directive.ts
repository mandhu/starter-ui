import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from '../modules/acl/user/user.service';

@Directive({
    // tslint:disable-next-line:directive-selector
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

    getPermissions(permission: string): void {
        this.userService.userPermissions.subscribe(allPermissions => {
            if (allPermissions.some(perm => perm.name === permission)) {
                if (!this.vcRef.length) {
                    this.vcRef.createEmbeddedView(this.tempRef);
                }
            }
        });
    }

}
