import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTopPurchasedItemsComponent } from './report-top-purchased-items.component';

describe('ReportTopPurchasedItemsComponent', () => {
  let component: ReportTopPurchasedItemsComponent;
  let fixture: ComponentFixture<ReportTopPurchasedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTopPurchasedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTopPurchasedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
