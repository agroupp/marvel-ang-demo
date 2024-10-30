import { CdkTable, CdkCell, CdkCellDef, CdkColumnDef, CdkRow, CdkRowDef } from '@angular/cdk/table';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  ResourceStatus,
  effect,
  linkedSignal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CharactersService } from '../characters.service';
import { NgOptimizedImage } from '@angular/common';
import { PaginatorComponent } from '../ui/paginator/paginator.component';
import { DEFAULT_LIMIT } from '../marvel-api';
import { BrowserUrlService } from '../browser-url.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-characters-feature',
  standalone: true,
  imports: [CdkTable, CdkCell, CdkCellDef, CdkColumnDef, CdkRow, CdkRowDef, NgOptimizedImage, PaginatorComponent],
  templateUrl: './characters-feature-new.component.html',
  styleUrl: './characters-feature-new.component.scss',
})
export class CharactersFeatureNewComponent {
  readonly #charactersService = inject(CharactersService);
  readonly #browserUrlService = inject(BrowserUrlService);

  readonly columns = ['thumbnail', 'name', 'description'];

  readonly $offset = linkedSignal(() => this.#browserUrlService.$state().offset ?? 0);
  readonly $limit = linkedSignal(() => this.#browserUrlService.$state().limit ?? DEFAULT_LIMIT);
  readonly resource = rxResource({
    request: () => ({ offset: this.$offset(), limit: this.$limit() }),
    loader: ({ request }) => this.#charactersService.readAll(request.offset, request.limit),
  });
  readonly $busy = computed(() => this.resource.status() === ResourceStatus.Loading);
  readonly $entities = computed(() => this.resource.value()?.results ?? []);
  readonly $total = computed(() => this.resource.value()?.total ?? 0);

  constructor() {
    effect(() => this.#browserUrlService.update({ offset: this.$offset(), limit: this.$limit() }));
  }
}
