import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  baseURL : string = `${environment.serverBasePath}`;

  constructor(private http:HttpClient) { }

  getPortfolios(){
    return this.http.get(`${this.baseURL}/cartera`);
  }
  createPortfolio(data: any){
    return this.http.post(`${this.baseURL}/cartera`, data);
  }

}
