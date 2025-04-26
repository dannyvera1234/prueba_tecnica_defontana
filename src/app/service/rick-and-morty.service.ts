import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(filters: { [param: string]: string | number | boolean }): Observable<any> {
    const params = new HttpParams({ fromObject: filters });

    return this.http.get<any>(`${this.apiUrl}/character`, { params });
  }


  getCharacter(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/${id}`);
  }

  getLocation(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/location/${id}`);
  }

  getEpisode(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/episode/${id}`);
  }
}
