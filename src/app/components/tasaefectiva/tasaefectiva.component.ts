import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tasaefectiva',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
      CommonModule
  ],
  templateUrl: './tasaefectiva.component.html',
  styleUrl: './tasaefectiva.component.css'
})
export class TasaefectivaComponent implements OnInit{

  facturaForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) {
    this.facturaForm = this.fb.group({
      fechaEmision: ['', Validators.required],
      fechaPago: ['', Validators.required],
      totalFacturado: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      retencion: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      igv: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit(): void {}
  returnDashboard(){
    this.router.navigate(['/dashboard']);

  }
  goToDescount(){
    this.router.navigate(['/invoices/descuento']);

  }

  onSubmit(): void {
    if (this.facturaForm.valid) {
      console.log('Formulario enviado:', this.facturaForm.value);
      // Aquí puedes llamar a un servicio para enviar la información
    } else {
      console.log('Formulario no válido');
      this.facturaForm.markAllAsTouched();
    }
  }
}
