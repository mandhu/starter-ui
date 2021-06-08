import {Component, OnInit} from '@angular/core';
import {RoleService} from './role.service';
import {MatSlidePanel} from 'ngx-mat-slide-panel';
import {RoleFormComponent} from './role-form/role-form.component';
import {NxBaseFunctions} from '../../../decorators/NxBaseFunctions';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface RolesComponent extends NxBaseFunctions {
    test;
}

@NxBaseFunctions({
    serviceName: 'roleService',
    title: 'Roles',
    formComponent: RoleFormComponent,
})

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
    displayedColumns: string[] = ['name', 'display_name', 'actions'];
    // data = new MatTableDataSource([]);

    constructor(
        private roleService: RoleService,
        private panel: MatSlidePanel,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private sb: MatSnackBar
    ) { }

    ngOnInit(): void {
        // this.roleService.list().subscribe(res => {
        //     this.data = res.data;
        // });
    }
}
