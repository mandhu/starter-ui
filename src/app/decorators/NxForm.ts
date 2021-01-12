import {catchError} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';

export interface NxForm {
    form: FormGroup;
    errorMatcher;
    close: () => void;
    submit: () => void;
}

export function NxForm({serviceName, title}): any {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        const original = target.prototype.ngOnInit;
        target.prototype.form = null;
        target.prototype.title = title;
        target.prototype.errorMatcher = null;

        target.prototype.close = function(): void {
            this.panelRef.dismiss(null);
        };

        target.prototype.submit = function(): void {
            if (this.form.value.id) {
                this[serviceName].update(this.form.value).pipe(
                    catchError(handleError.bind(this))
                ).subscribe(handleResponse.bind(this), handleError.bind(this));
            } else {
                this[serviceName].add(this.form.value).pipe(
                    catchError(handleError.bind(this))
                ).subscribe(handleResponse.bind(this), handleError.bind(this));
            }
        };

        function handleResponse(res): void {
            this.sb.open(res.message, 'OK', {duration: 600});
            this.panelRef.dismiss({updated: true, data: res.data});
        }

        function handleError(err): void {
            this.sb.open(`Failed to Update ${title}`, 'OK');
        }

        function getDirtyState(form: FormGroup): Object {
            return Object.keys(form.controls).reduce<Object>((dirtyState, controlKey) => {
                const control = form.controls[controlKey];

                if (!control.dirty) {
                    return dirtyState;
                }

                if (control instanceof FormGroup) {
                    return {
                        ...dirtyState,
                        [controlKey]: getDirtyState(control),
                    };
                }

                return {
                    ...dirtyState,
                    [controlKey]: control.value,
                };
            }, {});
        }

        return target;
    };
}
