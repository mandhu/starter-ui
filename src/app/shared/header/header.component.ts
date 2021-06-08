import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    @Input() back: boolean;
    @Input() backUrl: string;
    @Input() title: string;
    @Input() search: boolean;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }


    goBack() {
        if (this.backUrl) {
            this.router.navigateByUrl(this.backUrl);
        } else {
            window.history.back();
        }
    }


}
