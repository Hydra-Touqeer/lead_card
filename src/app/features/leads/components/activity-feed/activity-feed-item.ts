import { Component, input } from '@angular/core';
import { UserIcon } from '@hugeicons/core-free-icons';
import { Badge } from '../../../../shared/ui/badge/badge';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { ActivityItem } from '../../models/activity.model';

@Component({
  selector: 'app-activity-feed-item',
  imports: [AppIcon, Badge],
  styleUrl: './activity-feed-item.scss',
  template: `
    <div class="feed-item">
      <div class="avatar-wrap">
        <div class="avatar">
          <app-icon [icon]="userIcon" [size]="20" />
        </div>
        @if (!isLast()) {
          <div class="connector"></div>
        }
      </div>

      <div class="content">
        <div class="text-row">
          <span class="title">{{ item().title }}</span>
          @for (tag of item().tags; track tag.label) {
            <app-badge [label]="tag.label" [dotColor]="tag.dotColor" [dropdown]="!!tag.dropdown" />
          }
          @if (item().timestamp) {
            <span class="timestamp">{{ item().timestamp }}</span>
          }
        </div>

        @if (item().description) {
          <p class="description">{{ item().description }}</p>
        }

        @if (item().meta) {
          <p class="meta">
            @for (segment of item().meta; track segment.text) {
              <span [class.emphasis]="segment.emphasis">{{ segment.text }}</span>
            }
          </p>
        }
      </div>
    </div>
  `,
})
export class ActivityFeedItem {
  readonly item = input.required<ActivityItem>();
  readonly isLast = input<boolean>(false);

  protected readonly userIcon = UserIcon;
}
