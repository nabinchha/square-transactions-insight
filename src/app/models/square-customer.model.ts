import {SquareTransactionInterface} from '../interfaces/square-transaction.interface';


export class SquareCustomerModel {
    public transactions: SquareTransactionInterface[] = [];
    public txnsByMonthAndYear: { [monthYear: number]: SquareTransactionInterface[]; } = {};

    public totalRevenue = 0;
    public totalTips = 0;
    public constructor(public name: string, public id: string) {}

    public addTransaction(txn: SquareTransactionInterface): void {
        this.totalRevenue += txn.netTotal;
        this.totalTips += txn.tip;
        this.transactions.push(txn);
        this.groupByDate(txn);
    }

    public get totalTransactions(): number {
        return this.transactions.length;
    }

    public get currency(): string {
        return this.transactions[0].currencySymbol;
    }

    public get averageTransactionsPerMonth(): number {
        return Math.floor(this.totalTransactions / Object.keys(this.txnsByMonthAndYear).length);
    }

    public get averageRevenuePerMonth(): number {
        return this.totalRevenue / Object.keys(this.txnsByMonthAndYear).length;
    }

    public get averageRevenuePerVisit(): number {
        return this.totalRevenue / this.transactions.length;
    }

    public get averageTipPerVisit(): number {
        return this.totalTips / this.transactions.length;
    }

    public get averageTipPerMonth(): number {
        return this.totalTips / Object.keys(this.txnsByMonthAndYear).length;
    }

    private groupByDate(txn: SquareTransactionInterface): void {
        const dateKey = parseInt(`${txn.date.getFullYear()}${txn.date.getMonth() + 1}`, 10);
        if (!(dateKey in this.txnsByMonthAndYear)) {
            this.txnsByMonthAndYear[dateKey] = [];
        }
        (< SquareTransactionInterface[]>this.txnsByMonthAndYear[dateKey]).push(txn);
    }
}
