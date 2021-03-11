import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    alert(as: string) {
        alert(as);
    }
}
