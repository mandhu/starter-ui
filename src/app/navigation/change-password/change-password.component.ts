import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../modules/acl/user/user.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.styl']
})
export class ChangePasswordComponent implements OnInit {

    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService,
        private dialogRef: MatDialogRef<ChangePasswordComponent>,
        private fb: FormBuilder,
        private sb: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            password: ['', Validators.required],
            old_password: ['', Validators.required],
        });

    }

    submit(): void {
        this.userService.changePassword(this.form.value).subscribe(res => {
            this.sb.open(res.message || 'Password changed', 'OK', {duration: 2500});
            this.dialogRef.close(res);
        }, err => {
            // console.log(err);
        });
    }
}
