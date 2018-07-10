import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { SquareTransactionInterface } from '../interfaces/square-transaction.interface';
import { SquareCustomerModel } from '../models/square-customer.model';
import { TopCustomerReportTypeEnum } from '../enums/top-customer-report-type.enum';


@Injectable()
export class SquareTransactionsAnalysisService {
    public static localId = 'en-US';
    public initialized = false;
    public customers: SquareCustomerModel[] = [];
    public dataChangeObservable$: Observable<boolean>;
    public customerDict: { [customerId: string]: SquareCustomerModel; } = {};

    private dataChangeSubject: ReplaySubject<boolean>;
    private datePipe = new DatePipe(SquareTransactionsAnalysisService.localId);
    private txnsByMonthAndYear: { [monthYear: number]: SquareTransactionInterface[]; } = {};
    private customerTxnsByMonthAndYear: { [monthYear: number]: SquareTransactionInterface[]; } = {};

    private purchasedItemCountDict: { [purchasedItem: string]: number; } = {};
    private txns: SquareTransactionInterface[] = [];

    public constructor() {
        this.dataChangeSubject = new ReplaySubject<boolean>(1);
        this.dataChangeObservable$ = this.dataChangeSubject.asObservable();
    }

    public setTransactions(txns: SquareTransactionInterface[]): void {
        this.txns = txns;
        this.groupTransactions();
        this.initialized = true;
        this.dataChangeSubject.next(true);
    }

    public getRevenueOverMonths(): { [monthYear: string]: number; }[] {
        const totalRevenueOverMonths = {};
        const cashRevenueOverMonths = {};
        const cardRevenueOverMonths = {};
        Object.keys(this.txnsByMonthAndYear).forEach((key: string) => {
            const formatted = this.datePipe.transform(this.txnsByMonthAndYear[key][0].date, 'MMM, yy');
            const txns = this.txnsByMonthAndYear[key];
            const cashTxns = txns.filter((txn: SquareTransactionInterface) => {
                return txn.cardEntryMethods.toLowerCase() === 'n/a';
            });
            const totalRevenue = this.getTotalRevenue(txns);
            const cashRevenue = this.getTotalRevenue(cashTxns);
            totalRevenueOverMonths[formatted] = totalRevenue;
            cashRevenueOverMonths[formatted] = cashRevenue;
            cardRevenueOverMonths[formatted] = totalRevenue - cashRevenue;
        });
        return [cashRevenueOverMonths, cardRevenueOverMonths, totalRevenueOverMonths];
    }

    public getCustomerDistributionOverMonths(): { [monthYear: string]: number; }[] {
        const newCustomersOverMonth = {};
        const returningCustomersOverMonth = {};
        const totalCustomersOverMonth = {};
        const trackOverallCustomer = {};
        let customersLastMonth = {};

        Object.keys(this.customerTxnsByMonthAndYear).forEach((key: string) => {
            const allCustomersThisMonth = {};
            const newCustomersThisMonth = {};
            const formatted = this.datePipe.transform(this.customerTxnsByMonthAndYear[key][0].date, 'MMM, yy');
            const txns = this.customerTxnsByMonthAndYear[key];
            let returningCustomerCount = 0;

            txns.forEach((txn: SquareTransactionInterface) => {
                const id = txn.customerId;

                if (id in trackOverallCustomer && id in customersLastMonth && !(id in allCustomersThisMonth)) {
                    returningCustomerCount += 1;
                }

                if (!(id in allCustomersThisMonth)) {
                    allCustomersThisMonth[id] = id;
                }

                if (!(id in trackOverallCustomer)) {
                    trackOverallCustomer[id] = id;
                    newCustomersThisMonth[id] = id;
                }
            });
            newCustomersOverMonth[formatted] = Object.keys(newCustomersThisMonth).length;
            returningCustomersOverMonth[formatted] = returningCustomerCount;
            totalCustomersOverMonth[formatted] = Object.keys(allCustomersThisMonth).length;
            customersLastMonth = allCustomersThisMonth;
        });
        return [newCustomersOverMonth, returningCustomersOverMonth, totalCustomersOverMonth];
    }

