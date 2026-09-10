import { Component, computed, input } from '@angular/core';
import { IconSvgObject } from '@hugeicons/angular';
import {
  Calendar01Icon,
  CallIncoming01Icon,
  CallMissed01Icon,
  CallOutgoing01Icon,
  Exchange01Icon,
  Flag01Icon,
  Mail01Icon,
  Message01Icon,
  StickyNote01Icon,
  TaskDone01Icon,
} from '@hugeicons/core-free-icons';
import { Badge } from '../../../../shared/ui/badge/badge';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { ActivityItem, CallDirection } from '../../models/activity.model';
import { ActivityComments } from './activity-comments';
import { ActivityOpportunityLink } from './activity-opportunity-link';
import { CURRENT_USER, MOCK_OPPORTUNITY_OPTIONS, MOCK_OUTCOME_OPTIONS } from './activity-options.mock';
import { ActivityOutcomeComponent } from './activity-outcome';

const CALL_DIRECTION_ICON: Record<CallDirection, IconSvgObject> = {
  outgoing: CallOutgoing01Icon,
  unanswered: CallOutgoing01Icon,
  incoming: CallIncoming01Icon,
  missed: CallMissed01Icon,
};

// Activity types that don't yet support an outcome - matches types that
// represent a single completed action (calls, meetings, tasks, custom),
// rather than a message or a system-recorded change.
const OUTCOME_SUPPORTED_TYPES: ReadonlySet<ActivityItem['type']> = new Set(['call', 'meeting', 'task-completed', 'custom']);

@Component({
  selector: 'app-activity-feed-item',
  imports: [AppIcon, Badge, ActivityComments, ActivityOutcomeComponent, ActivityOpportunityLink],
  styleUrl: './activity-feed-item.scss',
  template: `
    @let activity = item();

    <div class="feed-item">
      <div class="avatar-wrap">
        <div class="type-icon" [style.background]="iconMeta().background" [style.color]="iconMeta().color">
          <app-icon [icon]="iconMeta().icon" [size]="18" />
        </div>
        @if (!isLast()) {
          <div class="connector"></div>
        }
      </div>

      <div class="content">
        <div class="header-row">
          <div class="title-group">
            @switch (activity.type) {
              @case ('note') {
                <span class="title">Note</span>
              }
              @case ('email') {
                <span class="title">{{ activity.subject }}</span>
              }
              @case ('sms') {
                <span class="title">{{ activity.direction === 'outgoing' ? 'SMS sent' : 'SMS received' }}</span>
              }
              @case ('call') {
                <span class="title">{{ activity.title }}</span>
              }
              @case ('meeting') {
                <span class="title">{{ activity.title }}</span>
              }
              @case ('status-change') {
                <span class="title">Status changed from</span>
                <app-badge [label]="activity.fromStatus" dotColor="var(--fg-quaternary)" />
                <span class="title">to</span>
                <app-badge [label]="activity.toStatus" dotColor="var(--fg-brand-primary)" />
              }
              @case ('task-completed') {
                <span class="title">Task completed: {{ activity.taskTitle }}</span>
              }
              @case ('custom') {
                <span class="title">{{ activity.title }}</span>
              }
            }

            @if (supportsOutcome()) {
              <app-activity-outcome [outcome]="activity.outcome" [options]="outcomeOptions" />
            }
          </div>

          <div class="meta-group">
            @if (supportsOpportunityLink()) {
              <app-activity-opportunity-link
                [linkedOpportunity]="activity.linkedOpportunity"
                [options]="opportunityOptions"
              />
            }
            <app-activity-comments [comments]="activity.comments" [currentUser]="currentUser" />
            <img class="performed-by-avatar" [src]="activity.performedBy.avatarUrl" [alt]="activity.performedBy.name" />
            <span class="timestamp">{{ activity.timestamp }}</span>
          </div>
        </div>

        @if (activity.tags && activity.tags.length > 0) {
          <div class="tags-row">
            @for (tag of activity.tags; track tag.label) {
              <app-badge [label]="tag.label" [dotColor]="tag.dotColor" />
            }
          </div>
        }

        <div class="body">
          @switch (activity.type) {
            @case ('note') {
              <p class="description">{{ activity.body }}</p>
            }
            @case ('sms') {
              <p class="description">{{ activity.body }}</p>
            }
            @case ('meeting') {
              @if (activity.description) {
                <p class="description">{{ activity.description }}</p>
              }
              @if (activity.durationMinutes || activity.attendeeCount) {
                <p class="meta-line">
                  @if (activity.durationMinutes) {
                    <span>{{ activity.durationMinutes }} min</span>
                  }
                  @if (activity.attendeeCount) {
                    <span>· {{ activity.attendeeCount }} attendees</span>
                  }
                </p>
              }
            }
            @case ('custom') {
              @if (activity.body) {
                <p class="description">{{ activity.body }}</p>
              }
            }
            @case ('call') {
              <!-- Recording player + transcript arrive in pass 2 -->
              <p class="meta-line">{{ activity.durationSeconds }}s</p>
            }
            @case ('email') {
              <!-- Thread + reply/forward/retry arrive in pass 3 -->
              <p class="meta-line">{{ activity.messages.length }} message{{ activity.messages.length === 1 ? '' : 's' }}</p>
            }
          }
        </div>
      </div>
    </div>
  `,
})
export class ActivityFeedItem {
  readonly item = input.required<ActivityItem>();
  readonly isLast = input<boolean>(false);

  protected readonly currentUser = CURRENT_USER;
  protected readonly outcomeOptions = MOCK_OUTCOME_OPTIONS;
  protected readonly opportunityOptions = MOCK_OPPORTUNITY_OPTIONS;

  protected readonly supportsOutcome = computed(() => OUTCOME_SUPPORTED_TYPES.has(this.item().type));
  protected readonly supportsOpportunityLink = computed(() => this.item().type !== 'status-change');

  protected readonly iconMeta = computed<{ icon: IconSvgObject; background: string; color: string }>(() => {
    const activity = this.item();
    switch (activity.type) {
      case 'note':
        return { icon: StickyNote01Icon, background: '#fef3c7', color: '#b45309' };
      case 'email':
        return { icon: Mail01Icon, background: 'var(--bg-brand-primary)', color: 'var(--fg-brand-primary)' };
      case 'sms':
        return { icon: Message01Icon, background: '#cffafe', color: '#0e7490' };
      case 'call': {
        const isFailed = activity.direction === 'missed' || activity.direction === 'unanswered';
        return {
          icon: CALL_DIRECTION_ICON[activity.direction],
          background: isFailed ? 'var(--bg-error-primary)' : 'var(--bg-success-primary)',
          color: isFailed ? 'var(--fg-error-primary)' : 'var(--fg-success-primary)',
        };
      }
      case 'meeting':
        return { icon: Calendar01Icon, background: '#ede9fe', color: '#6d28d9' };
      case 'status-change':
        return { icon: Exchange01Icon, background: 'var(--bg-quaternary)', color: 'var(--fg-quaternary)' };
      case 'task-completed':
        return { icon: TaskDone01Icon, background: 'var(--bg-warning-primary)', color: 'var(--fg-warning-primary)' };
      case 'custom':
        return { icon: Flag01Icon, background: activity.iconBackground, color: activity.iconColor };
    }
  });
}
