import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [

    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard/reports',component: AppComponent  },
    {path: 'dashboard/list', component: AppComponent},
    {path: 'dashboard/invoices', component: AppComponent},
    {path: 'dashboard/profile', component: AppComponent},

];
