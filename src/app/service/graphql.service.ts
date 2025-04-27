import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private http: HttpClient) { }
  private readonly graphqlUrl = 'https://rickandmortyapi.com/graphql';

  getCharacters(filters: { name?: string; species?: string; status?: string; page?: number } = {}): Observable<{ characters: { results: any[] } }> {
    const query = `
      query ($name: String, $species: String, $status: String, $page: Int) {
        characters(filter: { name: $name, species: $species, status: $status }, page: $page) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            status
            species
            type
            gender
            image
            created
            origin {
              name
            }
            location {
              name
            }
            episode {
              id
              name
            }
          }
        }
      }
    `;

    // Preparamos las variables de la consulta
    const variables: any = {
      name: filters.name || null,
      status: filters.status || null,
      species: filters.species || null
    };

    // Solo incluimos el parámetro page si está definido en los filtros
    if (filters.page) {
      variables.page = filters.page;
    }

    return this.http.post<any>(this.graphqlUrl, { query, variables }).pipe(
      map(response => response.data?.characters ? { characters: response.data.characters } : { characters: { results: [] } })
    );
  }


  getCharacter(id: number): Observable<any> {
    const query = `
      query ($id: ID!) {
        character(id: $id) {
          id
          name
          status
          species
          type
          gender
          image
          created
          origin {
            name
            residents {
              id
              name
            }
          }
          location {
            name
            dimension
            type
            residents {
              id
              name
            }
          }
          episode {
            id
            name
            air_date
            episode
          }
        }
      }
    `;

    const variables = { id };

    return this.http.post<any>(this.graphqlUrl, { query, variables }).pipe(
      map(response => {
        const character = response.data?.character || null;
        if (character && Array.isArray(character.episode)) {
          // Solo dejar el primer episodio
          character.episode = character.episode[0] || null;
        }
        return character;
      })
    );
  }

}
