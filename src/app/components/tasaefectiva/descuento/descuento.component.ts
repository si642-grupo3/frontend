import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DescuentoService} from "./descuento.service";
import * as moment from 'moment';

@Component({
  selector: 'app-descuento',
  standalone: true,
  imports: [  MatNativeDateModule,MatDatepickerModule,MatButtonModule, MatSelectModule, CommonModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './descuento.component.html',
  styleUrl: './descuento.component.css',
  providers: []
})
export class DescuentoComponent {
  valorRecibido: number = 0;
  valorEntregado: number = 0;
  tcea: number = 0;

  respuestaPost: any = [];
  //invoiceIdResponse: number = 7;
  invoiceForm: FormGroup;
  submitted = false;
  costesIniciales: { motivo: string; valor: number }[] = [];
  costesFinales: { motivo: string; valor: number }[] = [];

  constructor(private fb: FormBuilder, private router: Router, private descService: DescuentoService) {
    this.invoiceForm = this.fb.group({
      numero: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      moneda: ['', Validators.required],
      fechaPago: ['', Validators.required],
      totalFacturado: ['', Validators.required],
      retencion: ['', Validators.required],
      diasPorAno: ['', Validators.required],
      plazoTasa: ['', Validators.required],
      tipoTasa: ['', ],
      tasaEfectiva: ['', ],
        tasaNominal: ['',],
        periodoCapitalizacion: ['', Validators.required],
      fechaDescuento: ['', Validators.required],
      motivoInicial: [''],
      motivoFinal: [''],
      valorInicial: [''],
      valorFinal: [''],

    });
  }
  tipoTasaSeleccionada: string | null = null;

  onTipoTasaChange(tipoTasa: string): void {
    this.tipoTasaSeleccionada = tipoTasa;

    if (tipoTasa === 'efectiva') {
      this.invoiceForm.get('tasaEfectiva')?.setValidators([Validators.required]);
      this.invoiceForm.get('tasaNominal')?.clearValidators();
      this.invoiceForm.get('periodoCapitalizacion')?.clearValidators();
    } else if (tipoTasa === 'nominal') {
      this.invoiceForm.get('tasaNominal')?.setValidators([Validators.required]);
      this.invoiceForm.get('periodoCapitalizacion')?.setValidators([Validators.required]);
      this.invoiceForm.get('tasaEfectiva')?.clearValidators();
    }

    // Actualiza la validación
    this.invoiceForm.get('tasaEfectiva')?.updateValueAndValidity();
    this.invoiceForm.get('tasaNominal')?.updateValueAndValidity();
    this.invoiceForm.get('periodoCapitalizacion')?.updateValueAndValidity();
  }


  ngOnInit(): void {}

  agregarCoste(tipo: string): void {
    const motivo = this.invoiceForm.get(tipo === 'inicial' ? 'motivoInicial' : 'motivoFinal')?.value;
    const valor = this.invoiceForm.get(tipo === 'inicial' ? 'valorInicial' : 'valorFinal')?.value;

    if (tipo === 'inicial') {
      this.costesIniciales.push({ motivo, valor });
    } else {
      this.costesFinales.push({ motivo, valor });
    }
  }

  sumaValores: unknown = 0;

  formatDate(date: Date | string | null): string {
    if (date) {
      const dateObj = new Date(date);
      return dateObj.toISOString();
    }
    return new Date().toISOString(); // Si la fecha es null o inválida, retornamos la fecha actual
  }

  calcularValores(): void {
    const formValues = this.invoiceForm.value;

    // Validar y convertir fechas
    const fechaPago = new Date(formValues.fechaPago);
    const fechaDescuento = new Date(formValues.fechaDescuento);

    if (isNaN(fechaPago.getTime()) || isNaN(fechaDescuento.getTime())) {
      console.error("Las fechas proporcionadas no son válidas.");
      return;
    }

    const plazoDescuento = (fechaPago.getTime() - fechaDescuento.getTime()) / (1000 * 60 * 60 * 24); // Días de diferencia
    if (plazoDescuento <= 0) {
      console.error("La fecha de descuento debe ser anterior a la fecha de pago.");
      return;
    }

    const diasPorAno = formValues.diasPorAno === '365' ? 365 : 360;

    // Cálculo con tasa efectiva si está disponible
    let TE = (formValues.tasaEfectiva || 0) / 100;

    if (TE === 0 && formValues.tasaNominal > 0 && formValues.periodoCapitalizacion > 0) {
      // Calcular tasa efectiva a partir de tasa nominal
      const TN = (formValues.tasaNominal || 0) / 100;
      const m = diasPorAno / formValues.periodoCapitalizacion; // Periodos por año
      TE = Math.pow(1 + TN / m, m) - 1;
    }

    if (TE === 0) {
      console.error("No se puede calcular porque tanto la tasa efectiva como la tasa nominal son 0.");
      return;
    }

    // Cálculo del descuento
    const dt = (TE * plazoDescuento) / diasPorAno / (1 + (TE * plazoDescuento) / diasPorAno);

    const valorNeto = formValues.totalFacturado * (1 - dt);
    this.valorRecibido = valorNeto - (formValues.retencion || 0);

    // Sumar costes iniciales (si existen)
    const sumaCostesIniciales = this.costesIniciales.reduce((sum, coste) => sum + (coste.valor || 0), 0);
    this.valorRecibido = parseFloat((this.valorRecibido - sumaCostesIniciales).toFixed(2));

    // Calcular valor entregado
    const sumaCostesFinales = this.costesFinales.reduce((sum, coste) => sum + (coste.valor || 0), 0);
    this.valorEntregado = parseFloat((formValues.totalFacturado + sumaCostesFinales).toFixed(2));

    // Cálculo de TCEA
    this.tcea = parseFloat((Math.pow(this.valorEntregado / this.valorRecibido, diasPorAno / plazoDescuento) - 1).toFixed(7));

    // Log resultados
    console.log(`Valor Recibido: ${this.valorRecibido.toFixed(2)}`);
    console.log(`Valor Entregado: ${this.valorEntregado.toFixed(2)}`);
    console.log(`TCEA: ${(this.tcea * 100).toFixed(2)}%`);
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.invoiceForm.valid){
      const formValues = this.invoiceForm.value;

      let plazoTasaValue: number;
      switch (formValues.plazoTasa) {
        case 'diario':
          plazoTasaValue = 1;
          break;
        case 'quincenal':
          plazoTasaValue = 15;
          break;
        case 'mensual':
          plazoTasaValue = 30;
          break;
        case 'semestral':
          plazoTasaValue = 180;
          break;
        case 'anual':
          plazoTasaValue = 365;
          break;
        default:
          plazoTasaValue = 0;
      }

      let periodoCap: number;
      switch (formValues.periodoCapitalizacion) {
        case 'diario':
          periodoCap = 1;
          break;
        case 'quincenal':
          periodoCap = 15;
          break;
        case 'mensual':
          periodoCap = 30;
          break;
        case 'semestral':
          periodoCap = 180;
          break;
        case 'anual':
          periodoCap = 365;
          break;
        default:
          periodoCap = 0;
      }


      // Preparar los datos para el POST
      const payload = {
        numero: formValues.numero || '999', // Número por defecto si no se llena
        fecha_emision: this.formatDate(formValues.fechaEmision),
        fecha_pago: this.formatDate(formValues.fechaPago),
        retencion: formValues.retencion || 0,
        total_facturado: formValues.totalFacturado || 0,
        dias_anio: formValues.diasPorAno === '365' ? 365 : 360,
        plazo_tasa: plazoTasaValue,
        tasa_nominal: formValues.tipoTasa === 'nominal' ? formValues.tasaNominal || 0 : 0,
        tasa_efectiva: formValues.tipoTasa === 'efectiva' ? formValues.tasaEfectiva || 0 : 0,
        periodo_capitalizacion: formValues.tipoTasa === 'nominal' ? formValues.periodoCapitalizacion || 0 : 0,
        moneda: formValues.moneda === 'dolares' ? 1 : 2,
        fecha_descuento: this.formatDate(formValues.fechaDescuento),
        cliente: 5,
      };
      console.log(payload)

      this.descService.createDescuento(payload).subscribe(
          response => {
            //save response in variable respuestaPost
            this.respuestaPost = response;
            console.log(this.respuestaPost)
          },error => {
            console.error('Error al enviar los datos:', error);
          }
      );

      this.calcularValores()

    }else {
      console.log('Formulario no válido');
      this.invoiceForm.markAllAsTouched();
    }
  }




  goToResults(){
    this.router.navigate(['/invoices/descuento/resultados']);
  }
  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }
  cleanForm(){
    this.invoiceForm.reset();
    this.costesIniciales = [];
    this.costesFinales = [];
    this.submitted = false;
  }

  createInvoice(){}
}
