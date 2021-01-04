import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSlidePanel } from 'ngx-mat-slide-panel';
import { RoleFormComponent } from './role-form/role-form.component';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.styl']
})
export class RolesComponent implements OnInit {
    displayedColumns: string[] = ['name', 'display_name', 'actions'];
    data = new MatTableDataSource([]);

    constructor(
        private roleService: RoleService,
        private panel: MatSlidePanel,
    ) { }

    ngOnInit(): void {
        this.roleService.list().subscribe(res => {
            this.data = res.data;
        });
    }

    addOrUpdate(data: any): void {
        this.panel.open(RoleFormComponent, {
            data,
        });
    }
}
