import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
  transform(arreglo: any[], texto, columna: string = 'title'): any[] {
    console.log('Arreglo: ', arreglo);
    console.log('Filtrar: ', texto);

    if (!texto) {
      return arreglo;
    }

    if (!arreglo) {
      return arreglo;
    }

    texto = texto.toLocaleLowerCase();

    return arreglo.filter(item =>
      item[columna].toLocaleLowerCase().includes(texto)
    );
  }
}
