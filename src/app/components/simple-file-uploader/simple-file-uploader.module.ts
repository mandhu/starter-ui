import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleFileUploaderComponent } from './simple-file-uploader.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {FileViewDirective} from './file-view.directive';



@NgModule({
  declarations: [
      SimpleFileUploaderComponent,
      FileViewDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    SimpleFileUploaderComponent,
      FileViewDirective
  ]
})
export class SimpleFileUploaderModule { }
