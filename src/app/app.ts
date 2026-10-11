import { Component, signal } from '@angular/core';
import { Galeria } from './galeria/galeria';

@Component({
  selector: 'app-root',
  imports: [Galeria],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // El modo claro es el valor inicial. La preferencia se recupera si existe.
  readonly modoOscuro = signal(this.leerPreferencia());

  private leerPreferencia(): boolean {
    try {
      return localStorage.getItem('galeria-tema') === 'oscuro';
    } catch {
      return false;
    }
  }

  cambiarTema(): void {
    const nuevoValor = !this.modoOscuro();
    this.modoOscuro.set(nuevoValor);
    try {
      localStorage.setItem('galeria-tema', nuevoValor ? 'oscuro' : 'claro');
    } catch {
      // La galería sigue funcionando si el navegador bloquea el almacenamiento.
    }
  }
}
