import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SLIDE_PANEL_DATA, MatSlidePanelRef } from 'ngx-mat-slide-panel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-role-form',
    templateUrl: './role-form.component.html',
    styleUrls: ['./role-form.component.styl']
})
export class RoleFormComponent implements OnInit {

    form: FormGroup;

    constructor(
        @Inject(MAT_SLIDE_PANEL_DATA) public data,
        private panelRef: MatSlidePanelRef<RoleFormComponent>,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
           name: ['', Validators.required],
           display_name: ['', Validators.required],
           description: null
        });
    }

    close(): void {
        this.panelRef.dismiss(false);
    }
}
