import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomerDistributionComponent } from './report-customer-distribution.component';

describe('ReportCustomerDistributionComponent', () => {
  let component: ReportCustomerDistributionComponent;
  let fixture: ComponentFixture<ReportCustomerDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCustomerDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCustomerDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
