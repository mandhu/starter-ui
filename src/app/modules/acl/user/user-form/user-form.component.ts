import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_SLIDE_PANEL_DATA, MatSlidePanelRef} from 'ngx-mat-slide-panel';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NxForm} from '../../../../decorators/NxForm';
import {UserService} from '../user.service';

export interface UserFormComponent extends NxForm {
    test;
}

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
@NxForm({
    serviceName: 'userService',
    title: 'User',
})
export class UserFormComponent implements OnInit {

    constructor(@Inject(MAT_SLIDE_PANEL_DATA) public data,
                private fb: FormBuilder,
                private panelRef: MatSlidePanelRef<UserFormComponent>,
                private sb: MatSnackBar,
                private userService: UserService,
                private changeDeduction: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
        });

        if (this.data?.id) {
            this.form.addControl('id', new FormControl(this.data.id));
            this.form.patchValue(this.data);
            this.form.get('password').clearValidators();
        }
    }

}
