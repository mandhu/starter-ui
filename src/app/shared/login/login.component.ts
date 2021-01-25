import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../modules/acl/roles/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  permissions;

  constructor(
    public userService: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
  }


  doLogin(): void {
    this.userService.login(this.loginForm.value).subscribe(res => {
      this.userService.setToken('Bearer ' + res['token']);
      this._router.navigate(['/']);

      // this.userService.checkUserRole().subscribe(response => {
      //   this.userService.userRole.next(response);
      // });

      this.userService.getUserSettings().subscribe(result => {
        this.userService.userprofile.next(result.data);
      });
    });


  }

}
