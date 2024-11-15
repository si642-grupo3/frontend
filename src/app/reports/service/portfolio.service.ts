import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  BASE_URL:string = "http://localhost:8080/api/v1/cartera"
  constructor(private httpClient:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Acces-Controll-Allow-Origin':'*'
    })
  }

  getPortfolios(): Observable<any>{
    return this.httpClient.get(this.BASE_URL, this.httpOptions).pipe(res => res);
  }

}
