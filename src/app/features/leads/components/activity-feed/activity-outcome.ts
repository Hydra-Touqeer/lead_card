import { Component, input, linkedSignal } from '@angular/core';
import { Popover } from 'primeng/popover';
import { ActivityOutcome, ActivityOutcomeOption } from '../../models/activity.model';

@Component({
  selector: 'app-activity-outcome',
  imports: [Popover],
  styleUrl: './activity-outcome.scss',
  template: `
    @if (current(); as outcome) {
      <button type="button" class="outcome-label" (click)="popover.toggle($event)">
        ({{ outcome.label }})
      </button>
    } @else {
      <button type="button" class="outcome-add" (click)="popover.toggle($event)">+ Outcome</button>
    }

    <p-popover #popover>
      <div class="outcome-panel">
        <div class="panel-header">Select outcome</div>
        @for (option of options(); track option.label) {
          <button
            type="button"
            class="outcome-option"
            [class.selected]="current()?.label === option.label"
            (click)="select(option); popover.hide()"
          >
            {{ option.label }}
          </button>
        }
      </div>
    </p-popover>
  `,
})
export class ActivityOutcomeComponent {
  readonly initialOutcome = input<ActivityOutcome | undefined>(undefined, { alias: 'outcome' });
  readonly options = input<ActivityOutcomeOption[]>([]);

  protected readonly current = linkedSignal(() => this.initialOutcome());

  protected select(option: ActivityOutcomeOption): void {
    this.current.set({ label: option.label });
  }
}
