import { CdkTable, CdkCell, CdkCellDef, CdkColumnDef, CdkRow, CdkRowDef } from '@angular/cdk/table';
import { Component, ChangeDetectionStrategy, inject, DestroyRef, signal, afterNextRender } from '@angular/core';
import { Character, CharactersService } from '../characters.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';

// interface PaginationState {
//   offset: number;
//   limit: number;
//   total: number;
// }

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-characters-feature',
  standalone: true,
  imports: [CdkTable, CdkCell, CdkCellDef, CdkColumnDef, CdkRow, CdkRowDef, NgOptimizedImage],
  templateUrl: './characters-feature.component.html',
  styleUrl: './characters-feature.component.scss',
})
export class CharactersFeatureComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #charactersService = inject(CharactersService);

  readonly columns = ['thumbnail', 'name', 'description'];

  readonly $busy = signal(false);
  readonly $entities = signal<Character[]>([]);

  constructor() {
    afterNextRender(() => this.refresh());
  }

  refresh(): void {
    this.$busy.set(true);
    this.#charactersService
      .readAll()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        finalize(() => this.$busy.set(false)),
      )
      .subscribe(({ results }) => {
        this.$entities.set(results);
      });
  }
}
