import { Component, input, linkedSignal, output, viewChild } from '@angular/core';
import { Popover } from 'primeng/popover';
import { Tooltip } from 'primeng/tooltip';
import { Badge } from '../../../../shared/ui/badge/badge';
import { LinkedOpportunity } from '../../models/activity.model';

@Component({
  selector: 'app-activity-opportunity-link',
  imports: [Popover, Badge, Tooltip],
  styleUrl: './activity-opportunity-link.scss',
  template: `
    @if (current(); as opportunity) {
      <!--
        The click handler goes on this wrapping span, not on app-badge directly:
        Badge's host is "display: contents" (so it doesn't add an extra box
        inside flex layouts), which means it has no geometry of its own. A
        popover anchored to an element with no box positions at (0, 0).
      -->
      <span
        class="badge-trigger"
        pTooltip="Linked opportunity"
        tooltipPosition="top"
        (click)="popover.toggle($event)"
      >
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
        @if (current()) {
          <div class="panel-divider"></div>
          <button type="button" class="remove-option" (click)="remove(); popover.hide()">
            Remove opportunity
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
  readonly linkedOpportunityChange = output<LinkedOpportunity | undefined>();

  protected readonly current = linkedSignal(() => this.initialLinkedOpportunity());

  private readonly popoverRef = viewChild.required(Popover);

  protected select(opportunity: LinkedOpportunity): void {
    this.current.set(opportunity);
    this.linkedOpportunityChange.emit(opportunity);
  }

  protected remove(): void {
    this.current.set(undefined);
    this.linkedOpportunityChange.emit(undefined);
  }

  openPanel(anchor: HTMLElement): void {
    this.popoverRef().show(undefined, anchor);
  }
}
