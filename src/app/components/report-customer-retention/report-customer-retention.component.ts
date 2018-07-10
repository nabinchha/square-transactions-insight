import { Component, OnInit, OnDestroy } from '@angular/core';

import { SquareTransactionsAnalysisService } from '../../services/square-transaction-analysis-service';
import { BaseReportComponent} from '../base-report-component';


@Component({
    selector: 'app-report-customer-retention',
    templateUrl: './report-customer-retention.component.html',
    styleUrls: ['./report-customer-retention.component.less']
})
export class ReportCustomerRetentionComponent extends BaseReportComponent implements OnInit, OnDestroy {
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        },
        scales: {
            yAxes: [
                {
                    id: 'yAxisRetentionChurnRate',
                    position: 'left',
                    ticks: {
                        suggestedMax: 100,
                        beginAtZero: true,
                    }
                },
                {
                    id: 'yAxisTotalCustomers',
                    position: 'right',
                    ticks: {
                        beginAtZero: true,
                    }
                }
            ]
        }
    };

    public barChartLabels: string[] = [];

    public barChartData: any[] = [];

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
            const customerDistributionData = this.analysisService.getCustomerDistributionOverMonths();
            this.barChartLabels = Object.keys(customerDistributionData[0]);
            const retentionChurnData = this.calculateRetentionAndChurn(customerDistributionData);

            const retentionData = retentionChurnData[0];
            const churnData = retentionChurnData[1];
            this.barChartData = [
                { data: retentionData, label: 'Retention %', yAxisID: 'yAxisRetentionChurnRate' },
                { data: churnData, label: 'Churn %',  yAxisID: 'yAxisRetentionChurnRate' },
                {
                    data: Object.values(customerDistributionData[2]),
                    label: '# Customers',
                    type: 'line',
                    fill: false,
                    yAxisID: 'yAxisTotalCustomers'
                }
            ];
        }
    }

    protected calculateRetentionAndChurn(customerDistributionData: { [monthYear: string]: number; }[]): any[] {
        const returningCustomerNumbers = Object.values(customerDistributionData[1]);
        const totalCustomerNumbers = Object.values(customerDistributionData[2]);
        const retentionData = returningCustomerNumbers.map((numReturningCustomers: number, index: number) => {
            if (index === 0) { return 0; }
            return (numReturningCustomers / totalCustomerNumbers[index - 1]) * 100;
        });
        const churnData = returningCustomerNumbers.map((numReturningCustomers: number, index: number) => {
            if (index === 0) { return 0; }
            return ((totalCustomerNumbers[index - 1] - numReturningCustomers) / totalCustomerNumbers[index]) * 100;
        });
        return [retentionData, churnData];
    }
}
