import { Location } from '@angular/common';
import { effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, EventType, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

function parseNum(src: string): string | number {
  const parsed = parseInt(src);

  return isNaN(parsed) ? src : parsed;
}

function buildQueryString(state: BrowserUrlStateType): string {
  return Object.keys(state).length
    ? '?' +
        Object.keys(state)
          .map(key => `${key}=${state[key]}`)
          .join('&')
    : '';
}

export interface BrowserUrlState {
  offset?: number;
  limit?: number;
}

type BrowserUrlStateType = BrowserUrlState & Record<string, string | number>;

@Injectable({ providedIn: 'root' })
export class BrowserUrlService {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #location = inject(Location);

  readonly $state = toSignal(
    this.#router.events.pipe(
      filter((e): e is NavigationEnd => e.type === EventType.NavigationEnd),
      switchMap(() => this.#route.queryParamMap),
      map(queryParamMap =>
        queryParamMap.keys.reduce<BrowserUrlStateType>(
          (prev, curr) => ({
            ...prev,
            ...(queryParamMap.get(curr) ? { [curr]: parseNum(queryParamMap.get(curr)!) } : {}),
          }),
          {},
        ),
      ),
    ),
    { initialValue: {} as BrowserUrlStateType },
  );

  constructor() {
    effect(() => console.log('$state', this.$state()));
  }

  update(state: BrowserUrlStateType): void {
    const path = this.#location.path().split('?')?.[0] + buildQueryString(state);

    this.#location.replaceState(path);
  }
}
