import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.styl']
})
export class SearchBarComponent implements OnInit {

    searchCtrl: FormControl;
    @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
    @Input() placeholder = 'Search';

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
