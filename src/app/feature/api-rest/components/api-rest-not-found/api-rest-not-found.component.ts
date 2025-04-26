import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-api-rest-not-found',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `<div class="text-center py-4 max-w-2xl mx-auto">
  <div class="bg-slate-50 py-4 mb-5 rounded-xl">
    <img ngSrc="src/assets/icons/not-found.svg" alt="Nothing found" width="242" height="242" priority class="mx-auto" />
  </div>
  <h3 class="text-2xl font-bold">
    No se han encontrado resultados
  </h3>
  <p class="text-balance">
    No se han encontrado resultados para la búsqueda realizada. Por favor, verifica los filtros aplicados o intenta con
    otra búsqueda.
  </p>
</div>
  `,
})
export class ApiRestNotFoundComponent {

}
