import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvDropZoneComponent } from './csvdropzone.component';

describe('CsvDropZoneComponent', () => {
  let component: CsvDropZoneComponent;
  let fixture: ComponentFixture<CsvDropZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvDropZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvDropZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
