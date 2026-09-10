import { ActivityGroup, ActivityPerson } from '../../models/activity.model';
import { Task } from '../../models/task.model';
import { LeadContact, LeadStatusBadge, LeadTag } from '../../components/lead-intro/lead-intro';
import { CURRENT_USER } from '../../components/activity-feed/activity-options.mock';

const SAAD_HASAN: ActivityPerson = {
  name: 'Saad Hasan',
  avatarUrl: 'https://www.figma.com/api/mcp/asset/b047646d-1e62-4573-be55-78a784583447.png',
};

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

const SYSTEM_ICON = { iconBackground: 'var(--bg-quaternary)', iconColor: 'var(--fg-quaternary)' };

export const MOCK_ACTIVITY_GROUPS: ActivityGroup[] = [
  {
    items: [
      {
        id: 'act-proposal-email',
        type: 'email',
        timestamp: '31 min ago',
        performedBy: CURRENT_USER,
        comments: [],
        linkedOpportunity: { id: 'opp-1', name: 'Third Party Contingency' },
        tags: [{ label: 'Third Party', dotColor: 'var(--fg-brand-primary)' }],
        subject: 'Proposal: Third Party Contingency ($18,000)',
        messages: [
          {
            id: 'msg-1',
            from: CURRENT_USER,
            to: 'dana.whitfield@kestrelmfg.com',
            timestamp: '31 min ago',
            body: 'Sent to Dana Whitfield · 22% on 90+ day placements',
          },
        ],
      },
      {
        id: 'act-discovery-call',
        type: 'call',
        timestamp: '2hr ago',
        performedBy: CURRENT_USER,
        comments: [],
        linkedOpportunity: { id: 'opp-2', name: 'First Party Fit' },
        tags: [{ label: 'First Party', dotColor: 'var(--fg-brand-primary)' }],
        title: 'Discovery Call',
        direction: 'outgoing',
        durationSeconds: 512,
        transcript:
          'Hi Dana, thanks for taking the time today. I wanted to walk through our first-party collections approach for the receivables you flagged...',
        outcome: { label: 'Connected - Interested' },
      },
    ],
  },
  {
    label: 'Yesterday',
    items: [
      {
        id: 'act-intro-meeting',
        type: 'meeting',
        timestamp: '1d ago',
        performedBy: CURRENT_USER,
        comments: [],
        tags: [{ label: 'Company-level', dotColor: 'var(--fg-brand-primary)' }],
        title: 'Intro meeting · Cedar × Kestrel',
        durationMinutes: 30,
        attendeeCount: 3,
      },
      {
        id: 'act-follow-up-sms',
        type: 'sms',
        timestamp: '1d ago',
        performedBy: CURRENT_USER,
        comments: [],
        linkedOpportunity: { id: 'opp-1', name: 'Third Party Contingency' },
        direction: 'outgoing',
        body: 'Hi Dana, following up on the proposal we sent over - let me know if you have any questions!',
      },
      {
        id: 'act-note',
        type: 'note',
        timestamp: '2d ago',
        performedBy: CURRENT_USER,
        tags: [{ label: 'Company-level', dotColor: 'var(--fg-brand-primary)' }],
        body: 'Two AR problems: aged commercial & high-volume early-stage receivables.',
        comments: [
          {
            id: 'cmt-1',
            author: SAAD_HASAN,
            text: 'Test comment',
            timestamp: 'Yesterday',
          },
        ],
      },
      {
        id: 'act-task-completed',
        type: 'task-completed',
        timestamp: '13m ago',
        performedBy: CURRENT_USER,
        comments: [],
        taskTitle: 'Follow up [Touqeer]',
      },
    ],
  },
  {
    label: 'Jul 30, 2026 · Lead Created',
    items: [
      {
        id: 'act-status-change',
        type: 'status-change',
        timestamp: '18 Aug',
        performedBy: CURRENT_USER,
        comments: [],
        fromStatus: 'Potential',
        toStatus: 'Qualified',
      },
      {
        id: 'act-lead-distributed',
        type: 'custom',
        timestamp: '30 Jul',
        performedBy: CURRENT_USER,
        comments: [],
        title: 'Lead Distributed & Upgraded',
        body: 'Assigned via Round Robin',
        ...SYSTEM_ICON,
      },
      {
        id: 'act-admin-qc',
        type: 'custom',
        timestamp: '30 Jul',
        performedBy: CURRENT_USER,
        comments: [],
        title: 'Admin QC approved',
        body: 'Valid inbound inquiry · Verified by Stanley A.',
        ...SYSTEM_ICON,
      },
      {
        id: 'act-lead-created',
        type: 'custom',
        timestamp: '30 Jul',
        performedBy: CURRENT_USER,
        comments: [],
        title: 'Lead created · Inbound · Website form',
        body: 'Company, contact, revenue, and sector auto-populated',
        ...SYSTEM_ICON,
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
