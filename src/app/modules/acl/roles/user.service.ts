import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NxDataService, NxResponse} from '../../../decorators/NxDataService';
import {MakeParams} from '../../../services/nx-http.service';
import {BehaviorSubject, Observable} from 'rxjs';

export interface UserI {
    _id: string;
    name: string;
    username: string;
    office?: string;
}

export interface UserService extends NxDataService<UserI> {
    test;

    setToken(s: string): void;

    // setToken(s: string): void;
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
    userRole = new BehaviorSubject(null);

    constructor(private http: HttpClient) {
    }

    clear() {
        this.userPermissions.next([]);
        this.userprofile.next(null);
        this.userRole.next(null);
    }

    login(data) {
        return this.http.post<NxResponse>('/api/users/authenticate', data);
    }

    register(data) {
        return this.http.post('/api/register', data);
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    employeeList(params?) {
        return this.http.get<NxResponse>(`api/users/employee_list`, {
            params: MakeParams(params)
        });
    }

    profile() {
        return this.http.get<NxResponse>(`api/users/user_info`);
    }

    menus() {
        return this.http.get<NxResponse>(`api/users/menus`);
    }

    checkUserRole(): Observable<any> {
        return this.http.get<NxResponse>('/api/users/get_user_role', {});
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

}
