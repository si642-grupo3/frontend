import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  baseURL : string = `${environment.serverBasePath}`;

  constructor(private http:HttpClient) { }

  getReports(){
    return this.http.get(`${this.baseURL}/reportes`);
  }
  getReportsById(id: any){
    return this.http.get(`${this.baseURL}/reportes/${id}`);
  }
  createReport(data: any){
    return this.http.post(`${this.baseURL}/reportes`, data);
  }
  deleteReport(id: any){
    return this.http.delete(`${this.baseURL}/reportes/${id}`);
  }

}
