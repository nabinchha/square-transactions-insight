import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomerDetailComponent } from './report-customer-detail.component';

describe('ReportCustomerDetailComponent', () => {
  let component: ReportCustomerDetailComponent;
  let fixture: ComponentFixture<ReportCustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCustomerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
