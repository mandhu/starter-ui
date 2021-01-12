import {Injectable} from '@angular/core';
import {NxDataService} from '../../../decorators/NxDataService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface RoleService extends NxDataService<any> {
    test;
}


@Injectable({
    providedIn: 'root'
})

@NxDataService({
    url: '/api/roles'
})

export class RoleService {
    constructor(private http: HttpClient) {
    }

    menus(): Observable<any> {
        return this.http.get('/api/roles/menus');
    }

    menuAndActions(id: number): Observable<any> {
        return this.http.get(`/api/roles/menu_and_actions/${id}`);
    }

    toggleMenu(data: { role_id: number, permission_id: number }): Observable <any> {
        return this.http.post('/api/roles/toggle_menu', data);
    }

    getUserRoles(userId: number): Observable<any> {
        return this.http.get(`/api/roles/user_roles/${userId}`);
    }

    getRoleUsers(roleId: number): Observable<any> {
        return this.http.get(`/api/roles/${roleId}/users`);
    }
}


