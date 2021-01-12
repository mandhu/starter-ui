import {Injectable} from '@angular/core';
import {NxDataService, NxResponse} from '../decorators/NxDataService';
import {HttpClient} from '@angular/common/http';
import {MakeParams} from './nx-http.service';

export interface CommentService extends NxDataService<any> {
}

@Injectable({
    providedIn: 'root'
})
@NxDataService({
    url: '/api/comments'
})
export class CommentService {

    constructor(private http: HttpClient) {
    }

    ticketComments(params?) {
        return this.http.get<NxResponse>(`/api/comments`, {
            params: MakeParams(params)
        });
    }
}
