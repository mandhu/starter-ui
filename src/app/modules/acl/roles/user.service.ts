import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NxDataService, NxResponse } from '../../../decorators/NxDataService';
import { BehaviorSubject, Observable } from 'rxjs';


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

    constructor(private http: HttpClient) {
    }

    clear(): void {
        this.userPermissions.next([]);
        this.userprofile.next(null);
    }

    login(data): Observable<any> {
        return this.http.post<any>('/api/login', data);
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    register(data): Observable<any> {
        return this.http.post('/api/register', data);
    }

    getUserRoles(userId: number): Observable<any> {
        return this.http.get(`/api/users/get_user_roles/${userId}`);
    }

    getUserSettings() {
        return this.http.get<NxResponse>(`api/users/settings`);
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
