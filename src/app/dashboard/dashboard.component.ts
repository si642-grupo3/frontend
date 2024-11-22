import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userData: any = {};
  userName : string = '';
  userId : undefined;

  cards = [
    {
      "title": "Facturas",
      "content": "Print bills, manage orders, export reports, and streamline cashier operations efficiently.",
      "img": "https://img.icons8.com/?size=100&id=442b7zv4iMmN&format=png&color=000000",
      "url": "/dashboard/invoices"
    },
    {
      "title": "Reportes",
      "content": "Manage client credits, filter, share data, export reports, and optimize credit handling.",
      "img": "https://img.icons8.com/?size=100&id=AzYUEJIyWdAY&format=png&color=000000",
      "url": "/dashboard/reports"
    },
    {
      "title": "Mi Cartera",
      "content": "Export detailed sales reports, manage transactions, and enhance sales performance.",
      "img": "https://img.icons8.com/?size=100&id=13296&format=png&color=000000",
      "url": "/dashboard/list"
    },
    {
      "title": "Tutorial",
      "content": "Watch a video on how to use our application.",
      "img": "https://img.icons8.com/external-anggara-flat-anggara-putra/100/external-tutorial-online-learning-anggara-flat-anggara-putra.png",
      "url": "/dashboard/reports" //to change
    },
  ];

  constructor(private router: Router) {
  }
  redirectTo(url: string) {
    this.router.navigate([url]);
  }

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userName = this.userData.nombre;
    this.userId = this.userData.id;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']).then();
  }

}
