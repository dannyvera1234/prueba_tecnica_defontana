import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  private readonly graphqlUrl = 'https://rickandmortyapi.com/graphql';

  constructor(private http: HttpClient) { }
  getCharacters(filters: { name?: string; status?: string } = {}): Observable<any> {
    const query = `
      query ($name: String, $status: String) {
        characters(filter: { name: $name, status: $status }) {
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
              residents {
                id
                name
              }
            }
            location {
              name
              residents {
                id
                name
              }
            }
            episode {
              id
              name
            }
          }
        }
      }
    `;

    const variables = {
      name: filters.name || null,
      status: filters.status || null
    };

    return this.http.post<any>(this.graphqlUrl, { query, variables });
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
            residents {
              id
              name
            }
          }
          episode {
            id
            name
          }
        }
      }
    `;

    const variables = { id };

    return this.http.post<any>(this.graphqlUrl, { query, variables });
  }

}
