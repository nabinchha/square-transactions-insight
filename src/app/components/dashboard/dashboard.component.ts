import { Component } from '@angular/core';

import {PapaParseService} from 'ngx-papaparse';

import { SquareTransactionInterface } from '../../interfaces/square-transaction.interface';
import { SquareTransactionModel } from '../../models/square-transaction.model';
import { SquareTransactionsAnalysisService } from '../../services/square-transaction-analysis-service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {
    public transactions: SquareTransactionInterface[] = [];
    public loaderProgress = 0;

    public constructor(public analysisService: SquareTransactionsAnalysisService,
                       private papaParserService: PapaParseService) {}

    public handleFileSelected(file: File): void {
        this.trackProgress(10);
        const reader = new FileReader();
        reader.onload = () => { this.handleFileReaderDataLoad(reader.result); };
        reader.readAsText(file);
    }

    private handleFileReaderDataLoad(result: string): void {
        this.trackProgress(15);
        const csvLines = this.getCsvLines(result);
        let count = 1;
        this.transactions = csvLines.map((line: string) => {
            const txn = new SquareTransactionModel();
            txn.loadFromColumns(this.papaParserService.parse(line).data[0]);
            this.trackProgress((count / csvLines.length) * 90);
            count += 1;
            return txn;
        });
        this.analysisService.setTransactions(this.transactions);
        this.trackProgress(  100);
    }

    private getCsvLines(csvString: string): string[] {
        const rows = csvString.split(/\r?\n|\r/);
        rows.splice(0, 1);
        return rows.filter((line: string) => {
            return line.trim().length > 0;
        });
    }

    private trackProgress(value: number): void {
        this.loaderProgress = value;
        if (value >= 100) {
            setTimeout(() => {
                this.loaderProgress = 0;
            }, 5000);
        }
    }
}
