import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-confirm-button',
    templateUrl: './confirm-button.component.html',
    styleUrls: ['./confirm-button.component.styl']
})
export class ConfirmButtonComponent implements OnInit {
    @Input() btnClass = 'btn';
    @Input() title = 'Confirm';
    @Input() message = 'You won\'t be able to revert this!. Are you sure?';
    @Output() confirmed = new EventEmitter();

    constructor(
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
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
