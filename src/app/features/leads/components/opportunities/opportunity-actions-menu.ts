import { Component, ElementRef, output, viewChild } from '@angular/core';
import Attachment01Icon from '@hugeicons/core-free-icons/Attachment01Icon';
import Comment01Icon from '@hugeicons/core-free-icons/Comment01Icon';
import Delete02Icon from '@hugeicons/core-free-icons/Delete02Icon';
import MoreVerticalIcon from '@hugeicons/core-free-icons/MoreVerticalIcon';
import PencilEdit02Icon from '@hugeicons/core-free-icons/PencilEdit02Icon';
import { Popover } from 'primeng/popover';
import { AppIcon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-opportunity-actions-menu',
  imports: [AppIcon, Popover],
  styleUrl: './opportunity-actions-menu.scss',
  template: `
    <button
      #kebabBtn
      type="button"
      class="kebab-trigger"
      aria-label="More actions"
      (click)="menu.toggle($event)"
    >
      <app-icon [icon]="moreIcon" [size]="16" />
    </button>

    <p-popover #menu>
      <div class="menu-panel">
        <button type="button" class="menu-item" (click)="edit.emit(); menu.hide()">
          <app-icon [icon]="editIcon" [size]="16" />
          Edit opportunity
        </button>
        <button type="button" class="menu-item" (click)="addAttachment.emit(); menu.hide()">
          <app-icon [icon]="attachmentIcon" [size]="16" />
          Add attachment
        </button>
        <button type="button" class="menu-item" (click)="addComment.emit(); menu.hide()">
          <app-icon [icon]="commentIcon" [size]="16" />
          Add comment
        </button>
        <hr class="menu-divider" />
        <button type="button" class="menu-item destructive" (click)="delete.emit(); menu.hide()">
          <app-icon [icon]="deleteIcon" [size]="16" />
          Delete
        </button>
      </div>
    </p-popover>
  `,
})
export class OpportunityActionsMenu {
  readonly edit = output<void>();
  readonly addAttachment = output<void>();
  readonly addComment = output<void>();
  readonly delete = output<void>();

  readonly kebabBtn = viewChild.required<ElementRef<HTMLButtonElement>>('kebabBtn');

  protected readonly moreIcon = MoreVerticalIcon;
  protected readonly editIcon = PencilEdit02Icon;
  protected readonly attachmentIcon = Attachment01Icon;
  protected readonly commentIcon = Comment01Icon;
  protected readonly deleteIcon = Delete02Icon;
}
