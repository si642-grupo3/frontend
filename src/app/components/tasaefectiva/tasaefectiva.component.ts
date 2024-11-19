import { Component } from '@angular/core';

@Component({
  selector: 'app-tasaefectiva',
  standalone: true,
  imports: [],
  templateUrl: './tasaefectiva.component.html',
  styleUrl: './tasaefectiva.component.css'
})
export class TasaefectivaComponent {
  fechaEmision: string = '';
  fechaPago: string = '';
  totalFacturado: number | null = null;
  retencion: number | null = null;
  igv: number | null = null;


  onSubmit() {
    console.log('Fecha de Emisión:', this.fechaEmision);
    console.log('Fecha de Pago:', this.fechaPago);
    console.log('Total Facturado:', this.totalFacturado);
    console.log('Retención:', this.retencion);
    console.log('IGV:', this.igv);
    alert('Datos enviados correctamente.');
  }
}
