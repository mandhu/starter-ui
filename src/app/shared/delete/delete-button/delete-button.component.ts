import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.styl']
})
export class DeleteButtonComponent implements OnInit {

    @Input() icon = true;
    @Input() iconOnly = false;
    @Input() id: number;
    @Input() api: string;
    @Input() title: string;
    @Input() description: string;
    @Output() deleted = new EventEmitter();


    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            data: {api: this.api, id: this.id, title: this.title, description: this.description}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.deleted.emit(result);
        });
    }

}
