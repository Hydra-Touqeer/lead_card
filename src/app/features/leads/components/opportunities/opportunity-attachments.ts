import { Component, input, viewChild } from '@angular/core';
import PaperclipIcon from '@hugeicons/core-free-icons/PaperclipIcon';
import { Popover } from 'primeng/popover';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { OpportunityAttachment } from '../../models/opportunity.model';

@Component({
  selector: 'app-opportunity-attachments',
  imports: [AppIcon, Popover],
  styleUrl: './opportunity-attachments.scss',
  template: `
    @if (attachments().length > 0) {
      <button
        type="button"
        class="attachment-trigger"
        [attr.aria-label]="
          attachments().length + ' attachment' + (attachments().length === 1 ? '' : 's')
        "
        (click)="popover.toggle($event)"
      >
        <app-icon [icon]="attachmentIcon" [size]="16" />
        <span class="count">{{ attachments().length }}</span>
      </button>
    }

    <p-popover #popover>
      <div class="attachments-panel">
        <div class="panel-header">
          {{ attachments().length }} attachment{{ attachments().length === 1 ? '' : 's' }}
        </div>
        <div class="attachment-list">
          @for (attachment of attachments(); track attachment.id) {
            <div class="attachment">{{ attachment.name }}</div>
          }
        </div>
      </div>
    </p-popover>
  `,
})
export class OpportunityAttachments {
  readonly attachments = input<OpportunityAttachment[]>([]);

  protected readonly attachmentIcon = PaperclipIcon;

  private readonly popoverRef = viewChild.required(Popover);

  openPanel(anchor: HTMLElement): void {
    this.popoverRef().show(undefined, anchor);
  }
}
