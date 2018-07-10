import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTopCustomersComponent } from './report-top-customers.component';

describe('ReportTopCustomersComponent', () => {
  let component: ReportTopCustomersComponent;
  let fixture: ComponentFixture<ReportTopCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTopCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTopCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
