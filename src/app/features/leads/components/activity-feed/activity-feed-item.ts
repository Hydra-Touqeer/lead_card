import { Component, computed, input, linkedSignal, output, signal, viewChild } from '@angular/core';
import { IconSvgObject } from '@hugeicons/angular';
import Calendar01Icon from '@hugeicons/core-free-icons/Calendar01Icon';
import CallIncoming01Icon from '@hugeicons/core-free-icons/CallIncoming01Icon';
import CallMissed01Icon from '@hugeicons/core-free-icons/CallMissed01Icon';
import CallOutgoing01Icon from '@hugeicons/core-free-icons/CallOutgoing01Icon';
import Exchange01Icon from '@hugeicons/core-free-icons/Exchange01Icon';
import Flag01Icon from '@hugeicons/core-free-icons/Flag01Icon';
import Mail01Icon from '@hugeicons/core-free-icons/Mail01Icon';
import Message01Icon from '@hugeicons/core-free-icons/Message01Icon';
import StickyNote01Icon from '@hugeicons/core-free-icons/StickyNote01Icon';
import TaskDone01Icon from '@hugeicons/core-free-icons/TaskDone01Icon';
import { Badge } from '../../../../shared/ui/badge/badge';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { ActivityItem, CallDirection } from '../../models/activity.model';
import { ActivityActionsMenu } from './activity-actions-menu';
import { ActivityComments } from './activity-comments';
import { ActivityOpportunityLink } from './activity-opportunity-link';
import {
  CURRENT_USER,
  MOCK_OPPORTUNITY_OPTIONS,
  MOCK_OUTCOME_OPTIONS,
} from './activity-options.mock';
import { ActivityOutcomeComponent } from './activity-outcome';
import { CallActivityBody } from './call-activity-body';
import { EmailActivityBody } from './email-activity-body';

const CALL_DIRECTION_ICON: Record<CallDirection, IconSvgObject> = {
  outgoing: CallOutgoing01Icon,
  unanswered: CallOutgoing01Icon,
  incoming: CallIncoming01Icon,
  missed: CallMissed01Icon,
};

// Activity types that don't yet support an outcome - matches types that
// represent a single completed action (calls, meetings, tasks, custom),
// rather than a message or a system-recorded change.
const OUTCOME_SUPPORTED_TYPES: ReadonlySet<ActivityItem['type']> = new Set([
  'call',
  'meeting',
  'task-completed',
  'custom',
]);

