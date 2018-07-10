import { Component, OnInit, OnDestroy } from '@angular/core';

import { SquareTransactionsAnalysisService } from '../../services/square-transaction-analysis-service';
import { BaseReportComponent} from '../base-report-component';

@Component({
    selector: 'app-report-revenue-by-month',
    templateUrl: './report-revenue-by-month.component.html',
    styleUrls: ['./report-revenue-by-month.component.less']
})
export class ReportRevenueByMonthComponent extends BaseReportComponent implements OnInit, OnDestroy {
    public revenueByMonth: { [monthYear: string]: number; }[] = [];

    public lineChartData: Array<any> = [];
    public lineChartLabels: Array<string> = [];
    public lineChartOptions: any = {
        responsive: true,
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    public currencySymbol = '$';

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
            this.currencySymbol = this.analysisService.customers[0].currency;
            this.revenueByMonth = this.analysisService.getRevenueOverMonths();
            this.lineChartLabels = Object.keys(this.revenueByMonth[0]);
            this.lineChartData = [
                { data: Object.values(this.revenueByMonth[0]), label: 'Cash' },
                { data: Object.values(this.revenueByMonth[1]), label: 'Card' },
                { data: Object.values(this.revenueByMonth[2]), label: 'Total' }
            ];
        }
    }
}
