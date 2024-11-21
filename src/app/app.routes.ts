import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TasaefectivaComponent} from "./components/tasaefectiva/tasaefectiva.component";
import {AppComponent} from "./app.component";
import {RegisterComponent} from "./profiles/components/register/register.component";
import {LoginComponent} from "./profiles/components/login/login.component";
import {DescuentoComponent} from "./components/tasaefectiva/descuento/descuento.component";
import {ResultadosComponent} from "./components/tasaefectiva/resultados/resultados.component";

export const routes: Routes = [

    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard/reports',component: AppComponent  },
    {path: 'dashboard/list', component: AppComponent},
    {path: 'dashboard/invoices', component: TasaefectivaComponent},
    {path: 'dashboard/profile', component: AppComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '', pathMatch: 'full', redirectTo: 'register'}, //to change
    {path: 'invoices/descuento', component: DescuentoComponent},
    {path: 'invoices/descuento/resultados', component: ResultadosComponent}
];
