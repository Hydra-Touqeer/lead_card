import { Component, signal } from '@angular/core';
import { ActivityFeed } from '../../components/activity-feed/activity-feed';
import { ActivityFilter } from '../../components/activity-filter/activity-filter';
import { LeadActionsToolbar } from '../../components/lead-actions-toolbar/lead-actions-toolbar';
import { LeadIntro } from '../../components/lead-intro/lead-intro';
import { LeadTabs } from '../../components/lead-tabs/lead-tabs';
import { TaskPanel } from '../../components/task-panel/task-panel';
import { MOCK_ACTIVITY_GROUPS, MOCK_CONTACTS, MOCK_STATUS_BADGES, MOCK_TAGS, MOCK_TASKS } from './lead-detail.mock';

@Component({
  selector: 'app-lead-detail',
  imports: [LeadIntro, LeadTabs, ActivityFilter, ActivityFeed, LeadActionsToolbar, TaskPanel],
  styleUrl: './lead-detail.scss',
  template: `
    <div class="lead-detail" [class.panel-collapsed]="panelCollapsed()">
      <div class="main-column">
        <app-lead-intro
          companyName="Kestrel Manufacturing Inc."
          companyDomain="kestrelmfg.com"
          companyLogoUrl="https://www.figma.com/api/mcp/asset/a8042f7b-184e-4faf-8da7-f15714bd783a.png"
          [statusBadges]="statusBadges"
          segmentLabel="Yellow Ribbon"
          segmentDetail="Revenue: $10M–$30M"
          [activeWorkflowsCount]="5"
          [tags]="tags"
          [showContacts]="false"
          [contacts]="contacts"
          [additionalContactsCount]="4"
        />

        <div class="middle-card">
          <app-lead-tabs />
          <div class="tab-content">
            <app-activity-filter />
            <app-activity-feed [groups]="activityGroups" />
          </div>
        </div>
      </div>

      <div class="side-column">
        <div class="toolbar-overlay">
          <app-lead-actions-toolbar />
        </div>
        <app-task-panel [tasks]="tasks" [(collapsed)]="panelCollapsed" />
      </div>
    </div>
  `,
})
export class LeadDetail {
  protected readonly statusBadges = MOCK_STATUS_BADGES;
  protected readonly tags = MOCK_TAGS;
  protected readonly contacts = MOCK_CONTACTS;
  protected readonly activityGroups = MOCK_ACTIVITY_GROUPS;
  protected readonly tasks = MOCK_TASKS;
  protected readonly panelCollapsed = signal(false);
}
