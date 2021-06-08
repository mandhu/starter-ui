import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_SLIDE_PANEL_DATA, MatSlidePanelRef} from 'ngx-mat-slide-panel';
import {RoleService} from '../../roles/role.service';

@Component({
    selector: 'app-role-users',
    templateUrl: './role-users.component.html',
    styleUrls: ['./role-users.component.scss']
})
export class RoleUsersComponent implements OnInit {

    users = [];
    filterUser = '';
    loading = true;

    constructor(
        @Inject(MAT_SLIDE_PANEL_DATA) public data,
        private panelRef: MatSlidePanelRef<RoleUsersComponent>,
        private roleService: RoleService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.roleService.getRoleUsers(this.data.id).subscribe(res => {
            this.users = res.data;
            this.loading = false;
            this.cd.detectChanges();
        });
    }

    close(): void {
        this.panelRef.dismiss();
    }
}
