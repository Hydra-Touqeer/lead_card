import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output, viewChild } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { ActivityComments } from '../activity-feed/activity-comments';
import { CURRENT_USER } from '../activity-feed/activity-options.mock';
import { DEFAULT_PIPELINE_STAGES, Opportunity } from '../../models/opportunity.model';
import { StatusBadgeSelect } from '../lead-intro/status-badge-select';
import { OpportunityActionsMenu } from './opportunity-actions-menu';
import { OpportunityAttachments } from './opportunity-attachments';
import { PipelineProgress } from './pipeline-progress';

@Component({
  selector: 'app-opportunity-card',
  imports: [
    CurrencyPipe,
    Tooltip,
    ActivityComments,
    OpportunityActionsMenu,
    OpportunityAttachments,
    PipelineProgress,
    StatusBadgeSelect,
  ],
  styleUrl: './opportunity-card.scss',
  template: `
    @let opportunity = opportunity_();

    <div class="opportunity-card">
      <div class="card-body">
        <div class="header-row">
          <div class="title-block">
            <p class="name">{{ opportunity.name }}</p>
            <p class="created">Created {{ opportunity.createdLabel }}</p>
          </div>
          <p class="value" pTooltip="Opportunity value" tooltipPosition="top">
            {{ opportunity.value | currency: 'USD' : 'symbol' : '1.0-0' }}
          </p>
        </div>

        <div class="progress-block">
          <app-pipeline-progress [stages]="stageLabels" [currentStage]="opportunity.stage" />
          <div class="stage-row">
            <span class="stage-label">Current stage:</span>
            <app-status-badge-select
              [label]="opportunity.stage"
              [dotColor]="opportunity.stageDotColor"
              [options]="stageLabels"
              panelHeader="Change stage"
            />
          </div>
        </div>

        <div class="divider"></div>

        <div class="stats-row">
          <div class="stat">
            <span class="stat-label">Service</span>
            <span class="stat-value">{{ opportunity.service }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Opportunity Age</span>
            <span class="stat-value">{{ opportunity.opportunityAgeDays }}d</span>
          </div>
          <div class="stat">
            <span class="stat-label">Stage Age</span>
            <span class="stat-value">{{ opportunity.stageAgeDays }}d</span>
          </div>
        </div>
      </div>

      <div class="footer-row">
        <div class="contact-block">
          @if (primaryContact(); as contact) {
            <span class="contact-avatar">{{ contact.initials }}</span>
            <div class="contact-text">
              <span class="contact-name">{{ contact.name }}</span>
              <span class="contact-role">{{ contact.role }}</span>
            </div>
          }
          @if (opportunity.contacts.length > 1) {
            <span class="contacts-more">+{{ opportunity.contacts.length - 1 }}</span>
          }
        </div>

        <div class="footer-actions">
          <app-opportunity-attachments [attachments]="opportunity.attachments" />
          <app-activity-comments [comments]="opportunity.comments" [currentUser]="currentUser" />
          <app-opportunity-actions-menu
            (edit)="onEdit()"
            (addAttachment)="onAddAttachment()"
            (addComment)="onAddComment()"
            (delete)="delete.emit()"
          />
          <button type="button" class="view-button" (click)="view.emit()">View</button>
        </div>
      </div>
    </div>
  `,
})
export class OpportunityCard {
  readonly opportunity_ = input.required<Opportunity>({ alias: 'opportunity' });
  readonly delete = output<void>();
  readonly view = output<void>();

  protected readonly currentUser = CURRENT_USER;
  protected readonly stageLabels = DEFAULT_PIPELINE_STAGES.map((stage) => stage.label);

  protected readonly primaryContact = computed(() => this.opportunity_().contacts[0]);

  private readonly commentsCmp = viewChild(ActivityComments);
  private readonly actionsMenu = viewChild.required(OpportunityActionsMenu);

  protected onAddComment(): void {
    const anchor = this.actionsMenu().kebabBtn().nativeElement;
    this.commentsCmp()?.openPanel(anchor);
  }

  protected onAddAttachment(): void {
    // TODO: wire up a real file picker once attachment upload exists.
  }

  protected onEdit(): void {
    // TODO: open the opportunity edit form once it exists.
  }
}
