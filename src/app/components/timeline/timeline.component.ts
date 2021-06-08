import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    providers: [DatePipe]
})
export class TimelineComponent implements OnInit {
    @Input() active: boolean;
    @Input() last: boolean;
    @Input() status: 'approved' | 'rejected' | 'pending';
    @Input() edit = false;
    @Input() title: string;
    @Input() data: any;
    @Input() description: string;
    @Input() caption: string | boolean;
    @Output() edited = new EventEmitter();

    constructor(private datePipe: DatePipe) { }

    ngOnInit(): void {
        if (!this.description && this.data) {
            if (this.data.status === 'pending' && this.data.is_active) {
                this.description = 'Waiting for approval';
            }

            if (this.data.status === 'pending' && !this.data.is_active) {
                this.description = `Waiting for level ${this.data.level - 1} approval`;
            }

            if (this.data.status === 'approved') {
                this.description = `Approved on ${this.datePipe.transform(this.data.updated_at, 'medium')}`;
            }

            if (this.data.status === 'rejected') {
                this.description = `Rejected on ${this.datePipe.transform(this.data.updated_at, 'medium')}`;
            }
        }
    }

}
