import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatGridListModule, MatIconModule, CommonModule, MatCardModule, MatToolbarModule,],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup;
    submitted = false;
    hidePassword: boolean = true;
    loginError: string | null = null;

    constructor(private fb: FormBuilder, private authService: UserService, // Servicio para manejar autenticación
                private router: Router) {
        // Crear formulario para login
        this.loginForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onLogin(): void {
        this.submitted = true;

        if (this.loginForm.valid) {
            const {email, password} = this.loginForm.value;

            console.log('Intentando iniciar sesión con:', email, password); //to be removed

            // Llamar al servicio de autenticación
            this.authService.login(email, password).subscribe((response) => {
                console.log('Inicio de sesión exitoso', response); //to be removed

                sessionStorage.setItem('user', JSON.stringify(response));
                console.log(sessionStorage.getItem('user')); //to be removed
                this.loginError = null;
                this.router.navigate(['/dashboard']);
            }, (error) => {
                console.error('Error al iniciar sesión', error);
                this.loginError = 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
            });
        } else {
            console.log('Formulario no válido');
            this.loginForm.markAllAsTouched();
        }
    }

    navigateToRegister() {
        this.router.navigate(['/register']);
    }
}
