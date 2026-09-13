import { ActivityComment } from './activity.model';

export interface OpportunityContact {
  initials: string;
  name: string;
  role: string;
}

export interface OpportunityAttachment {
  id: string;
  name: string;
}

export interface Opportunity {
  id: string;
  name: string;
  createdLabel: string;
  value: number;
  service: string;
  opportunityAgeDays: number;
  stageAgeDays: number;
  stage: string;
  stageDotColor: string;
  contacts: OpportunityContact[];
  comments: ActivityComment[];
  attachments: OpportunityAttachment[];
}

/**
 * Generic placeholder pipeline - pipelines are custom per-org (users define
 * their own stages), so this is a stand-in until the pipeline-builder
 * feature exists. Order determines progress-bar fill and dropdown order.
 */
export const DEFAULT_PIPELINE_STAGES: { label: string; dotColor: string }[] = [
  { label: 'Discovery', dotColor: 'var(--fg-warning-primary)' },
  { label: 'Qualification', dotColor: 'var(--fg-brand-primary)' },
  { label: 'Proposal', dotColor: 'var(--fg-brand-primary)' },
  { label: 'Negotiation', dotColor: 'var(--fg-brand-primary)' },
  { label: 'Closed Won', dotColor: 'var(--fg-success-primary)' },
];
