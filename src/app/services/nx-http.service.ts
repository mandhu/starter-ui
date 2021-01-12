import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpParams,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class NxHttpService implements HttpInterceptor {

    constructor(private auth: AuthService,
                private router: Router,
                private snackBar: MatSnackBar) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `${this.auth.getToken()}`
            }
        });

        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        // this.store.dispatch(new HideLoader());
                    }
                }),
                catchError((err, caught) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            this.router.navigate(['/login']);
                            return EMPTY;
                        }
                        // this.store.dispatch(new HideLoader());

                        this.snackBar.open(this.getErrorMessage(err), 'OK', {
                            duration: 3000
                        });

                        return EMPTY;
                    }
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

export function MakeParams(data): HttpParams {
    let httpParams = new HttpParams();
    if (data) {
        Object.keys(data).forEach((key) => {
            httpParams = httpParams.append(key, data[key]);
        });
        return httpParams;
    }
}

