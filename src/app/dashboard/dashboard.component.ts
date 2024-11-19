import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userData: any = {};


  cards = [
    {
      "title": "Cartera de Facturas",
      "content": "Print bills, manage orders, export reports, and streamline cashier operations efficiently.",
      "img": "https://img.icons8.com/?size=100&id=442b7zv4iMmN&format=png&color=000000",
      "url": "/dashboard/invoices"
    },
    {
      "title": "Reporte",
      "content": "Manage client credits, filter, share data, export reports, and optimize credit handling.",
      "img": "https://img.icons8.com/?size=100&id=AzYUEJIyWdAY&format=png&color=000000",
      "url": "/dashboard/reports"
    },
    {
      "title": "Lista",
      "content": "Export detailed sales reports, manage transactions, and enhance sales performance.",
      "img": "https://img.icons8.com/?size=100&id=13296&format=png&color=000000",
      "url": "/dashboard/list"
    },
    {
      "title": "Perfil",
      "content": "Efficiently manage products, including creation, updates, and deletions.",
      "img":"https://img.icons8.com/?size=100&id=108294&format=png&color=000000",
      "url": "/dashboard/profile"
    }
  ];

  constructor(private router: Router) {
  }
  redirectTo(url: string) {
    this.router.navigate([url]);
  }

}
