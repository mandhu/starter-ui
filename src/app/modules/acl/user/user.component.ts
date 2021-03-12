import {Component, OnInit} from '@angular/core';
import {NxBaseFunctions} from '../../../decorators/NxBaseFunctions';
import {UserService} from './user.service';
import {MatSlidePanel} from 'ngx-mat-slide-panel';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserFormComponent} from './user-form/user-form.component';

export interface UserComponent extends NxBaseFunctions {
    test;
}


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.styl']
})
@NxBaseFunctions({
    serviceName: 'userService',
    title: 'Users',
    formComponent: UserFormComponent,
})
export class UserComponent implements OnInit {


    displayedColumns: string[] = [
        'name',
        'email',
        'actions'
    ];


    constructor(
        private userService: UserService,
        private panel: MatSlidePanel,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private sb: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
    }

}
