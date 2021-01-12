import {Injectable} from '@angular/core';
import {NxDataService, NxResponse} from '../decorators/NxDataService';
import {HttpClient} from '@angular/common/http';
import {MakeParams} from './nx-http.service';

export interface TicketTaskService extends NxDataService<any> {
}

@Injectable({
    providedIn: 'root'
})
@NxDataService({
    url: '/api/task_allocations'
})
export class TicketTaskService {

    constructor(private http: HttpClient) {
    }

    ticketTask(params?) {
        return this.http.get<NxResponse>(`/api/task_allocations/ticket_tasks`, {
            params: MakeParams(params)
        });
    }
}
