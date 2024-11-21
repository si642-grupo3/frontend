import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {UserService} from "../../services/user.service";
import {RegisterRequest} from "../../models/register.request";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  submitted = false;
  hidePassword: boolean = true;

  constructor(
      private fb: FormBuilder,
      private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      ruc: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      termsAccepted: [false, Validators.requiredTrue],
      privacyAccepted: [false, Validators.requiredTrue]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {

  }

  passwordMatchValidator(group: FormGroup): null | { mismatch: boolean } {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {

      let nombre = this.registerForm.value.nombre;
      let apellido = this.registerForm.value.apellido;
      let ruc = this.registerForm.value.ruc;
      let telefono = this.registerForm.value.telefono;
      let direccin = this.registerForm.value.direccion;
      let email = this.registerForm.value.email;
      let password = this.registerForm.value.password;

      console.log('Formulario enviado', this.registerForm.value);

      const registerRequest = new RegisterRequest(nombre, apellido, ruc, telefono, direccin, email, password);
      this.userService.createUser(registerRequest).subscribe(
          (response) =>{
            console.log('Usuario creado con extio', response);
            this.registerForm.reset();
          },
          (error) =>{
            console.log('Error al crear el usuario', error);
          }
      );
    } else {
      console.log('Formulario no válido');
      this.registerForm.markAllAsTouched();
    }
  }
}
