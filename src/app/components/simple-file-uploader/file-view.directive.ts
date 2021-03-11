import {Directive, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[appFileView]'
})
export class FileViewDirective {
    endPoint = '/api/vessel_profiles/view_certificate/';
    @Input() set fileViewUrl(url: string) {
        this.endPoint = url;
    }
    @Input() fileViewData: any;
    @HostListener('click', ['$event']) onClick($event): void {
        this.openFile();
    }

    constructor() {}

    openFile(): void {
        console.log(this.fileViewData);

        const width = window.innerWidth / 1.5;
        const height = window.innerHeight / 1.5;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const params = `scrollbars=no,resizable=no,status=nolocation=0toolbar=no,menubar=no,width=${width},height=${height},top=${top},left=${left}`;

        window.open(`${this.endPoint}/${this.fileViewData.id}/${this.fileViewData.uuid}//?token=${localStorage.getItem('token')}`, this.fileViewData.name, params);
    }

}
