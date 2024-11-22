import { Component, OnInit } from '@angular/core';
import {ReportsService} from "../../service/reports.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'report',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{
  total:number = 0;
  ent:number = 0;
  tcea:number = 0.00;
  i:number = 0;
  walletReportList: any = [];

  constructor(private reportService:ReportsService) {}

  ngOnInit() {
    this.getWalletReports()
  }

  getWalletReports(){
    this.reportService.getReports().subscribe({
      next: (result)=>{
        this.walletReportList = result;

        for ( let item of this.walletReportList) {
          this.total += item.valor_recibido;
          this.ent += item.valor_entregado;
        }
        console.log(this.walletReportList);

        if (this.walletReportList.length > 0) {
          const sumTcea = this.walletReportList.reduce((acc: number, report: any) => acc + report.tcea, 0);
          this.tcea = sumTcea / this.walletReportList.length;
        }
      },
      error: (err)=>{
      }
    })
  }


}
