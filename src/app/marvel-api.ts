import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

// export const API_URL = 'http://gateway.marvel.com/v1/public';
export const API_URL = 'http://localhost:3000/v1/public';
export const PUBLIC_KEY = '00cbd4287eb471e614f1c2822baf9181';
export const DEFAULT_LIMIT = 20;

export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req.clone({ params: req.params.set('apikey', PUBLIC_KEY) }));
}

export interface MarvelApiResponse<T> {
  results: T[];
  total: number;
}
