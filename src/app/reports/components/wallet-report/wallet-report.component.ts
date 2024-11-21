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
  total:number = 0;
  ent:number = 0;
  tcea:number = 0.01;
  i:number = 0;
  walletReportList: any = [];

  constructor(private walletReportService:WalletReportService) {}

  ngOnInit() {
    this.getWalletReports()
  }

  getWalletReports(){
    this.walletReportService.getWalletReports().subscribe({
      next: (result)=>{
        this.walletReportList = result;

        for ( let item of this.walletReportList) {
          this.total += item.valor_recibido;
          this.ent += item.valor_entregado;
        }
        console.log(this.walletReportList);
        this.tcea = this.ent/this.total
      },
      error: (err)=>{
      }
    })
  }
}
