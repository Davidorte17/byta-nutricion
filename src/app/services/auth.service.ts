import { inject, Injectable, signal, computed, PLATFORM_ID } from '@angular/core';
import { Observable, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userService = inject(UserService);
  private platformId = inject(PLATFORM_ID);
  private usuarioActual = signal<User | null>(this.leerUsuarioGuardado());

  usuario = this.usuarioActual.asReadonly();
  estaLogueado = computed(() => this.usuarioActual() !== null);

  login(email: string, password: string): Observable<User> {
    return this.userService.getUserByEmail(email).pipe(
      switchMap(usuarios => {
        const user = usuarios[0];

        if (user && user.password === password) {
          const usuarioNormalizado: User = { ...user, id: Number(user.id) };
          return of(usuarioNormalizado).pipe(
            tap(u => this.guardarSesion(u))
          );
        }
        return throwError(() => new Error('Credenciales incorrectas'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.usuarioActual.set(null);
  }

  private guardarSesion(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.usuarioActual.set(user);
  }

  private leerUsuarioGuardado(): User | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null; // en el servidor, no hay sesión que leer
    }
    const guardado = localStorage.getItem('user');
    return guardado ? JSON.parse(guardado) : null;
  }

  private hayUsuarioGuardado(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return localStorage.getItem('user') !== null;
  }
}