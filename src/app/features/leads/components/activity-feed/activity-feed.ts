import { Component, input } from '@angular/core';
import { ActivityGroup } from '../../models/activity.model';
import { ActivityFeedItem } from './activity-feed-item';

@Component({
  selector: 'app-activity-feed',
  imports: [ActivityFeedItem],
  styleUrl: './activity-feed.scss',
  template: `
    <div class="activity-feed">
      @for (group of groups(); track group.label ?? $index) {
        @if (group.label) {
          <div class="divider">
            <span>{{ group.label }}</span>
            <span class="line"></span>
          </div>
        }
        <div class="group">
          @for (item of group.items; track item.id; let last = $last) {
            <app-activity-feed-item [item]="item" [isLast]="last" />
          }
        </div>
      }
    </div>
  `,
})
export class ActivityFeed {
  readonly groups = input.required<ActivityGroup[]>();
}
