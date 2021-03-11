import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleFileUploaderComponent } from './simple-file-uploader.component';

describe('SimpleFileUploaderComponent', () => {
  let component: SimpleFileUploaderComponent;
  let fixture: ComponentFixture<SimpleFileUploaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleFileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
