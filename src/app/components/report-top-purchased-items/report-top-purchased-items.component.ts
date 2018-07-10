import { Component, OnDestroy, OnInit } from '@angular/core';

import { SquareTransactionsAnalysisService } from '../../services/square-transaction-analysis-service';
import { BaseReportComponent} from '../base-report-component';


@Component({
  selector: 'app-report-top-purchased-items',
  templateUrl: './report-top-purchased-items.component.html',
  styleUrls: ['./report-top-purchased-items.component.less']
})
export class ReportTopPurchasedItemsComponent extends BaseReportComponent implements OnInit, OnDestroy {
    public topPurchasedItems: any[] = [];
    public poolSize = 10;

    public constructor(public analysisService: SquareTransactionsAnalysisService) {
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

    protected updateData(): void {
        if (this.analysisService.initialized) {
            this.topPurchasedItems = this.analysisService.getTopPurchasedItems(this.poolSize);
        }
    }
}
