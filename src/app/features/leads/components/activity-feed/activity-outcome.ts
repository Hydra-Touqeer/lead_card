import { Component, input, linkedSignal, output, viewChild } from '@angular/core';
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
        @if (current()) {
          <div class="panel-divider"></div>
          <button type="button" class="remove-option" (click)="remove(); popover.hide()">
            Remove outcome
          </button>
        }
      </div>
    </p-popover>
  `,
})
export class ActivityOutcomeComponent {
  readonly initialOutcome = input<ActivityOutcome | undefined>(undefined, { alias: 'outcome' });
  readonly options = input<ActivityOutcomeOption[]>([]);
  readonly outcomeChange = output<ActivityOutcome | undefined>();

  protected readonly current = linkedSignal(() => this.initialOutcome());

  private readonly popoverRef = viewChild.required(Popover);

  protected select(option: ActivityOutcomeOption): void {
    this.current.set({ label: option.label });
    this.outcomeChange.emit(this.current());
  }

  protected remove(): void {
    this.current.set(undefined);
    this.outcomeChange.emit(undefined);
  }

  openPanel(anchor: HTMLElement): void {
    this.popoverRef().show(undefined, anchor);
  }
}
