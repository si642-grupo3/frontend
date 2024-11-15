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
  portfoliosList: any;
  listNFacturas: number[] = [];
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
        console.log("recibido");
      },
      error: (err)=>{
        console.log("Error al obtener datos"+err);
      }
    })
    console.log("lista" + this.portfoliosList);
  }
}
