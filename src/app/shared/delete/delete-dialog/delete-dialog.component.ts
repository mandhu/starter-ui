import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DeleteService } from '../delete.service';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.styl']
})
export class DeleteDialogComponent implements OnInit {

    form: FormGroup;
    dialogData = {
        title: 'Delete',
        message: 'You won\'t be able to revert this!. Are you sure?'
    };

    constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private http: HttpClient,
                private service: DeleteService) {

        this.dialogData = { ...this.dialogData, ...this.data };

    }

    ngOnInit(): void {
    }

    submit(): void {
        this.service.delete(this.data.api, +this.data.id).subscribe(res => {
            this.dialogRef.close(res);
        });
    }

}
