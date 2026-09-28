import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  mail: string = '';
  password: string = '';
  mensajeError: string = '';

  iniciarSesion(): void {
    this.authService.login(this.mail, this.password).subscribe({
      next: () => {
        this.router.navigate(['perfil']);
      },
      error: () => {
        this.mensajeError = 'Email o contraseña incorrectos';
      }
    });
  }
}