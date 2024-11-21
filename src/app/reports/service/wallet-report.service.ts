import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletReportService {

  BASE_URL:string = "http://localhost:3000/wallets"

  constructor(private httpClient:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Acces-Controll-Allow-Origin':'*'
    })
  }

  getWalletReports(): Observable<any>{
    return this.httpClient.get(this.BASE_URL, this.httpOptions).pipe(res => res);
  }

}