    public getTopCustomersByReportType(reportType: TopCustomerReportTypeEnum, poolSize: number): SquareCustomerModel[] {
        let propName = '';
        switch (reportType) {
            case TopCustomerReportTypeEnum.visitsPerMonth: {
                propName = 'averageTransactionsPerMonth';
                break;
            }
            case TopCustomerReportTypeEnum.totalVisits: {
                propName = 'totalTransactions';
                break;
            }
            case TopCustomerReportTypeEnum.revenuePerVisit: {
                propName = 'averageRevenuePerVisit';
                break;
            }
            case TopCustomerReportTypeEnum.revenuePerMonth: {
                propName = 'averageRevenuePerMonth';
                break;
            }
            case TopCustomerReportTypeEnum.totalRevenue: {
                propName = 'totalRevenue';
                break;
            }
            case TopCustomerReportTypeEnum.tipsPerVisit: {
                propName = 'averageTipPerVisit';
                break;
            }
            case TopCustomerReportTypeEnum.tipsPerMonth: {
                propName = 'averageTipPerMonth';
                break;
            }
            case TopCustomerReportTypeEnum.totalTips: {
                propName = 'totalTips';
                break;
            }
        }
        return this.getTopCustomersProperty(propName, poolSize);
    }

    public getTopPurchasedItems(poolSize: number, customerId?: string): any[] {
        let purchasedItemCountDict = this.purchasedItemCountDict;

        if (!!customerId) {
            const customer = this.customerDict[customerId];
            purchasedItemCountDict = {};
            customer.transactions.forEach((txn: SquareTransactionInterface) => {
                purchasedItemCountDict = this.groupTransactionByPurchasedItemCount(purchasedItemCountDict, txn);
            });
        }
        return this.sortDictByPropertyValue(purchasedItemCountDict).slice(0, poolSize);
    }

    private getTopCustomersProperty(propertyName: string, poolSize: number): SquareCustomerModel[] {
        return this.sortDictByPropertyValue(this.customerDict, propertyName, false)
            .map((item: any) => {
                return this.customerDict[item[0]];
            }).slice(0, poolSize);
    }

    private groupTransactions(): void {
        this.txns.forEach((txn: SquareTransactionInterface) => {
            this.groupByDate(txn);
            this.groupByCustomer(txn);
            this.purchasedItemCountDict = this.groupTransactionByPurchasedItemCount(this.purchasedItemCountDict, txn);
        });
    }

    private groupByDate(txn: SquareTransactionInterface): void {
        const dateKey = parseInt(`${txn.date.getFullYear()}${txn.date.getMonth() + 1}`, 10);
        if (!(dateKey in this.txnsByMonthAndYear)) {
            this.txnsByMonthAndYear[dateKey] = [];
        }
        if (!(dateKey in this.customerTxnsByMonthAndYear)) {
            this.customerTxnsByMonthAndYear[dateKey] = [];
        }
        (< SquareTransactionInterface[]>this.txnsByMonthAndYear[dateKey]).push(txn);
        if (!!txn.customerId.trim()) {
            (< SquareTransactionInterface[]>this.customerTxnsByMonthAndYear[dateKey]).push(txn);
        }
    }

    private groupByCustomer(txn: SquareTransactionInterface): void {
        if (!txn.customerId) {
            return;
        }
        if (!(txn.customerId in this.customerDict)) {
            const customer = new SquareCustomerModel(txn.customerName, txn.customerId);
            this.customers.push(customer);
            this.customerDict[txn.customerId] = customer;
        }
        (<SquareCustomerModel>this.customerDict[txn.customerId]).addTransaction(txn);
    }

    private groupTransactionByPurchasedItemCount(purchasedItemCountDict: { [purchasedItem: string]: number; },
                                                 txn: SquareTransactionInterface): { [purchasedItem: string]: number; } {
        const items = txn.description.split(',');
        items.forEach((item: string) => {
            const normalizedItemAndCount = this.parseMultiplier(item);
            const itemName = normalizedItemAndCount[1];
            const count = normalizedItemAndCount[0];
            if (!!itemName) {
                if (!(itemName in purchasedItemCountDict)) {
                    purchasedItemCountDict[itemName] = 0;
                }
                purchasedItemCountDict[itemName] += count;
            }
        });
        return purchasedItemCountDict;
    }

    private parseMultiplier(itemWithMultiplier: string): any[] {
        itemWithMultiplier = itemWithMultiplier.trim();
        const items = itemWithMultiplier.split(' x ');
        if (items.length > 1) {
            return [parseInt(items[0], 10), items[1].trim()];
        }
        return [1, items[0]];
    }

    private getTotalRevenue(txns: SquareTransactionInterface[]): number {
        let total = 0;
        txns.forEach((txn: SquareTransactionInterface) => {
            total += txn.netTotal;
        });
        return total;
    }

    private sortDictByPropertyValue(dict: { [key: string]: any; }, propertyName?: string, orderAsc?: boolean): any[] {
        const sortable = [];
        for (const key in dict) {
            if (dict.hasOwnProperty(key)) {
                const val = !!propertyName ? dict[key][propertyName] : dict[key];
                sortable.push([key, val]);
            }
        }
        return sortable.sort((a, b) => {
            if (orderAsc === true) {
                return a[1] - b[1];
            } else {
                return b[1] - a[1];
            }
        });
    }
}
