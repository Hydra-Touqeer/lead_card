import { ActivityComment } from './activity.model';

export interface OpportunityContact {
  initials: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
}

export interface OpportunityAttachment {
  id: string;
  name: string;
  sizeLabel?: string;
  sentLabel?: string;
}

export interface OpportunityCustomFieldValue {
  id: string;
  label: string;
  value: string;
}

export interface OpportunityCustomFieldDefinition {
  id: string;
  label: string;
}

/**
 * Flat, mocked for now - will come from the (not yet built) Settings >
 * Custom Fields screens. This is the catalog offered when adding a field to
 * an opportunity; `Opportunity.customFields` holds the ones actually set.
 */
export const MOCK_CUSTOM_FIELD_CATALOG: OpportunityCustomFieldDefinition[] = [
  { id: 'placement-value', label: 'Placement Value' },
  { id: 'commission-rate', label: 'Commission Rate' },
  { id: 'contract-type', label: 'Contract Type' },
  { id: 'debtors', label: 'Debtors' },
  { id: 'expected-close', label: 'Expected Close' },
  { id: 'source', label: 'Source' },
  { id: 'activation-fee', label: 'Activation Fee' },
];

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
  expectedCloseDate: Date;
  description: string;
  contacts: OpportunityContact[];
  owner: OpportunityContact;
  comments: ActivityComment[];
  attachments: OpportunityAttachment[];
  customFields: OpportunityCustomFieldValue[];
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
