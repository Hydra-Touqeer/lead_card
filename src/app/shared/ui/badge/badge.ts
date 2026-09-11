import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import ArrowDown01Icon from '@hugeicons/core-free-icons/ArrowDown01Icon';
import { AppIcon } from '../icon/icon';

@Component({
  selector: 'app-badge',
  imports: [AppIcon, NgTemplateOutlet],
  styleUrl: './badge.scss',
  template: `
    @if (dropdown()) {
      <button type="button" class="badge">
        <ng-container *ngTemplateOutlet="content" />
      </button>
    } @else {
      <span class="badge">
        <ng-container *ngTemplateOutlet="content" />
      </span>
    }

    <ng-template #content>
      @if (avatarInitials()) {
        <span class="avatar">{{ avatarInitials() }}</span>
      } @else if (dotColor()) {
        <span class="dot" [style.background]="dotColor()"></span>
      }
      {{ label() }}
      @if (dropdown()) {
        <app-icon [icon]="chevronIcon" [size]="14" />
      }
    </ng-template>
  `,
})
export class Badge {
  readonly label = input.required<string>();
  readonly dotColor = input<string>();
  readonly avatarInitials = input<string>();
  readonly dropdown = input(false);

  protected readonly chevronIcon = ArrowDown01Icon;
}
