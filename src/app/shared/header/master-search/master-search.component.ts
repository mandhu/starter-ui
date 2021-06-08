import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-master-search',
    templateUrl: './master-search.component.html',
    styleUrls: ['./master-search.component.scss']
})

export class MasterSearchComponent implements OnInit {

    searchCtrl: FormControl;
    @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

    isFocus = false;

    constructor(private router: Router,
                private fb: FormBuilder,
                private activatedRoute: ActivatedRoute) {
        this.searchCtrl = new FormControl('');
    }

    ngOnInit(): void {
        this.activatedRoute.queryParamMap.subscribe((params) => {
            if (params.has('search')) {
                this.searchCtrl.setValue(params.get('search'));
            }
        });
    }

    get searchValue(): string | null {
        return this.searchCtrl.value;
    }

    clear(): void {
        this.searchCtrl.setValue('');
        this.searchInput.nativeElement.focus();
        this.router.navigate([], {
            queryParams: {search: ''},
            relativeTo: this.activatedRoute
        });
    }

    submit(): void {
        this.router.navigate([], {
            queryParams: {search: this.searchCtrl.value},
            relativeTo: this.activatedRoute
        });
    }

}
