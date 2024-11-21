import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent {
  valorTotal: string = '';
  tasaCoste: string = '';

  constructor(private router: Router) {
  }

  guardarResultados() {
    console.log('Valor Total:', this.valorTotal);
    console.log('Tasa de Coste:', this.tasaCoste);
    alert('Resultados guardados correctamente');
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
