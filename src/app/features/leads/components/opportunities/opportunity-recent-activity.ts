import { Component, input, output, signal, viewChild } from '@angular/core';
import MoreVerticalIcon from '@hugeicons/core-free-icons/MoreVerticalIcon';
import { Popover } from 'primeng/popover';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { ActivityItem } from '../../models/activity.model';
import { getActivityIconMeta, getActivitySubtitle, getActivityTitle } from '../activity-feed/activity-display.util';

@Component({
  selector: 'app-opportunity-recent-activity',
  imports: [AppIcon, Popover],
  styleUrl: './opportunity-recent-activity.scss',
  template: `
    <p class="section-title">Recent Activity</p>

    @if (activities().length > 0) {
      <div class="activity-list">
        @for (activity of activities(); track activity.id) {
          <div class="activity-row">
            <div
              class="type-icon"
              [style.background]="iconMeta(activity).background"
              [style.color]="iconMeta(activity).color"
            >
              <app-icon [icon]="iconMeta(activity).icon" [size]="16" />
            </div>
            <div class="activity-text">
              <span class="activity-title">{{ title(activity) }}</span>
              @if (subtitle(activity); as sub) {
                <span class="activity-subtitle">{{ sub }}</span>
              }
            </div>
            <span class="activity-timestamp">{{ activity.timestamp }}</span>
            <button
              #kebabBtn
              type="button"
              class="kebab-trigger"
              aria-label="More actions"
              (click)="openMenu(activity.id, kebabBtn)"
            >
              <app-icon [icon]="moreIcon" [size]="14" />
            </button>
          </div>
        }
      </div>
    } @else {
      <p class="empty-state">No activity linked to this opportunity yet.</p>
    }

    <p-popover #menu>
      <div class="menu-panel">
        <button type="button" class="menu-item" (click)="viewInFeed(); menu.hide()">
          View in Activity Feed
        </button>
      </div>
    </p-popover>
  `,
})
export class OpportunityRecentActivity {
  readonly activities = input<ActivityItem[]>([]);
  readonly viewActivity = output<string>();

  protected readonly activeActivityId = signal<string | null>(null);

  protected readonly moreIcon = MoreVerticalIcon;

  private readonly menuRef = viewChild.required(Popover);

  protected iconMeta = getActivityIconMeta;
  protected title = getActivityTitle;
  protected subtitle = getActivitySubtitle;

  protected openMenu(activityId: string, anchor: HTMLElement): void {
    this.activeActivityId.set(activityId);
    this.menuRef().show(undefined, anchor);
  }

  protected viewInFeed(): void {
    const id = this.activeActivityId();
    if (id) {
      this.viewActivity.emit(id);
    }
  }
}
