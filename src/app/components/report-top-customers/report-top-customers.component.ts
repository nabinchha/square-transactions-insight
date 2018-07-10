import { Component, OnInit, OnDestroy } from '@angular/core';

import {Router} from '@angular/router';

import { SquareCustomerModel } from '../../models/square-customer.model';
import { TopCustomerReportTypeEnum } from '../../enums/top-customer-report-type.enum';
import { BaseReportComponent} from '../base-report-component';
import { SquareTransactionsAnalysisService } from '../../services/square-transaction-analysis-service';


@Component({
  selector: 'app-report-top-customers',
  templateUrl: './report-top-customers.component.html',
  styleUrls: ['./report-top-customers.component.less']
})
export class ReportTopCustomersComponent extends BaseReportComponent implements OnInit, OnDestroy  {
    public topCustomers: SquareCustomerModel[] = [];
    public poolSize = 10;
    public reportType: TopCustomerReportTypeEnum = TopCustomerReportTypeEnum.totalRevenue;
    public reportTypes = TopCustomerReportTypeEnum;

    public constructor(public analysisService: SquareTransactionsAnalysisService, private router: Router) {
        super(analysisService);
    }

    public ngOnInit(): void {
        this.updateData();
    }

    public ngOnDestroy(): void {
        this.purgeSubscriptions();
    }

    public setPoolSize(size: number): void {
        this.poolSize = size;
        this.updateData();
    }

    public setReportType(type: TopCustomerReportTypeEnum): void {
        this.reportType = type;
        this.updateData();
    }

    public navigateToCustomer(customer: SquareCustomerModel): void {
        this.router.navigate(['/customers', customer.id]);
    }

    protected updateData(): void {
        this.topCustomers = this.analysisService.getTopCustomersByReportType(this.reportType, this.poolSize);
    }
}
