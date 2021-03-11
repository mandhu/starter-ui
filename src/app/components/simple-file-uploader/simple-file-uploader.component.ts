import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttachableService } from '../../services/attachable.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-simple-file-uploader',
  templateUrl: './simple-file-uploader.component.html',
  styleUrls: ['./simple-file-uploader.component.styl']
})
export class SimpleFileUploaderComponent implements OnInit {
  selectedFile: any[] = [];
  @Input() title = 'Selected File(s)';
  @Input() count = true;
  @Input() url;
  @Input() uploading = false;
  @Output() fileChange = new EventEmitter();
  @Output() uploaded = new EventEmitter();
  maxFileSize = 2048000;

  constructor(private cd: ChangeDetectorRef,
              private sb: MatSnackBar,
              private uploadService: AttachableService) { }

  ngOnInit(): void {
  }

  onFilesAdded(ev): void {
    if (this.selectedFile.length > 0) {
      const newFiles = this.setPreviewUrl(Array.from(ev.target.files));
      for (const newFile of newFiles) {
        if (newFile.size <= this.maxFileSize) {
          this.selectedFile.push(newFile);
        } else {
          this.sb.open('Max file size is 2MB', 'OK', {duration: 2500});
        }
      }
    } else {
      const file = this.setPreviewUrl(Array.from(ev.target.files));
      console.log(file[0].size);
      if (file[0].size <= this.maxFileSize) {
        this.selectedFile = file;
      } else {
        this.sb.open('Max file size is 2MB', 'OK', {duration: 2500});
      }
    }
    this.emitChanges();
  }
  setPreviewUrl(files) {

    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // reader.onload = () => {
      //   file.src = reader.result;
      // };
      file.title = file.name;
    }
    return files;
  }

  contentChange(e, index) {
    if (e.target.innerHTML) {
      this.selectedFile[index].title = e.target.innerText;
    }
  }

  deleteFile(i: number) {
    this.selectedFile.splice(i, 1);
    this.emitChanges();
  }

  emitChanges() {
    this.fileChange.emit(this.selectedFile);
  }

  submit() {
    this.uploading = true;
    const formData: FormData = new FormData();
    this.selectedFile.forEach((file) => formData.append('files[]', file, file.title));

    this.uploadService.uploadFile(this.url, formData).subscribe(res => {
        this.selectedFile = [];
        this.uploaded.emit(res.data);
      },
      () => {},
      () => this.uploading = false);
  }
}
