import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NxDataService} from '../../../decorators/NxDataService';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';


export interface UserService extends NxDataService<any> {
    test;
}

@Injectable({
    providedIn: 'root'
})

@NxDataService({
    url: '/api/users'
})

export class UserService {
    userPermissions = new BehaviorSubject([]);
    userprofile = new BehaviorSubject(null);
    user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    token = null;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    clear(): void {
        this.userPermissions.next([]);
        this.userprofile.next(null);
    }

    login(data): Observable<any> {
        return this.http.post<any>('/api/login', data);
    }

    logout(): void {
        this.user.next(null);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    setToken(token: string): void {
        this.token = token;
        localStorage.setItem('token', token);
    }

    changePassword(data: any): Observable<any> {
        return this.http.post('/api/users/change_password', data);
    }

    register(data): Observable<any> {
        return this.http.post('/api/register', data);
    }

    getUserRoles(userId: number): Observable<any> {
        return this.http.get(`/api/users/get_user_roles/${userId}`);
    }

    toggleUserRole(userId: number, roleId: number): Observable<any> {
        return this.http.get(`/api/users/toggle_user_role/${userId}/${roleId}`);
    }

    toggleUserAction(userId: number, actionId: number): Observable<any> {
        return this.http.get(`/api/users/toggle_user_action/${userId}/${actionId}`);
    }

    toggleUserAllAction(userId: number, actionId: number, checked: boolean): Observable<any> {
        return this.http.get(`/api/users/toggle_user_all_action/${userId}/${actionId}?checked=${checked ? 1 : 0}`);
    }

    getByNid(nid): Observable<any> {
        return this.http.get<any>('/api/users/get_by_nid', {params: {nid}});
    }

    getSetting(): void {
        if (!this.user.value) {
            this.http.get('/api/users/settings').subscribe((res: any) => {
                this.user.next(res.data.user);
            }, error => {});
        }
    }

}