import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.styl']
})
export class ConfirmComponent implements OnInit {
    dialogData = {
        title: 'Confirm!',
        message: 'Are you sure? You want do this'
    };
    constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, ) { }

    ngOnInit(): void {
        this.dialogData = {
            ...this.data
        };
    }

    action(status: boolean): void {
        this.dialogRef.close(status);
    }

}
