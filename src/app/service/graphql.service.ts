import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GET_CHARACTERS_QUERY } from '../graphql/get-characters-queries';
import { GET_CHARACTER_QUERY } from '../graphql/id-chracter-queries';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private http: HttpClient) { }
  private readonly graphqlUrl = 'https://rickandmortyapi.com/graphql';

  getCharacters(filters: { name?: string; species?: string; status?: string; page?: number } = {}): Observable<{ characters: { results: any[] } }> {
    const variables: any = {
      name: filters.name || null,
      status: filters.status || null,
      species: filters.species || null,
      page: filters.page || null
    };

    return this.http.post<any>(this.graphqlUrl, { query: GET_CHARACTERS_QUERY, variables }).pipe(
      map(response => response.data?.characters ? { characters: response.data.characters } : { characters: { results: [] } })
    );
  }

  getCharacter(id: number): Observable<any> {
    const variables = { id };
    return this.http.post<any>(this.graphqlUrl, { query: GET_CHARACTER_QUERY, variables }).pipe(
      map(response => {
        const character = response.data?.character || null;
        if (character && Array.isArray(character.episode)) {
          character.episode = character.episode[0] || null;
        }
        return character;
      })
    );
  }
}
