import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SquareTransactionsAnalysisService } from '../../services/square-transaction-analysis-service';
import { BaseReportComponent } from '../base-report-component';
import { SquareCustomerModel } from '../../models/square-customer.model';


@Component({
    selector: 'app-report-customer-detail',
    templateUrl: './report-customer-detail.component.html',
    styleUrls: ['./report-customer-detail.component.less']
})
export class ReportCustomerDetailComponent extends BaseReportComponent implements OnInit, OnDestroy {

    public customerId: string;
    public customer: SquareCustomerModel;
    public hasError = false;
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];

    private topPurchasedItems: any[] = [];

    public constructor(private route: ActivatedRoute,
                       public analysisService: SquareTransactionsAnalysisService) {
        super(analysisService);
    }

    public ngOnInit() {
        this.customerId = this.route.snapshot.paramMap.get('customerId');
        this.updateData();
    }

    public ngOnDestroy(): void {
        this.purgeSubscriptions();
    }

    protected updateData(): void {
        if (this.analysisService.initialized && !!this.customerId) {
            if (!(this.customerId in this.analysisService.customerDict)) {
                this.hasError = true;
            } else {
                this.customer = this.analysisService.customerDict[this.customerId];
                this.topPurchasedItems = this.analysisService.getTopPurchasedItems(100, this.customerId);
                this.pieChartLabels = this.topPurchasedItems.map((item: any[]) => {
                    return item[0];
                });
                this.pieChartData = this.topPurchasedItems.map((item: any[]) => {
                    return item[1];
                });
            }
        }
    }
}
