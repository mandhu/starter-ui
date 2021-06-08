import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private userService: UserService,
        private dialogRef: MatDialogRef<PasswordResetComponent>,
        private fb: FormBuilder,
        private sb: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            id: this.data?.id,
            password: ['', Validators.required],
        });

    }

    submit(): void {
        this.userService.resetPassword(this.form.value).subscribe(res => {
            this.sb.open(res.message || 'Password changed', 'OK', {duration: 2500});
            this.dialogRef.close(res);
        }, err => {
            this.sb.open(err.error.message || 'Password changed', 'OK', {duration: 2500});

            // console.log(err);
        });
    }

}
