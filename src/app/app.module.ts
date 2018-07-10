import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PapaParseModule } from 'ngx-papaparse';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { CsvDropZoneComponent } from './components/csvdropzone/csvdropzone.component';
import { ReportTopCustomersComponent } from './components/report-top-customers/report-top-customers.component';
import { ReportRevenueByMonthComponent } from './components/report-revenue-by-month/report-revenue-by-month.component';
import { ReportCustomerDistributionComponent } from './components/report-customer-distribution/report-customer-distribution.component';
import { ReportTopPurchasedItemsComponent } from './components/report-top-purchased-items/report-top-purchased-items.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { SquareTransactionsAnalysisService } from './services/square-transaction-analysis-service';
import { DropzoneDirective } from './directives/dropzone.directive';

import { AppRoutingModule } from './app-routing.module';
import { ReportCustomerDetailComponent } from './components/report-customer-detail/report-customer-detail.component';
import { ReportCustomerRetentionComponent } from './components/report-customer-retention/report-customer-retention.component';


@NgModule({
    declarations: [
        AppComponent,
        DropzoneDirective,
        CsvDropZoneComponent,
        ReportTopCustomersComponent,
        ReportRevenueByMonthComponent,
        ReportCustomerDistributionComponent,
        ReportTopPurchasedItemsComponent,
        DashboardComponent,
        ReportCustomerDetailComponent,
        ReportCustomerRetentionComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PapaParseModule,
        ChartsModule,
        NgbModule.forRoot()
    ],
    providers: [
        SquareTransactionsAnalysisService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
