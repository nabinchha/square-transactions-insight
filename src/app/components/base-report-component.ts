import { SquareTransactionsAnalysisService } from '../services/square-transaction-analysis-service';
import { Subscription } from 'rxjs/Subscription';


export abstract class BaseReportComponent {
    protected subscriptions: Subscription[] = [];

    public constructor(public analysisService: SquareTransactionsAnalysisService) {
        this.subscribeToAnalysisService();
    }

    public purgeSubscriptions(): void {
        this.subscriptions.forEach((sub: Subscription) => {
            if (sub) { sub.unsubscribe(); }
        });
    }

    protected subscribeToAnalysisService(): void {
        this.subscriptions.push(
            this.analysisService.dataChangeObservable$.subscribe((initialized: boolean) => {
                this.updateData();
            })
        );
    }

    protected abstract updateData(): void;
}
