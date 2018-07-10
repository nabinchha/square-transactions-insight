import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomerRetentionComponent } from './report-customer-retention.component';

describe('ReportCustomerRetentionComponent', () => {
  let component: ReportCustomerRetentionComponent;
  let fixture: ComponentFixture<ReportCustomerRetentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCustomerRetentionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCustomerRetentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
