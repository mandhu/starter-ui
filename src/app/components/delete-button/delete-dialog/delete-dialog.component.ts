import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DeleteService } from '../delete.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

    form: FormGroup;
    remarks = false;
    remarkControl = new FormControl('', [Validators.required]);
    remarkPlaceholder = 'Enter cancellation remarks';

    constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private http: HttpClient,
                private sb: MatSnackBar,
                private service: DeleteService
            ) {
        this.remarks = data.remarks;
    }

    ngOnInit(): void {
    }

    submit(): void {
        this.service.delete(this.data.api, this.remarkControl.value).subscribe(res => {
            this.dialogRef.close(res);
            this.sb.open(res.message || 'Deleted', 'OK');
        });
    }

}
