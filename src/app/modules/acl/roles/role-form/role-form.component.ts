import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SLIDE_PANEL_DATA, MatSlidePanelRef} from 'ngx-mat-slide-panel';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NxForm} from '../../../../decorators/NxForm';
import {RoleService} from '../role.service';
import {MatSnackBar} from '@angular/material/snack-bar';


export interface RoleFormComponent extends NxForm {
    test;
}


@Component({
    selector: 'app-role-form',
    templateUrl: './role-form.component.html',
    styleUrls: ['./role-form.component.scss']
})

@NxForm({
    serviceName: 'roleService',
    title: 'Role',
})

export class RoleFormComponent implements OnInit {

    form: FormGroup;

    constructor(
        @Inject(MAT_SLIDE_PANEL_DATA) public data,
        private roleService: RoleService,
        private panelRef: MatSlidePanelRef<RoleFormComponent>,
        private fb: FormBuilder,
        private sb: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            display_name: ['', Validators.required],
            description: null
        });

        if (this.data?.id) {
            this.form.addControl('id', new FormControl(this.data.id));
            this.form.patchValue(this.data);
        }
    }
}
