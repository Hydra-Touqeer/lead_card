import { Component, input } from '@angular/core';
import { GitCompareIcon } from '@hugeicons/core-free-icons';
import { Button } from 'primeng/button';
import { Badge } from '../../../../shared/ui/badge/badge';
import { AppIcon } from '../../../../shared/ui/icon/icon';

export interface LeadStatusBadge {
  label: string;
  dotColor: string;
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
  imports: [AppIcon, Badge, Button],
  styleUrl: './lead-intro.scss',
  template: `
    <div class="lead-intro">
      <div class="status-row">
        @for (badge of statusBadges(); track badge.label) {
          <app-badge [label]="badge.label" [dotColor]="badge.dotColor" [dropdown]="true" />
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
            <p class="company-domain">{{ companyDomain() }} ↗</p>
          </div>
        </div>

        @if (activeWorkflowsCount() > 0) {
          <p-button [link]="true" severity="primary" size="large" [label]="'Active Workflows (' + activeWorkflowsCount() + ')'">
            <app-icon [icon]="workflowsIcon" [size]="16" />
          </p-button>
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
  readonly activeWorkflowsCount = input<number>(0);
  readonly tags = input<LeadTag[]>([]);
  readonly showContacts = input<boolean>(true);
  readonly contacts = input<LeadContact[]>([]);
  readonly additionalContactsCount = input<number>(0);

  protected readonly workflowsIcon = GitCompareIcon;
}
