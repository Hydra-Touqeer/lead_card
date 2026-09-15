import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input, model, output } from '@angular/core';
import Cancel01Icon from '@hugeicons/core-free-icons/Cancel01Icon';
import Delete02Icon from '@hugeicons/core-free-icons/Delete02Icon';
import MoreVerticalIcon from '@hugeicons/core-free-icons/MoreVerticalIcon';
import PencilEdit02Icon from '@hugeicons/core-free-icons/PencilEdit02Icon';
import { Drawer } from 'primeng/drawer';
import { Popover } from 'primeng/popover';
import { Tooltip } from 'primeng/tooltip';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { ActivityComments } from '../activity-feed/activity-comments';
import { CURRENT_USER } from '../activity-feed/activity-options.mock';
import { ActivityItem } from '../../models/activity.model';
import { DEFAULT_PIPELINE_STAGES, Opportunity } from '../../models/opportunity.model';
import { StatusBadgeSelect } from '../lead-intro/status-badge-select';
import { OpportunityAttachmentsList } from './opportunity-attachments-list';
import { OpportunityContactCard } from './opportunity-contact-card';
import { OpportunityCustomFields } from './opportunity-custom-fields';
import { OpportunityRecentActivity } from './opportunity-recent-activity';

@Component({
  selector: 'app-opportunity-detail-drawer',
  imports: [
    CurrencyPipe,
    DatePipe,
    Drawer,
    Popover,
    Tooltip,
    AppIcon,
    StatusBadgeSelect,
    OpportunityContactCard,
    OpportunityRecentActivity,
    OpportunityAttachmentsList,
    OpportunityCustomFields,
    ActivityComments,
  ],
  styleUrl: './opportunity-detail-drawer.scss',
  template: `
    <p-drawer
      [(visible)]="visible"
      position="right"
      [modal]="true"
      [showCloseIcon]="false"
      [style]="{ width: '520px' }"
    >
      @if (opportunity(); as opportunity) {
        <ng-template #header>
          <div class="drawer-header">
            <p class="drawer-title">Opportunity Details</p>
            <div class="header-actions">
              <button
                type="button"
                class="kebab-trigger"
                aria-label="More actions"
                (click)="menu.toggle($event)"
              >
                <app-icon [icon]="moreIcon" [size]="16" />
              </button>
              <button
                type="button"
                class="close-button"
                aria-label="Close"
                (click)="visible.set(false)"
              >
                <app-icon [icon]="closeIcon" [size]="16" />
              </button>
            </div>

            <p-popover #menu>
              <div class="menu-panel">
                <button type="button" class="menu-item" (click)="edit.emit(); menu.hide()">
                  <app-icon [icon]="editIcon" [size]="16" />
                  Edit opportunity
                </button>
                <button type="button" class="menu-item destructive" (click)="delete.emit(); menu.hide()">
                  <app-icon [icon]="deleteIcon" [size]="16" />
                  Delete
                </button>
              </div>
            </p-popover>
          </div>
        </ng-template>

        <ng-template #content>
          <div class="drawer-body">
            <div class="name-row">
              <p class="name">{{ opportunity.name }}</p>
              <p class="value" pTooltip="Opportunity value" tooltipPosition="top">
                {{ opportunity.value | currency: 'USD' : 'symbol' : '1.0-0' }}
              </p>
            </div>

            <div class="stage-row">
              <span class="stage-label">Current Stage</span>
              <app-status-badge-select
                [label]="opportunity.stage"
                [dotColor]="opportunity.stageDotColor"
                [options]="stageLabels"
                panelHeader="Change stage"
              />
            </div>

            <div class="stats-row">
              <div class="stat">
                <span class="stat-label">Opportunity Age</span>
                <span class="stat-value">{{ opportunity.opportunityAgeDays }}d</span>
              </div>
              <div class="stat">
                <span class="stat-label">Stage Age</span>
                <span class="stat-value">{{ opportunity.stageAgeDays }}d</span>
              </div>
              <div class="stat">
                <span class="stat-label">Expected close date</span>
                <span class="stat-value">{{ opportunity.expectedCloseDate | date: 'd MMM y' }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Service</span>
                <span class="stat-value">{{ opportunity.service }}</span>
              </div>
            </div>

            <p class="description">{{ opportunity.description }}</p>

            <div class="divider"></div>

            @if (primaryContact(); as contact) {
              <div class="section">
                <p class="section-title">Contact</p>
                <app-opportunity-contact-card [contact]="contact" />
              </div>
            }

            <div class="section">
              <p class="section-title">Owner</p>
              <app-opportunity-contact-card [contact]="opportunity.owner" />
            </div>

            <div class="divider"></div>

            <div class="section">
              <app-opportunity-recent-activity
                [activities]="linkedActivities()"
                (viewActivity)="viewActivity.emit($event)"
              />
            </div>

            <div class="divider"></div>

            <div class="section">
              <app-opportunity-attachments-list [attachments]="opportunity.attachments" mode="view" />
            </div>

            <div class="divider"></div>

            <div class="section">
              <p class="section-title">Comments</p>
              <app-activity-comments
                [comments]="opportunity.comments"
                [currentUser]="currentUser"
                [inline]="true"
              />
            </div>

            <div class="divider"></div>

            <div class="section">
              <app-opportunity-custom-fields [fields]="opportunity.customFields" />
            </div>
          </div>
        </ng-template>
      }
    </p-drawer>
  `,
})
export class OpportunityDetailDrawer {
  readonly opportunity = input<Opportunity | null>(null);
  readonly activities = input<ActivityItem[]>([]);
  readonly visible = model<boolean>(false);

  readonly edit = output<void>();
  readonly delete = output<void>();
  readonly viewActivity = output<string>();

  protected readonly currentUser = CURRENT_USER;
  protected readonly stageLabels = DEFAULT_PIPELINE_STAGES.map((stage) => stage.label);

  protected readonly primaryContact = computed(() => this.opportunity()?.contacts[0]);

  protected readonly linkedActivities = computed(() => {
    const opportunityId = this.opportunity()?.id;
    if (!opportunityId) {
      return [];
    }
    return this.activities().filter((activity) => activity.linkedOpportunity?.id === opportunityId);
  });

  protected readonly deleteIcon = Delete02Icon;
  protected readonly editIcon = PencilEdit02Icon;
  protected readonly closeIcon = Cancel01Icon;
  protected readonly moreIcon = MoreVerticalIcon;
}
