import { Component, OnInit } from '@angular/core';
import {PortfolioService} from "../../service/portfolio.service";

@Component({
  selector: 'portfolio-reports',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit{

  i:number = 0;
  portfoliosList: any = [];
  listVN: number[] = [];
  listVR: number[] = [];

  constructor(private portfolioService:PortfolioService) {}

  ngOnInit() {
    this.getAllPortfolios()
  }

  getAllPortfolios(){
    this.portfolioService.getPortfolios().subscribe({
      next: (result)=>{
        this.portfoliosList = result;
        console.log(this.portfoliosList);

        let vn;
        let vr;
        for (let item of this.portfoliosList){

          vn = 0;
          vr = 0;
          for (let w of item.reportes){
            vn += w.valor_nominal;
            vr += w.valor_recibido;
          }
          this.listVN.push(vn);
          this.listVR.push(vr);
        }
      },
      error: (err)=>{
      }
    })
  }

  protected readonly Date = Date;
}
