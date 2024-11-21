import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

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
    login(email: string, password: string) {
        const params = new HttpParams()
            .set('email', email)
            .set('password', password);

        return this.http.get(`${this.baseURL}/clientes/login`, { params });
    }
}
