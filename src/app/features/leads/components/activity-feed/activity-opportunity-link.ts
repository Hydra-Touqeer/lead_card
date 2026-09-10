import { Component, input, linkedSignal } from '@angular/core';
import { Popover } from 'primeng/popover';
import { Badge } from '../../../../shared/ui/badge/badge';
import { LinkedOpportunity } from '../../models/activity.model';

@Component({
  selector: 'app-activity-opportunity-link',
  imports: [Popover, Badge],
  styleUrl: './activity-opportunity-link.scss',
  template: `
    @if (current(); as opportunity) {
      <app-badge [label]="opportunity.name" [dropdown]="true" (click)="popover.toggle($event)" />
    } @else {
      <button type="button" class="link-add" (click)="popover.toggle($event)">
        + Link to opportunity
      </button>
    }

    <p-popover #popover>
      <div class="opportunity-panel">
        <div class="panel-header">Link to opportunity</div>
        @for (opportunity of options(); track opportunity.id) {
          <button
            type="button"
            class="opportunity-option"
            [class.selected]="current()?.id === opportunity.id"
            (click)="select(opportunity); popover.hide()"
          >
            {{ opportunity.name }}
          </button>
        }
      </div>
    </p-popover>
  `,
})
export class ActivityOpportunityLink {
  readonly initialLinkedOpportunity = input<LinkedOpportunity | undefined>(undefined, {
    alias: 'linkedOpportunity',
  });
  readonly options = input<LinkedOpportunity[]>([]);

  protected readonly current = linkedSignal(() => this.initialLinkedOpportunity());

  protected select(opportunity: LinkedOpportunity): void {
    this.current.set(opportunity);
  }
}
