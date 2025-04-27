import { Component, inject, signal } from '@angular/core';
import { FiltersComponent, GridTableComponent } from '../../components';
import { GRAPHPL_STORE } from './store/graphpl.store';
import { TextInitialsPipe } from '../../pipe';
import { GraphplDetailsComponent } from './components';

@Component({
  selector: 'app-graphpl',
  imports: [GridTableComponent, FiltersComponent, TextInitialsPipe, GraphplDetailsComponent],
  templateUrl: './graphpl.component.html',
  styles: ``
})
export class GraphplComponent {
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

  public readonly favoriteCharacter = signal<any | null>(null);
  graphqlStore = inject(GRAPHPL_STORE);
  // public readonly isIdOpen = signal<any | null>(null);


  constructor() {
    this.graphqlStore.loadCharacters();
  }
}
