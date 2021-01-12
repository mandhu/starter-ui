import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NxResponse} from '../decorators/NxDataService';
import {MakeParams} from './nx-http.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) {
    }

    dashboard(params = {}) {
        params = {
            ...params
        };
        return this.http.get<NxResponse>(`api/dashboard`, {
            params: MakeParams(params)
        });
    }

    requestTrends(params = {}) {
        params = {
            ...params
        };
        return this.http.get<NxResponse>(`api/dashboard/ticket_trends`, {
            params: MakeParams(params)
        });
    }

    assignedTasks(params = {}) {
        params = {
            ...params
        };
        return this.http.get<NxResponse>(`api/task/task_summary`, {
            params: MakeParams(params)
        });
    }

    allPendingTasks(params?) {
        return this.http.get<NxResponse>('/api/task_allocations', {
            params: MakeParams(params)
        });
    }

    overDueTasks(params = {}) {
        params = {
            ...params
        };
        return this.http.get<NxResponse>(`api/task/over_due_tasks`, {
            params: MakeParams(params)
        });
    }
}
