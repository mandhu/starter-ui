import { AfterContentInit, Component, ContentChildren, HostBinding, Input, OnInit, QueryList } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { CollapseItemDirective } from './collapse-item.directive';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-collapse-item',
    templateUrl: './collapse-item.component.html',
    styleUrls: ['./collapse-item.component.styl']
})
export class CollapseItemComponent implements AfterContentInit {
    @HostBinding('style.height') public height: SafeStyle = '45px';
    @ContentChildren(CollapseItemDirective) item: QueryList<CollapseItemDirective>;
    @Input() icon = 'menu';
    @Input() title = 'Menu';
    @Input() url = '';
    @Input() key = '';

    expanded = false;
    expandHeight = 'auto';

    constructor(private router: ActivatedRoute) { }

    ngAfterContentInit(): void {
        this.expandHeight = `${(this.item.length * 40 + 48)}px`;
        // const urls = this.url.split('/');
        //
        // if (urls.length > 2) {
        //     if (urls[2] === this.key) {
        //         this.height = this.expandHeight;
        //         this.expanded = true;
        //     }
        // }
    }

    toggle(): void {
        this.height = !this.expanded ? this.expandHeight : '48px';
        this.expanded = !this.expanded;
    }

}
