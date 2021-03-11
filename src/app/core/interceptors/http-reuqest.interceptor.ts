import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, tap} from 'rxjs/operators';
import {AppService} from '../services/app.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private appService: AppService,
                private router: Router,
                private snackBar: MatSnackBar) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Accept: 'application/json',
                Authorization: `${localStorage.getItem('token')}`
            }
        });

        this.appService.setLoading(true);

        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        this.appService.setLoading(false);
                    }
                }),
                catchError((err, caught) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            this.router.navigate(['/login']);
                            return EMPTY;
                        }
                        this.appService.setLoading(false);

                        this.snackBar.open(this.getErrorMessage(err), 'OK', {
                            duration: 3000
                        });
                        return throwError(err);
                    }
                    return EMPTY;
                })
            ) as any;
    }

    private getErrorMessage(err: HttpErrorResponse): string {
        return this.firstError(err.error.errors) || err.error.error || err.error.message || 'Unknown Server Error';
    }

    private firstError(err: HttpErrorResponse): string {
        try {
            return err[Object.keys(err)[0]];
        } catch (e) {
            return null;
        }
    }
}
