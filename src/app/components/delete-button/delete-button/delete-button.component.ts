import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {

    @Input() btnClass = 'btn';
    @Input() icon = true;
    @Input() button = false;
    @Input() menuItem = false;
    @Input() api: string;
    @Input() title = 'Delete';
    @Input() description = 'You won\'t be able to revert this!. Are you sure?';
    @Output() deleted = new EventEmitter();


    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            data: {api: this.api, title: this.title, description: this.description}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.deleted.emit(result);
        });
    }

}
