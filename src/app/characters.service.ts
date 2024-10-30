import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL, MarvelApiResponse } from './marvel-api';
import { map, Observable } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: { extension: string; path: string };
}

@Injectable({ providedIn: 'root' })
export class CharactersService {
  readonly #http = inject(HttpClient);

  readAll(offset = 0, limit = 10): Observable<MarvelApiResponse<Character>> {
    const params = new HttpParams({ fromObject: { offset, limit } });

    return this.#http
      .get<{ data: MarvelApiResponse<Character> }>(`${API_URL}/characters`, { params })
      .pipe(map(({ data }) => data));
  }
}
