import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-imagen',
  imports: [],
  templateUrl: './imagen.html',
  styleUrl: './imagen.css',
})
export class Imagen {

  // Datos recibidos desde el componente Galeria.
  titulo = input.required<string>();
  categoria = input.required<string>();
  descripcion = input.required<string>();
  url = input.required<string>();

  // Evento que comunica que el usuario ha seleccionado una imagen.
  seleccionada = output<void>();

  abrirImagen(): void {
    this.seleccionada.emit();
  }

}
