import { Component, signal } from '@angular/core';
import { GraphqlService } from '../../service';
import { FiltersComponent, GridTableComponent } from '../../components';

@Component({
  selector: 'app-graphpl',
  standalone: true,
  imports: [GridTableComponent,FiltersComponent],
  templateUrl: './graphpl.component.html',
  styles: ``
})
export class GraphplComponent {
  public readonly loading = signal(false);
  public readonly characters = signal<null | any>(null);
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
  public readonly isIdOpen = signal<any | null>(null);

  constructor(private graphqlService: GraphqlService) {
    // Example usage of the GraphqlService to fetch characters
    this.loadCharacters();
  }



  loadCharacters(filters: { name?: string; status?: string } = {}) {
    this.graphqlService.getCharacters(filters).subscribe(data => {
      console.log(data);
    });
  }


}
