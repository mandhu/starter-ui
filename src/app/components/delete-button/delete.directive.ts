import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
    @Input() remarks = false;
    @Input() api: string;
    @Input() title = 'Delete';
    @Input() description = 'You won\'t be able to revert this!. Are you sure?';
    @Output() deleted = new EventEmitter();

    @HostListener('click', ['$event'])
    onClick(): void {
        this.openDialog();
    }

    constructor(public dialog: MatDialog) {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            data: {api: this.api, title: this.title, description: this.description, remarks: this.remarks}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.deleted.emit(result);
        });
    }

}
