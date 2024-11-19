import { Component } from '@angular/core';

@Component({
  selector: 'app-descuento',
  standalone: true,
  imports: [],
  templateUrl: './descuento.component.html',
  styleUrl: './descuento.component.css'
})
export class DescuentoComponent {
  diasPorAnio: string = '360';
  plazoTasa: string = '';
  tasaEfectiva: number | null = null;
  fechaDescuento: string = '';
  costesIniciales: any[] = [];
  costesFinales: any[] = [];

  agregarCosto(tipo: 'inicial' | 'final', motivo: string, valor: string) {
    const nuevoCosto = { motivo, valor };
    if (tipo === 'inicial') {
      this.costesIniciales.push(nuevoCosto);
    } else {
      this.costesFinales.push(nuevoCosto);
    }
  }

  eliminarCosto(tipo: 'inicial' | 'final') {
    if (tipo === 'inicial') this.costesIniciales.pop();
    else this.costesFinales.pop();
  }

  mostrarDatos() {
    console.log('Datos de Tasa:', {
      diasPorAnio: this.diasPorAnio,
      plazoTasa: this.plazoTasa,
      tasaEfectiva: this.tasaEfectiva,
      fechaDescuento: this.fechaDescuento
    });
    console.log('Costes Iniciales:', this.costesIniciales);
    console.log('Costes Finales:', this.costesFinales);
  }
}
