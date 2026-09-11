import { Component, input, linkedSignal } from '@angular/core';
import { Popover } from 'primeng/popover';
import { Badge } from '../../../../shared/ui/badge/badge';

@Component({
  selector: 'app-status-badge-select',
  imports: [Popover, Badge],
  styleUrl: './status-badge-select.scss',
  template: `
    <!--
      The click handler goes on this wrapping span, not on app-badge directly:
      Badge's host is "display: contents" (so it doesn't add an extra box
      inside flex layouts), which means it has no geometry of its own. A
      popover anchored to an element with no box positions at (0, 0).
    -->
    <span class="badge-trigger" (click)="popover.toggle($event)">
      <app-badge [label]="current()" [dotColor]="dotColor()" [dropdown]="true" />
    </span>

    <p-popover #popover>
      <div class="status-panel">
        <div class="panel-header">Change status</div>
        @for (option of options(); track option) {
          <button
            type="button"
            class="status-option"
            [class.selected]="current() === option"
            (click)="select(option); popover.hide()"
          >
            {{ option }}
          </button>
        }
      </div>
    </p-popover>
  `,
})
export class StatusBadgeSelect {
  readonly initialLabel = input.required<string>({ alias: 'label' });
  readonly dotColor = input<string>();
  readonly options = input<string[]>([]);

  protected readonly current = linkedSignal(() => this.initialLabel());

  protected select(option: string): void {
    this.current.set(option);
  }
}
