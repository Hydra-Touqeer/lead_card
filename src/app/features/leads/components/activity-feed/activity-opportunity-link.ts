import { Component, input, linkedSignal, viewChild } from '@angular/core';
import { Popover } from 'primeng/popover';
import { Badge } from '../../../../shared/ui/badge/badge';
import { LinkedOpportunity } from '../../models/activity.model';

@Component({
  selector: 'app-activity-opportunity-link',
  imports: [Popover, Badge],
  styleUrl: './activity-opportunity-link.scss',
  template: `
    @if (current(); as opportunity) {
      <!--
        The click handler goes on this wrapping span, not on app-badge directly:
        Badge's host is "display: contents" (so it doesn't add an extra box
        inside flex layouts), which means it has no geometry of its own. A
        popover anchored to an element with no box positions at (0, 0).
      -->
      <span class="badge-trigger" (click)="popover.toggle($event)">
        <app-badge [label]="opportunity.name" [dropdown]="true" />
      </span>
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

  private readonly popoverRef = viewChild.required(Popover);

  protected select(opportunity: LinkedOpportunity): void {
    this.current.set(opportunity);
  }

  openPanel(anchor: HTMLElement): void {
    this.popoverRef().show(undefined, anchor);
  }
}
