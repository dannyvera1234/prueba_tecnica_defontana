import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { finalize, mergeMap, of } from 'rxjs';
import { RickAndMortyService } from '../../service';
import { ApiRestDetailsComponent } from './components';
import { FiltersComponent, GridTableComponent, TotalesComponent } from '../../components';
import { ApiResponse } from '../../interface/characters.interface';

@Component({
  selector: 'app-api-rest',
  imports: [
    ReactiveFormsModule,
    FiltersComponent,
    TotalesComponent,
    GridTableComponent,
    ApiRestDetailsComponent,
  ],
  templateUrl: './api-rest.component.html',
  styles: ``
})
export class ApiRestComponent {
  public readonly loading = signal(false);
  public readonly characters = signal<null | ApiResponse>(null);
  public readonly favoriteCharacter = signal<any | null>(null);
  public readonly isIdOpen = signal<any | null>(null);
  public readonly speciesCount = signal<Record<string, number>>({});
  public readonly typeCount = signal<Record<string, number>>({});

  public readonly heards = [
    { key: 'fav', label: 'Favorite' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'species', label: 'Species' },
    { key: 'type', label: 'Type' },
    { key: 'gender', label: 'Genero' },
    { key: 'created', label: 'Creado' },
    { key: 'action', label: 'Action' },
  ];


  constructor(private service: RickAndMortyService) {
    this.loadCharacters();
  }

  loadCharacters(filters: any = {}) {
    of(this.loading.set(true)).pipe(
      mergeMap(() => this.service.getCharacters(filters)),
      finalize(() => this.loading.set(false))
    ).subscribe(
      res => {
        console.log(res)
        this.characters.set(res);
        // Contar las especies
        const speciesCount = res.results.reduce((acc: any, character: any) => {
          const species = character.species || 'Desconocido';
          acc[species] = (acc[species] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Contar los tipos
        const typeCount = res.results.reduce((acc: any, character: any) => {
          const type = character.type || 'Sin tipo';
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Actualizar los contadores en alguna propiedad (si es necesario)
        this.speciesCount.set(speciesCount);
        this.typeCount.set(typeCount);
      },
    );
  }




}
