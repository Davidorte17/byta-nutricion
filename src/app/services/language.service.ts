import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Idioma = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);

  private idiomaActual = signal<Idioma>(this.leerIdiomaGuardado());
  idioma = this.idiomaActual.asReadonly();

  constructor() {
    this.translate.use(this.idiomaActual());
  }

  cambiar(idioma: Idioma): void {
    this.idiomaActual.set(idioma);
    this.translate.use(idioma);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('idioma', idioma);
    }
  }

  private leerIdiomaGuardado(): Idioma {
    if (!isPlatformBrowser(this.platformId)) return 'es';
    return localStorage.getItem('idioma') === 'en' ? 'en' : 'es';
  }
}