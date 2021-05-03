import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';

@Directive({
  selector: '[appConfirm]'
})
export class ConfirmDirective {
    @Input() title = 'Confirm';
    @Input() message = 'You won\'t be able to revert this!. Are you sure?';
    @Output() confirmed = new EventEmitter();
    @HostListener('click', ['$event'])
    onClick(): void {
        this.openDialog();
    }

    constructor(public dialog: MatDialog) {
    }

    openDialog(): void {
        this.dialog.open(ConfirmDialogComponent, {
            width: '500px',
            data: {title: this.title, message: this.message}
        }).afterClosed().subscribe(result => {
            this.confirmed.emit(result);
        });
    }

}
