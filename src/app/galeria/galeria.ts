import {
  Component,
  HostListener,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Imagen } from '../imagen/imagen';

interface Fotografia {
  id: number;
  titulo: string;
  categoria: string;
  descripcion: string;
  url: string;
}

@Component({
  selector: 'app-galeria',
  imports: [Imagen],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria {

  fotografias: Fotografia[] = [
    {
      id: 1,
      titulo: 'Infraestructura de red',
      categoria: 'Redes',
      descripcion: 'Equipos de comunicaciones e interconexión de sistemas.',
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900'
    },
    {
      id: 2,
      titulo: 'Centro de datos',
      categoria: 'Sistemas',
      descripcion: 'Servidores que proporcionan servicios y almacenamiento.',
      url: 'https://images.unsplash.com/photo-1586772002345-339f8042a777?w=900'
    },
    {
      id: 3,
      titulo: 'Seguridad informática',
      categoria: 'Ciberseguridad',
      descripcion: 'Protección de la información y los sistemas.',
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900'
    },
    {
      id: 4,
      titulo: 'Programación',
      categoria: 'Desarrollo',
      descripcion: 'Desarrollo de aplicaciones mediante código.',
      url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900'
    },
    {
      id: 5,
      titulo: 'Equipos informáticos',
      categoria: 'Sistemas',
      descripcion: 'Hardware utilizado en entornos tecnológicos.',
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900'
    },
    {
      id: 6,
      titulo: 'Conectividad',
      categoria: 'Redes',
      descripcion: 'Comunicaciones y conexiones entre dispositivos.',
      url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900'
    }
  ];

// Categorías disponibles para filtrar la galería.
categorias: string[] = [
  'Todas',
  'Redes',
  'Sistemas',
  'Ciberseguridad',
  'Desarrollo'
];

// Al comenzar, se muestran todas las fotografías.
categoriaSeleccionada: string = 'Todas';

// Cambia la categoría cuando el usuario pulsa un botón.
seleccionarCategoria(categoria: string): void {
  this.categoriaSeleccionada = categoria;
}

// Devuelve únicamente las fotografías de la categoría elegida.
get fotografiasFiltradas(): Fotografia[] {

  if (this.categoriaSeleccionada === 'Todas') {
    return this.fotografias;
  }

  return this.fotografias.filter(
    foto => foto.categoria === this.categoriaSeleccionada
  );
}

// Referencia al botón que cierra el visor.
@ViewChild('botonCerrar')
botonCerrar?: ElementRef<HTMLButtonElement>;

// Fotografía que se está mostrando ampliada.
fotografiaAmpliada: Fotografia | null = null;

// Guarda el botón desde el que se abrió la fotografía.
private elementoAnterior: HTMLElement | null = null;

// Abre el visor y traslada el foco al botón de cierre.
abrirVisor(foto: Fotografia): void {
  this.elementoAnterior =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

  this.fotografiaAmpliada = foto;

  // Esperamos a que Angular haya creado el visor en el HTML.
  setTimeout(() => {
    this.botonCerrar?.nativeElement.focus();
  }, 0);
}

// Cierra el visor y devuelve el foco al elemento anterior.
cerrarVisor(): void {
  if (this.fotografiaAmpliada === null) {
    return;
  }

  this.fotografiaAmpliada = null;

  const elemento = this.elementoAnterior;
  this.elementoAnterior = null;

  setTimeout(() => {
    elemento?.focus();
  }, 0);
}

// Permite cerrar el visor pulsando Escape.
@HostListener('document:keydown.escape')
cerrarConEscape(): void {
  if (this.fotografiaAmpliada !== null) {
    this.cerrarVisor();
  }
}

// Evita que Tab desplace el foco a la página situada detrás.
@HostListener('document:keydown.tab', ['$event'])
controlarTabulacion(evento: Event): void {
  if (this.fotografiaAmpliada === null) {
    return;
  }

  evento.preventDefault();
  this.botonCerrar?.nativeElement.focus();
}

}

