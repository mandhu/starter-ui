import {Injectable} from '@angular/core';
import {UserService} from '../modules/acl/roles/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private userService: UserService) {
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        return (localStorage.getItem('token') !== null) && (localStorage.getItem('token') !== 'null');
    }

    logout(): void {
        // localStorage.clear();
        localStorage.setItem('token', null);
        this.userService.clear();
    }
}
