import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_SLIDE_PANEL_DATA, MatSlidePanelRef} from 'ngx-mat-slide-panel';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NxForm} from '../../../../decorators/NxForm';
import {UserService} from '../../roles/user.service';
import {debounceTime, distinctUntilChanged, filter, startWith, switchMap} from 'rxjs/operators';

export interface UserFormComponent extends NxForm {
}

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.styl']
})
@NxForm({
    serviceName: 'userService',
    title: 'User',
})
export class UserFormComponent implements OnInit {
    filteredDepartment = [];

    constructor(@Inject(MAT_SLIDE_PANEL_DATA) public data,
                private fb: FormBuilder,
                private sb: MatSnackBar,
                private userService: UserService,
                private changeDeduction: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            mobile: [null, Validators.pattern('[0-9]*')],
            department: [null, Validators.required],
            department_id: [null, Validators.required],
            type: [null, Validators.required],
            id: [null]
        });

        if (this.data?.id) {
            this.form.addControl('id', new FormControl(this.data.id));
            this.form.patchValue(this.data);
        }
    }

}
