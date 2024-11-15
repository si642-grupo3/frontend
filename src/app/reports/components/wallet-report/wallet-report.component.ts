import { Component, OnInit } from '@angular/core';
import {WalletReportService} from "../../service/wallet-report.service";

@Component({
  selector: 'wallet-report',
  standalone: true,
  imports: [],
  templateUrl: './wallet-report.component.html',
  styleUrl: './wallet-report.component.css'
})
export class WalletReportComponent implements OnInit{
  total:number = 0.01;
  i:number = 0;
  walletReportList: any;

  constructor(private walletReportService:WalletReportService) {}

  ngOnInit() {
    this.getWalletReports()
  }

  getWalletReports(){
    this.walletReportService.getWalletReports().subscribe({
      next: (result)=>{
        this.walletReportList = result;
        console.log("recibido");
      },
      error: (err)=>{
        console.log("Error al obtener datos"+err);
      }
    })
    console.log("lista" + this.walletReportList);
  }
}
