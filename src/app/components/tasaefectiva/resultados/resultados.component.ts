import { Component } from '@angular/core';

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

  guardarResultados() {
    console.log('Valor Total:', this.valorTotal);
    console.log('Tasa de Coste:', this.tasaCoste);
    alert('Resultados guardados correctamente');
  }
}
