import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRevenueByMonthComponent } from './report-revenue-by-month.component';

describe('ReportRevenueByMonthComponent', () => {
  let component: ReportRevenueByMonthComponent;
  let fixture: ComponentFixture<ReportRevenueByMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRevenueByMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRevenueByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
