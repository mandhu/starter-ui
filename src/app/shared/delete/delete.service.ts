import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DeleteService {

    constructor(private http: HttpClient) { }

    delete(url, id): Observable<any> {
        return this.http.delete(`${url}/${id}`);
    }
}
