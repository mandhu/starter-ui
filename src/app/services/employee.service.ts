import {Injectable} from '@angular/core';
import {NxResponse} from '../decorators/NxDataService';
import {MakeParams} from './nx-http.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: HttpClient) {
    }

    employeeList(params?){
        return this.http.get<NxResponse>(`api/users/employee_list`, {
            params: MakeParams(params)
        });
    }
}
