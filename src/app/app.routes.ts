import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TasaefectivaComponent} from "./components/tasaefectiva/tasaefectiva.component";
import {AppComponent} from "./app.component";
import {RegisterComponent} from "./profiles/components/register/register.component";
import {LoginComponent} from "./profiles/components/login/login.component";
import {DescuentoComponent} from "./components/tasaefectiva/descuento/descuento.component";
import {ResultadosComponent} from "./components/tasaefectiva/resultados/resultados.component";
import {ReportComponent} from "./reports/components/report/report.component";
import {PortfolioComponent} from "./reports/components/portfolio/portfolio.component";

export const routes: Routes = [

    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard/reports',component: ReportComponent  },
    {path: 'dashboard/list', component: PortfolioComponent},
    {path: 'dashboard/invoices', component: TasaefectivaComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '', pathMatch: 'full', redirectTo: 'login'},
];
