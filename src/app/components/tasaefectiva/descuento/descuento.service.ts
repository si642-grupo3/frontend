import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DescuentoService {
    baseURL: string = `${environment.serverBasePath}`;
    constructor(private http: HttpClient) {
    }

    createDescuento(data: any) {
        return this.http.post(`${this.baseURL}/facturas`, data);
    }

    createIniciales(data: any) {
        return this.http.post(`${this.baseURL}/coste_inicial`, data);
    }

    createFinales(data: any) {
        return this.http.post(`${this.baseURL}/coste_final`, data);
    }
}