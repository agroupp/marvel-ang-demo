import { Component, ChangeDetectionStrategy, model, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  readonly offset = model(0);
  readonly limit = input<number>();
  readonly total = input<number>();
}
