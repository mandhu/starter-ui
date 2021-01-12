import { Injectable } from '@angular/core';
import {NxDataService} from '../../../decorators/NxDataService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface PermissionMapService extends NxDataService<any> {
    test;
}


@Injectable({
  providedIn: 'root'
})

@NxDataService({
    url: '/api/actions'
})

export class PermissionMapService {
    constructor(private http: HttpClient) {
    }

    mappedPermissions(actionId: number): Observable<any> {
        return this.http.get(`/api/actions/mapped_permissions/${actionId}`);
    }

    mapPermission(data: { action_id: number, permission_id: number }): Observable <any> {
        return this.http.post('/api/actions/map_permission', data);
    }

    permissions(): Observable < any > {
        return this.http.get('/api/actions/permissions?all=true');
    }

    toggleRoleAction(roleId: number, actionId: number): Observable<any> {
        return this.http.get(`/api/actions/toggle_role_action/${roleId}/${actionId}`);
    }
    toggleRoleAllAction(roleId: number, actionId: number, checked: boolean): Observable<any> {
        return this.http.get(`/api/actions/toggle_role_all_action/${roleId}/${actionId}?checked=${checked ? 1 : 0}`);
    }
}


