import { Routes } from '@angular/router';
import {RegisterComponent} from "./factuweb/profiles/components/register/register.component";

export const routes: Routes = [
    {path: 'register', component: RegisterComponent},

    {path: '', pathMatch: 'full', redirectTo: 'register'}, //to change
];
