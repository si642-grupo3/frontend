import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = `${environment.serverBasePath}`;
  constructor(private http:HttpClient) { }

    getUsers(){
        return this.http.get(`${this.baseURL}/clientes`);
    }
    getUserById(id: any){
        return this.http.get(`${this.baseURL}/clientes/${id}`);
    }
    createUser(data: any){
        return this.http.post(`${this.baseURL}/clientes/register`, data);
    }
}
