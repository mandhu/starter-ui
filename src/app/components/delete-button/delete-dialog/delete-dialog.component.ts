import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DeleteService } from '../delete.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.styl']
})
export class DeleteDialogComponent implements OnInit {

    form: FormGroup;
    constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private http: HttpClient,
                private sb: MatSnackBar,
                private service: DeleteService) {
    }

    ngOnInit(): void {
    }

    submit(): void {
        this.service.delete(this.data.api).subscribe(res => {
            this.dialogRef.close(res);
            this.sb.open(res.message || 'Deleted', 'OK');
        });
    }

}
