import {SquareTransactionInterface} from '../interfaces/square-transaction.interface';


export class SquareTransactionModel implements SquareTransactionInterface {
    public date: Date;
    public time: string;
    public timeZone: string;
    public grossSales: number;
    public discounts: number;
    public netSales: number;
    public giftCardSales: number;
    public tax: number;
    public tip: number;
    public partialRefunds: number;
    public totalCollected: number;
    public source: string;
    public card: number;
    public cardEntryMethods: string;
    public cash: number;
    public squareGiftCard: number;
    public otherTender: number;
    public otherTenderType: string;
    public otherTenderNote: string;
    public fees: number;
    public netTotal: number;
    public transactionId: string;
    public paymentId: string;
    public cardBrand: string;
    public panSuffix: string;
    public deviceName: string;
    public staffName: string;
    public staffId: string;
    public details: string;
    public description: string;
    public eventType: string;
    public location: string;
    public diningOption: string;
    public customerId: string;
    public customerName: string;
    public customerReferenceId: string;
    public deviceNickname: string;
    public currencySymbol: string;

    public loadFromColumns(columns: any[]): void {
        if (columns.length < 37) {
            throw Error('Unsupported transaction csv format.');
        }

        this.date = new Date(columns[0]);
        this.time = columns[1];
        this.timeZone = columns[2];
        this.grossSales = this.parseCurrencyValue(columns[3]);
        this.discounts = this.parseCurrencyValue(columns[4]);
        this.netSales = this.parseCurrencyValue(columns[5]);
        this.giftCardSales = this.parseCurrencyValue(columns[6]);
        this.tax = this.parseCurrencyValue(columns[7]);
        this.tip = this.parseCurrencyValue(columns[8]);
        this.partialRefunds = this.parseCurrencyValue(columns[9]);
        this.totalCollected = this.parseCurrencyValue(columns[10]);
        this.source = columns[11];
        this.card = this.parseCurrencyValue(columns[12]);
        this.cardEntryMethods = columns[13];
        this.cash = this.parseCurrencyValue(columns[14]);
        this.squareGiftCard = this.parseCurrencyValue(columns[15]);
        this.otherTender = this.parseCurrencyValue(columns[16]);
        this.otherTenderType = columns[17];
        this.otherTenderNote = columns[18];
        this.fees = this.parseCurrencyValue(columns[19]);
        this.netTotal = this.parseCurrencyValue(columns[20]);
        this.transactionId = columns[21];
        this.paymentId = columns[22];
        this.cardBrand = columns[23];
        this.panSuffix = columns[24];
        this.deviceName = columns[25];
        this.staffName = columns[26];
        this.staffId = columns[27];
        this.details = columns[28];
        this.description = columns[29];
        this.eventType = columns[30];
        this.location = columns[31];
        this.diningOption = columns[32];
        this.customerId = columns[33];
        this.customerName = columns[34];
        this.customerReferenceId = columns[35];
        this.deviceNickname = columns[36];
    }

    private parseCurrencyValue(amount: string): number {
        if (!this.currencySymbol) {
            this.currencySymbol = amount.substring(0, 1);
        }
        return parseFloat(amount.substring(1));
    }
}
