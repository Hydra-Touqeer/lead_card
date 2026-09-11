import { Component, input, linkedSignal } from '@angular/core';
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
            <app-activity-feed-item [item]="item" [isLast]="last" (delete)="removeActivity(item.id)" />
          }
        </div>
      }
    </div>
  `,
})
export class ActivityFeed {
  readonly initialGroups = input.required<ActivityGroup[]>({ alias: 'groups' });

  protected readonly groups = linkedSignal(() =>
    this.initialGroups().map((group) => ({ ...group, items: [...group.items] })),
  );

  protected removeActivity(id: string): void {
    this.groups.update((groups) =>
      groups
        .map((group) => ({ ...group, items: group.items.filter((item) => item.id !== id) }))
        .filter((group) => group.items.length > 0),
    );
  }
}
