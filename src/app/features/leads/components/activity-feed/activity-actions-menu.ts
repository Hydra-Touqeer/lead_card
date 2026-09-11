import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { Comment01Icon, Copy01Icon, Delete02Icon, Link04Icon, MoreVerticalIcon, Tick02Icon } from '@hugeicons/core-free-icons';
import { Popover } from 'primeng/popover';
import { AppIcon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-activity-actions-menu',
  imports: [AppIcon, Popover],
  styleUrl: './activity-actions-menu.scss',
  template: `
    <button #kebabBtn type="button" class="kebab-trigger" aria-label="More actions" (click)="menu.toggle($event)">
      <app-icon [icon]="moreIcon" [size]="16" />
    </button>

    <p-popover #menu>
      <div class="menu-panel">
        @if (!hasComments()) {
          <button type="button" class="menu-item" (click)="addComment.emit(); menu.hide()">
            <app-icon [icon]="commentIcon" [size]="16" />
            Add comment
          </button>
        }
        @if (supportsOutcome() && !hasOutcome()) {
          <button type="button" class="menu-item" (click)="setOutcome.emit(); menu.hide()">
            <app-icon [icon]="outcomeIcon" [size]="16" />
            Set outcome
          </button>
        }
        @if (supportsOpportunityLink() && !hasLinkedOpportunity()) {
          <button type="button" class="menu-item" (click)="linkOpportunity.emit(); menu.hide()">
            <app-icon [icon]="linkIcon" [size]="16" />
            Link to opportunity
          </button>
        }
        <hr class="menu-divider" />
        <button type="button" class="menu-item" (click)="copyLink.emit(); menu.hide()">
          <app-icon [icon]="copyIcon" [size]="16" />
          Copy link
        </button>
        <button type="button" class="menu-item destructive" (click)="deleteActivity.emit(); menu.hide()">
          <app-icon [icon]="deleteIcon" [size]="16" />
          Delete
        </button>
      </div>
    </p-popover>
  `,
})
export class ActivityActionsMenu {
  readonly hasComments = input.required<boolean>();
  readonly hasOutcome = input.required<boolean>();
  readonly hasLinkedOpportunity = input.required<boolean>();
  readonly supportsOutcome = input.required<boolean>();
  readonly supportsOpportunityLink = input.required<boolean>();

  readonly addComment = output<void>();
  readonly setOutcome = output<void>();
  readonly linkOpportunity = output<void>();
  readonly copyLink = output<void>();
  readonly deleteActivity = output<void>();

  readonly kebabBtn = viewChild.required<ElementRef<HTMLButtonElement>>('kebabBtn');

  protected readonly moreIcon = MoreVerticalIcon;
  protected readonly commentIcon = Comment01Icon;
  protected readonly outcomeIcon = Tick02Icon;
  protected readonly linkIcon = Link04Icon;
  protected readonly copyIcon = Copy01Icon;
  protected readonly deleteIcon = Delete02Icon;
}