@Component({
  selector: 'app-activity-feed-item',
  imports: [
    AppIcon,
    Badge,
    ActivityComments,
    ActivityOutcomeComponent,
    ActivityOpportunityLink,
    ActivityActionsMenu,
    CallActivityBody,
    EmailActivityBody,
  ],
  styleUrl: './activity-feed-item.scss',
  template: `
    @let activity = item();

    <div class="feed-item" [id]="'activity-' + activity.id">
      <div class="avatar-wrap">
        <div
          class="type-icon"
          [style.background]="iconMeta().background"
          [style.color]="iconMeta().color"
        >
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
                <span class="title">{{
                  activity.direction === 'outgoing' ? 'SMS sent' : 'SMS received'
                }}</span>
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
              <app-activity-outcome
                [outcome]="activity.outcome"
                [options]="outcomeOptions"
                (outcomeChange)="currentOutcome.set($event)"
              />
            }
          </div>

          <div class="meta-group">
            @if (supportsOpportunityLink()) {
              <app-activity-opportunity-link
                [linkedOpportunity]="activity.linkedOpportunity"
                [options]="opportunityOptions"
                (linkedOpportunityChange)="currentLinkedOpportunity.set($event)"
              />
            }
            <app-activity-comments [comments]="activity.comments" [currentUser]="currentUser" />
            <app-activity-actions-menu
              [hasComments]="activity.comments.length > 0"
              [hasOutcome]="!!currentOutcome()"
              [hasLinkedOpportunity]="!!currentLinkedOpportunity()"
              [supportsOutcome]="supportsOutcome()"
              [supportsOpportunityLink]="supportsOpportunityLink()"
              (addComment)="onAddComment()"
              (setOutcome)="onSetOutcome()"
              (linkOpportunity)="onLinkOpportunity()"
              (copyLink)="onCopyLink()"
              (deleteActivity)="delete.emit()"
            />
            @if (justCopied()) {
              <span class="copied-badge">Copied!</span>
            }
            <img
              class="performed-by-avatar"
              [src]="activity.performedBy.avatarUrl"
              [alt]="activity.performedBy.name"
            />
            <span class="timestamp">{{ activity.timestamp }}</span>
          </div>
        </div>

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
              <app-call-activity-body
                [durationSeconds]="activity.durationSeconds"
                [recordingUrl]="activity.recordingUrl"
                [transcript]="activity.transcript"
              />
            }
            @case ('email') {
              <app-email-activity-body [messages]="activity.messages" />
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
  readonly delete = output<void>();

  protected readonly currentUser = CURRENT_USER;
  protected readonly outcomeOptions = MOCK_OUTCOME_OPTIONS;
  protected readonly opportunityOptions = MOCK_OPPORTUNITY_OPTIONS;

  protected readonly supportsOutcome = computed(() =>
    OUTCOME_SUPPORTED_TYPES.has(this.item().type),
  );
  protected readonly supportsOpportunityLink = computed(() => this.item().type !== 'status-change');

  protected readonly justCopied = signal(false);

  // Track the current outcome/linked-opportunity locally (rather than reading
  // straight off `item()`) so removing one re-opens the "set" affordance in
  // the actions menu instead of leaving both the inline badge and the menu
  // item unavailable.
  protected readonly currentOutcome = linkedSignal(() => this.item().outcome);
  protected readonly currentLinkedOpportunity = linkedSignal(() => this.item().linkedOpportunity);

  private readonly outcomeCmp = viewChild(ActivityOutcomeComponent);
  private readonly opportunityCmp = viewChild(ActivityOpportunityLink);
  private readonly commentsCmp = viewChild(ActivityComments);
  private readonly actionsMenu = viewChild(ActivityActionsMenu);

  protected readonly iconMeta = computed<{
    icon: IconSvgObject;
    background: string;
    color: string;
  }>(() => {
    const activity = this.item();
    switch (activity.type) {
      case 'note':
        return { icon: StickyNote01Icon, background: '#fef3c7', color: '#b45309' };
      case 'email':
        return {
          icon: Mail01Icon,
          background: 'var(--bg-brand-primary)',
          color: 'var(--fg-brand-primary)',
        };
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
        return {
          icon: Exchange01Icon,
          background: 'var(--bg-quaternary)',
          color: 'var(--fg-quaternary)',
        };
      case 'task-completed':
        return {
          icon: TaskDone01Icon,
          background: 'var(--bg-warning-primary)',
          color: 'var(--fg-warning-primary)',
        };
      case 'custom':
        return { icon: Flag01Icon, background: activity.iconBackground, color: activity.iconColor };
    }
  });

  protected onAddComment(): void {
    this.openPanel(this.commentsCmp());
  }

  protected onSetOutcome(): void {
    this.openPanel(this.outcomeCmp());
  }

  protected onLinkOpportunity(): void {
    this.openPanel(this.opportunityCmp());
  }

  protected async onCopyLink(): Promise<void> {
    const url = `${location.origin}${location.pathname}#activity-${this.item().id}`;
    await navigator.clipboard.writeText(url);
    this.justCopied.set(true);
    setTimeout(() => this.justCopied.set(false), 1500);
  }

  private openPanel(target: { openPanel(anchor: HTMLElement): void } | undefined): void {
    const anchor = this.actionsMenu()?.kebabBtn().nativeElement;
    if (target && anchor) {
      target.openPanel(anchor);
    }
  }
}
