import { NgTemplateOutlet } from '@angular/common';
import { Component, input, linkedSignal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Comment01Icon from '@hugeicons/core-free-icons/Comment01Icon';
import Delete02Icon from '@hugeicons/core-free-icons/Delete02Icon';
import SentIcon from '@hugeicons/core-free-icons/SentIcon';
import { Avatar } from 'primeng/avatar';
import { Popover } from 'primeng/popover';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { ActivityComment, ActivityPerson } from '../../models/activity.model';

@Component({
  selector: 'app-activity-comments',
  imports: [NgTemplateOutlet, FormsModule, AppIcon, Avatar, Popover],
  styleUrl: './activity-comments.scss',
  template: `
    <ng-template #commentsContent>
      @if (comments().length > 0) {
        <div class="comment-list">
          @for (comment of comments(); track comment.id) {
            <div class="comment">
              <p-avatar [image]="comment.author.avatarUrl" shape="circle" />
              <div class="comment-body">
                <div class="comment-meta">
                  <span class="comment-author">{{ comment.author.name }}</span>
                  <span class="comment-time">{{ comment.timestamp }}</span>
                  @if (comment.author.name === currentUser().name) {
                    <button
                      type="button"
                      class="comment-delete"
                      aria-label="Delete comment"
                      (click)="removeComment(comment.id)"
                    >
                      <app-icon [icon]="deleteIcon" [size]="14" />
                    </button>
                  }
                </div>
                <p class="comment-text">{{ comment.text }}</p>
              </div>
            </div>
          }
        </div>
      }

      <div class="add-comment">
        <p-avatar [image]="currentUser().avatarUrl" shape="circle" />
        <input
          type="text"
          placeholder="Add a comment"
          [(ngModel)]="draft"
          (keydown.enter)="submit()"
        />
        @if (draft.trim().length > 0) {
          <button type="button" class="send-button" aria-label="Send comment" (click)="submit()">
            <app-icon [icon]="sendIcon" [size]="16" />
          </button>
        }
      </div>
    </ng-template>

    @if (inline()) {
      <div class="comments-panel inline">
        <ng-container *ngTemplateOutlet="commentsContent" />
      </div>
    } @else {
      @if (comments().length > 0) {
        <button
          type="button"
          class="comment-trigger"
          [attr.aria-label]="comments().length + ' comment' + (comments().length === 1 ? '' : 's')"
          (click)="popover.toggle($event)"
        >
          <app-icon [icon]="commentIcon" [size]="16" />
          <span class="count">{{ comments().length }}</span>
        </button>
      }

      <p-popover #popover>
        <div class="comments-panel">
          <div class="panel-header">
            {{ comments().length }} comment{{ comments().length === 1 ? '' : 's' }}
          </div>
          <ng-container *ngTemplateOutlet="commentsContent" />
        </div>
      </p-popover>
    }
  `,
})
export class ActivityComments {
  readonly initialComments = input<ActivityComment[]>([], { alias: 'comments' });
  readonly currentUser = input.required<ActivityPerson>();
  readonly inline = input(false);

  protected readonly comments = linkedSignal(() => this.initialComments());
  protected draft = '';

  protected readonly commentIcon = Comment01Icon;
  protected readonly sendIcon = SentIcon;
  protected readonly deleteIcon = Delete02Icon;

  private readonly popoverRef = viewChild.required(Popover);

  openPanel(anchor: HTMLElement): void {
    this.popoverRef().show(undefined, anchor);
  }

  protected submit(): void {
    const text = this.draft.trim();
    if (!text) {
      return;
    }
    this.comments.update((list) => [
      ...list,
      { id: crypto.randomUUID(), author: this.currentUser(), text, timestamp: 'Just now' },
    ]);
    this.draft = '';
  }

  protected removeComment(id: string): void {
    this.comments.update((list) => list.filter((comment) => comment.id !== id));
  }
}
