import { Component, input } from '@angular/core';
import GitCompareIcon from '@hugeicons/core-free-icons/GitCompareIcon';
import { Button } from 'primeng/button';
import { Popover } from 'primeng/popover';
import { Tooltip } from 'primeng/tooltip';
import { Badge } from '../../../../shared/ui/badge/badge';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { AskCollectwareAi } from './ask-collectware-ai';
import { StatusBadgeSelect } from './status-badge-select';

export interface LeadStatusBadge {
  label: string;
  dotColor: string;
  /** Alternative values the user can switch this badge to. Omit to render a static, non-interactive badge. */
  options?: string[];
}

export interface LeadWorkflow {
  id: string;
  name: string;
  status: string;
  statusDotColor: string;
  currentStep: string;
}

export interface LeadTag {
  label: string;
  dotColor: string;
}

export interface LeadContact {
  initials: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-lead-intro',
  imports: [AppIcon, Badge, Button, Popover, Tooltip, StatusBadgeSelect, AskCollectwareAi],
  styleUrl: './lead-intro.scss',
  template: `
    <div class="lead-intro">
      <div class="status-row">
        @for (badge of statusBadges(); track badge.label) {
          @if (badge.options && badge.options.length > 0) {
            <app-status-badge-select
              [label]="badge.label"
              [dotColor]="badge.dotColor"
              [options]="badge.options"
            />
          } @else {
            <app-badge [label]="badge.label" [dotColor]="badge.dotColor" />
          }
        }
        @if (segmentLabel()) {
          <span class="segment">
            <span class="dot" [style.background]="segmentDotColor()"></span>
            <span class="segment-label">{{ segmentLabel() }}</span>
            @if (segmentDetail()) {
              <span class="segment-detail">{{ segmentDetail() }}</span>
            }
          </span>
        }
      </div>

      <div class="company-row">
        <div class="company-identity">
          <img class="company-logo" [src]="companyLogoUrl()" alt="" />
          <div class="company-name-block">
            <p class="company-name">{{ companyName() }}</p>
            <a
              class="company-domain"
              [href]="'https://' + companyDomain()"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ companyDomain() }} ↗
            </a>
          </div>
        </div>

        @if (workflows().length > 0) {
          <p-button
            [link]="true"
            severity="primary"
            size="large"
            [label]="'Active Workflows (' + workflows().length + ')'"
            (click)="workflowsPopover.toggle($event)"
          >
            <app-icon [icon]="workflowsIcon" [size]="16" />
          </p-button>

          <p-popover #workflowsPopover>
            <div class="workflows-panel">
              <div class="panel-header">Active workflows</div>
              @for (workflow of workflows(); track workflow.id) {
                <button
                  type="button"
                  class="workflow-option"
                  (click)="openWorkflow(workflow); workflowsPopover.hide()"
                >
                  <span class="workflow-row-top">
                    <span class="workflow-name" [pTooltip]="workflow.name" tooltipPosition="top">{{
                      workflow.name
                    }}</span>
                    <span class="workflow-status">
                      <span class="dot" [style.background]="workflow.statusDotColor"></span>
                      {{ workflow.status }}
                    </span>
                  </span>
                  <span class="workflow-step">{{ workflow.currentStep }}</span>
                </button>
              }
            </div>
          </p-popover>
        }
      </div>

      @if (tags().length > 0) {
        <div class="tags-row">
          @for (tag of tags(); track tag.label) {
            <app-badge [label]="tag.label" [dotColor]="tag.dotColor" />
          }
        </div>
      }

      @if (showContacts() && contacts().length > 0) {
        <div class="contacts-row">
          @for (contact of contacts(); track contact.name) {
            <div class="contact-pill">
              <span class="contact-avatar">{{ contact.initials }}</span>
              <div class="contact-text">
                <span class="contact-name">{{ contact.name }}</span>
                <span class="contact-role">{{ contact.role }}</span>
              </div>
            </div>
          }
          @if (additionalContactsCount() > 0) {
            <button type="button" class="contacts-more">+{{ additionalContactsCount() }}</button>
          }
        </div>
      }

      <app-ask-collectware-ai />
    </div>
  `,
})
export class LeadIntro {
  readonly companyName = input.required<string>();
  readonly companyDomain = input.required<string>();
  readonly companyLogoUrl = input.required<string>();
  readonly statusBadges = input<LeadStatusBadge[]>([]);
  readonly segmentLabel = input<string>();
  readonly segmentDetail = input<string>();
  readonly segmentDotColor = input<string>('var(--fg-warning-primary)');
  readonly workflows = input<LeadWorkflow[]>([]);
  readonly tags = input<LeadTag[]>([]);
  readonly showContacts = input<boolean>(true);
  readonly contacts = input<LeadContact[]>([]);
  readonly additionalContactsCount = input<number>(0);

  protected readonly workflowsIcon = GitCompareIcon;

  protected openWorkflow(workflow: LeadWorkflow): void {
    // TODO: navigate to the workflow's detail view once that route exists.
  }
}
