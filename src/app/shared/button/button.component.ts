import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.styl']
})
export class ButtonComponent implements OnInit {

  @Input() text = 'Sample Button';
  @Input() size = 'normal';
  @Input() type = 'primary';
  @Input() icon = '';
  @Input() rounded = false;



  constructor() { }

  ngOnInit(): void {
  }

}
