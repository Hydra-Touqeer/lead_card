import { ActivityGroup } from '../../models/activity.model';
import { Task } from '../../models/task.model';
import { LeadContact, LeadStatusBadge, LeadTag } from '../../components/lead-intro/lead-intro';

export const MOCK_STATUS_BADGES: LeadStatusBadge[] = [
  { label: 'Inbound · Website', dotColor: 'var(--fg-brand-primary)' },
  { label: 'Active', dotColor: 'var(--fg-success-primary)' },
];

export const MOCK_TAGS: LeadTag[] = [
  { label: 'Domestic · US', dotColor: 'var(--fg-brand-primary)' },
  { label: 'Last contact · 2d ago', dotColor: 'var(--fg-brand-primary)' },
];

export const MOCK_CONTACTS: LeadContact[] = [
  { initials: 'DW', name: 'Dana Whitfield', role: 'Primary contact' },
  { initials: 'ML', name: 'Marcus Lee', role: 'AR Manager' },
  { initials: 'PN', name: 'Priya Nair', role: 'Credit Controller' },
];

export const MOCK_ACTIVITY_GROUPS: ActivityGroup[] = [
  {
    items: [
      {
        title: 'Proposal Sent: Third Party Contingency ($18,000)',
        timestamp: '31 min ago',
        tags: [
          { label: 'Sent', dotColor: 'var(--fg-success-primary)' },
          { label: 'Third Party', dotColor: 'var(--fg-brand-primary)', dropdown: true },
        ],
        description: 'Sent to Dana Whitfield · 22% on 90+ day placements',
      },
      {
        title: 'Discovery Call · First Party Fit',
        timestamp: '2hr ago',
        tags: [{ label: 'First Party', dotColor: 'var(--fg-brand-primary)', dropdown: true }],
        meta: [{ text: '· Outbound · 14:32', emphasis: true }, { text: '· Recording' }, { text: '· AI summary' }],
      },
    ],
  },
  {
    label: 'Yesterday',
    items: [
      {
        title: 'Intro meeting · Cedar × Kestrel',
        timestamp: '1d ago',
        tags: [{ label: 'Company-level', dotColor: 'var(--fg-brand-primary)' }],
        description: 'Teams meeting · 30 min · 3 attendees',
      },
      {
        title: 'Note',
        timestamp: '2d ago',
        tags: [{ label: 'Company-level', dotColor: 'var(--fg-brand-primary)' }],
        description: 'Two AR problems: aged commercial & high-volume early-stage receivables.',
      },
    ],
  },
  {
    label: 'Jul 30, 2026 · Lead Created',
    items: [
      { title: 'Lead Distributed & Upgraded', description: 'Assigned via Round Robin' },
      { title: 'Admin QC approved', description: 'Valid inbound inquiry · Verified by Stanley A.' },
      {
        title: 'Lead created · Inbound · Website form',
        description: 'Company, contact, revenue, and sector auto-populated',
      },
    ],
  },
];

export const MOCK_TASKS: Task[] = [
  {
    title: 'Follow Up on Proposal',
    status: 'overdue',
    dueDate: 'Tue, Aug 19 · 10:00 AM',
    tag: 'Third Party',
    assignee: 'M. Touqeer',
    assigneeInitials: 'MT',
    completed: true,
  },
  {
    title: 'Follow Up on Proposal',
    status: 'overdue',
    dueDate: 'Tue, Aug 19 · 10:00 AM',
    tag: 'Third Party',
    assignee: 'M. Touqeer',
    assigneeInitials: 'MT',
    completed: false,
  },
  {
    title: 'Follow Up on Proposal',
    status: 'overdue',
    dueDate: 'Tue, Aug 19 · 10:00 AM',
    tag: 'Third Party',
    assignee: 'M. Touqeer',
    assigneeInitials: 'MT',
    completed: false,
  },
  {
    title: 'Follow Up on Proposal',
    status: 'overdue',
    dueDate: 'Tue, Aug 19 · 10:00 AM',
    tag: 'Third Party',
    assignee: 'M. Touqeer',
    assigneeInitials: 'MT',
    completed: false,
  },
];
