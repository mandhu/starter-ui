import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-key-value',
    templateUrl: './key-value.component.html',
    styleUrls: ['./key-value.component.styl']
})
export class KeyValueComponent implements OnInit {

    @Input() key: string;

    constructor() { }

    ngOnInit(): void {
    }

}
