import { Component, OnInit, OnDestroy } from '@angular/core';

import { SquareTransactionsAnalysisService } from '../../services/square-transaction-analysis-service';
import { BaseReportComponent} from '../base-report-component';


@Component({
    selector: 'app-report-customer-distribution',
    templateUrl: './report-customer-distribution.component.html',
    styleUrls: ['./report-customer-distribution.component.less']
})
export class ReportCustomerDistributionComponent extends BaseReportComponent implements OnInit, OnDestroy {
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    public barChartLabels: string[] = [];

    public barChartData: any[] = [];

    private customerDistributionData: { [monthYear: string]: number; }[];

    public constructor(public analysisService: SquareTransactionsAnalysisService) {
        super(analysisService);
    }

    public ngOnInit(): void {
        this.updateData();
    }

    public ngOnDestroy(): void {
        this.purgeSubscriptions();
    }

    protected updateData(): void {
        if (this.analysisService.initialized) {
            this.customerDistributionData = this.analysisService.getCustomerDistributionOverMonths();
            this.barChartLabels = Object.keys(this.customerDistributionData[0]);
            this.barChartData = [
                { data: Object.values(this.customerDistributionData[0]), label: 'New customers' },
                { data: Object.values(this.customerDistributionData[1]), label: 'Returning customers from last month' },
                { data: Object.values(this.customerDistributionData[2]), label: 'Total customers' }
            ];
        }
    }
}
