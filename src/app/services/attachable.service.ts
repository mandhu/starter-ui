import { Injectable } from '@angular/core';
import { NxDataService, NxResponse } from '../decorators/NxDataService';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {environment} from '../../environments/environment';

export interface AttachableService extends NxDataService<any> {
    getDocumentsByEmployee(id: number): any;
    upload( files: any, data ): { [key: string]: { progress: Observable<number> } };

    uploadFile(url: string, formData: FormData): Observable<any>;
}

@Injectable({
    providedIn: 'root'
})

@NxDataService({
    url: `/api/attachables`
})

export class AttachableService {

    constructor(public http: HttpClient) {
    }

    public getDocumentsByEmployee(id: number | string): Observable<NxResponse> {
        return this.http.get<NxResponse>(`/api/attachables/employee/${id}/documents`);
    }

    public upload( files: any, data ): { [key: string]: { progress: Observable<number> } } {
        // this will be the our resulting map
        const status: { [key: string]: { progress: Observable<number> } } = {};

        files.forEach(file => {
            // console.log(file);
            // create a new multipart-form for every file
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);
            formData.append('title', file.title);
            formData.append('attachable_id', data.id);
            formData.append('attachable_type', data.type);
            if (data.attachment_type) {
                formData.append('attachment_type', data.attachment_type);
            }


            // create a new progress-subject for every file
            const progress = new Subject<number>();

            // send the http-request and subscribe for progress-updates

            this.http.post(`/api/attachables`, formData, {
                reportProgress: true,
                observe: 'events'
            }).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    // calculate the progress percentage

                    const percentDone = Math.round((100 * event.loaded) / event.total);
                    // pass the percentage into the progress-stream
                    progress.next(percentDone);
                } else if (event instanceof HttpResponse) {
                    // Close the progress-stream if we get an answer form the API
                    // The upload is complete
                    progress.complete();
                }
            });

            // Save every progress-observable in a map of all observables
            status[file.name] = {
                progress: progress.asObservable()
            };
        });

        // return the map of progress.observables
        return status;
    }

    uploadFile(url, formData: FormData): Observable<any> {
        return this.http.post(url, formData);
    }
}

