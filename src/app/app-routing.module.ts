import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ReportCustomerDetailComponent} from './components/report-customer-detail/report-customer-detail.component';


const routes: Routes = [
    { path: 'customers/:customerId', component: ReportCustomerDetailComponent },
    { path: '', component: DashboardComponent },
    { path: '**', component: DashboardComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
