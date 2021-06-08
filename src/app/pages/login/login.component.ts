import { Component, OnInit } from '@angular/core';
import {UserService} from '../../modules/acl/user/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(
        public userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('admin@starter.com', Validators.required),
            password: new FormControl('password', Validators.required)
        });

        // localStorage.removeItem('token');
    }


    login(): void {
        this.userService.logout();
        this.userService.login(this.loginForm.value).subscribe(res => {
            // this.userService.setToken(res.data);
            this.userService.getSetting();
            this.router.navigate(['/']);

            // this.userService.checkUserRole().subscribe(response => {
            //   this.userService.userRole.next(response);
            // });

            // this.userService.getUserSettings().subscribe(result => {
            //     this.userService.userprofile.next(result.data);
            // });
        });


    }

}
