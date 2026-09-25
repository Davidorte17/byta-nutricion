import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userService = inject(UserService);

  private logueado = signal<boolean>(false);
  private nombreUsuario = signal<string | null>(localStorage.getItem('nombre'));

  estaLogueado = this.logueado.asReadonly();
  nombre = this.nombreUsuario.asReadonly();


  login(email: string, password: string): Observable<User> {
    return this.userService.getUserByEmail(email).pipe(
      switchMap(usuarios => {
        const user = usuarios[0];

        if (user && user.password === password) {
          return of(user);
        }
        return throwError(() => new Error('Credenciales incorrectas'));
      })
    );
  }

  private guardarSesion(user: Observable<User>): void{
    localStorage.setItem('idUser');
  }
}
