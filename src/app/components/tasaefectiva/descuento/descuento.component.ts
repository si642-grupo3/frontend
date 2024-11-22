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

@Component({
  selector: 'app-descuento',
  standalone: true,
  imports: [  MatNativeDateModule,MatDatepickerModule,MatButtonModule, MatSelectModule, CommonModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './descuento.component.html',
  styleUrl: './descuento.component.css',
  providers: []
})
export class DescuentoComponent {

  respuestaPost: any = [];

  invoiceForm: FormGroup;
  submitted = false;
  costesIniciales: { motivo: string; valor: number }[] = [];
  costesFinales: { motivo: string; valor: number }[] = [];

  constructor(private fb: FormBuilder, private router: Router, private descService: DescuentoService) {
    this.invoiceForm = this.fb.group({
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
  onSubmit(): void {
    this.submitted = true;

    if (this.invoiceForm.valid) {
      const formValues = this.invoiceForm.value;

      // Campos específicos a sumar
      const camposNumericos = [
        'totalFacturado',
        'retencion',
        'valorInicial',
        'valorFinal',
        'tasaEfectiva',
        'tasaNominal',
        'periodoCapitalizacion'
      ];

      this.sumaValores = camposNumericos
          .map(campo => formValues[campo] || 0) // Si el campo no tiene valor, usar 0
          .reduce((acc, valor) => acc + valor, 0);


    } else {

      this.invoiceForm.markAllAsTouched();
    }

    if (this.invoiceForm.valid){
      const formValues = this.invoiceForm.value;

      let plazoTasaValue = 0;
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


      // Preparar los datos para el POST
      const payload = {
        numero: formValues.numero || 'string', // Número por defecto si no se llena
        fecha_emision: this.formatDate(formValues.fechaEmision),
        fecha_pago: this.formatDate(formValues.fechaPago),
        retencion: formValues.retencion || 0,
        total_facturado: formValues.totalFacturado || 0,
        dias_anio: formValues.diasPorAno === '365' ? 365 : 360,
        plazo_tasa: plazoTasaValue,
        tasa_nominal: formValues.tipoTasa === 'nominal' ? formValues.tasaNominal || 0 : 0,
        tasa_efectiva: formValues.tipoTasa === 'efectiva' ? formValues.tasaEfectiva || 0 : 0,
        periodo_capitalizacion: formValues.tipoTasa === 'nominal' ? formValues.periodoCapitalizacion || 0 : 0,
        moneda: formValues.moneda === 'dolares' ? 1 : 0,
        fecha_descuento: this.formatDate(formValues.fechaDescuento),
        cliente: 1,
      };
      console.log(payload)

      this.descService.createDescuento(payload).subscribe(
          response => {
            //save response in variable respuestaPost
            this.respuestaPost = response;
          },error => {
            console.error('Error al enviar los datos:', error);
          }
      );
    }else {
      console.log('Formulario no válido');
      this.invoiceForm.markAllAsTouched();
    };
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
