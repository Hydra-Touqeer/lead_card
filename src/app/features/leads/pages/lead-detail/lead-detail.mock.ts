import { ActivityGroup, ActivityPerson } from '../../models/activity.model';
import { DEFAULT_PIPELINE_STAGES, Opportunity, OpportunityContact } from '../../models/opportunity.model';
import { Task } from '../../models/task.model';
import {
  LeadContact,
  LeadStatusBadge,
  LeadTag,
  LeadWorkflow,
} from '../../components/lead-intro/lead-intro';
import { CURRENT_USER } from '../../components/activity-feed/activity-options.mock';

const SAAD_HASAN: ActivityPerson = {
  name: 'Saad Hasan',
  avatarUrl: 'https://www.figma.com/api/mcp/asset/b047646d-1e62-4573-be55-78a784583447.png',
};

export const MOCK_STATUS_BADGES: LeadStatusBadge[] = [
  {
    label: 'Inbound · Website',
    dotColor: 'var(--fg-brand-primary)',
    options: ['Inbound · Website', 'Inbound · Phone', 'Outbound · Referral'],
  },
  {
    label: 'Active',
    dotColor: 'var(--fg-success-primary)',
    options: ['Active', 'On Hold', 'Inactive'],
  },
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

const DANA_WHITFIELD: OpportunityContact = {
  initials: 'DW',
  name: 'Dana Whitfield',
  role: 'CFO · Primary',
  email: 'dana.whitfield@kestrelmfg.com',
  phone: '+1 (555) 010-2938',
};

const MARCUS_LEE: OpportunityContact = {
  initials: 'ML',
  name: 'Marcus Lee',
  role: 'AR Manager',
  email: 'marcus.lee@kestrelmfg.com',
  phone: '+1 (555) 010-4471',
};

const PRIYA_NAIR: OpportunityContact = {
  initials: 'PN',
  name: 'Priya Nair',
  role: 'Credit Controller',
  email: 'priya.nair@kestrelmfg.com',
  phone: '+1 (555) 010-5820',
};

export const MOCK_OPPORTUNITY_CONTACTS: OpportunityContact[] = [DANA_WHITFIELD, MARCUS_LEE, PRIYA_NAIR];

export const MOCK_OWNER_OPTIONS: OpportunityContact[] = [
  {
    initials: 'SA',
    name: 'Stanley Adeyemi',
    role: 'Sales Agent',
    email: 'stanley.adeyemi@collectware.com',
    phone: '+1 (555) 019-3010',
  },
  {
    initials: 'MT',
    name: 'Muhammad Touqeer',
    role: 'Collector',
    email: 'mtouqeer@itpath.io',
    phone: '+1 (555) 019-4477',
  },
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    name: 'Third Party Contingency',
    createdLabel: 'Jul 30',
    value: 18000,
    service: 'Contingency',
    opportunityAgeDays: 44,
    stageAgeDays: 11,
    stage: DEFAULT_PIPELINE_STAGES[0].label,
    stageDotColor: DEFAULT_PIPELINE_STAGES[0].dotColor,
    expectedCloseDate: new Date('2027-05-15'),
    description: '~$82K commercial AR across 14 debtors. Contingency placement for 90+ day accounts.',
    contacts: [DANA_WHITFIELD],
    owner: MOCK_OWNER_OPTIONS[0],
    comments: [],
    attachments: [
      { id: 'att-1', name: 'Contingency_Proposal_v1.pdf', sizeLabel: '240 KB', sentLabel: 'sent 31m ago' },
      { id: 'att-2', name: 'Rate_Schedule.xlsx', sizeLabel: '88 KB' },
      { id: 'att-3', name: 'Kestrel_AR_Aging.xlsx', sizeLabel: '240 KB', sentLabel: 'sent 31m ago' },
      { id: 'att-4', name: 'Contingency_Proposal_v2.pdf', sizeLabel: '240 KB' },
    ],
    customFields: [
      { id: 'cf-1', label: 'Placement Value', value: '$18,000' },
      { id: 'cf-2', label: 'Commission Rate', value: '22% · 90+ days' },
      { id: 'cf-3', label: 'Contract Type', value: 'Contingency' },
      { id: 'cf-4', label: 'Debtors', value: '14 files' },
      { id: 'cf-5', label: 'Expected Close', value: 'Aug 31, 2026' },
      { id: 'cf-6', label: 'Source', value: 'Inbound · Website' },
      { id: 'cf-7', label: 'Activation Fee', value: '$750' },
    ],
  },
  {
    id: 'opp-2',
    name: 'First Party Fit',
    createdLabel: 'Aug 12',
    value: 32000,
    service: 'First Party Collections',
    opportunityAgeDays: 21,
    stageAgeDays: 5,
    stage: DEFAULT_PIPELINE_STAGES[2].label,
    stageDotColor: DEFAULT_PIPELINE_STAGES[2].dotColor,
    expectedCloseDate: new Date('2027-03-01'),
    description: 'Early-stage, high-volume receivables. Evaluating a first-party collections program.',
    contacts: [DANA_WHITFIELD, MARCUS_LEE],
    owner: MOCK_OWNER_OPTIONS[1],
    comments: [
      {
        id: 'opp-cmt-1',
        author: SAAD_HASAN,
        text: 'Dana wants to see the recovery-rate breakdown before signing off.',
        timestamp: '2d ago',
      },
    ],
    attachments: [
      { id: 'att-5', name: 'Proposal_FirstPartyFit.pdf', sizeLabel: '212 KB', sentLabel: 'sent 2d ago' },
    ],
    customFields: [{ id: 'cf-8', label: 'Source', value: 'Inbound · Website' }],
  },
  {
    id: 'opp-3',
    name: 'AR Automation Renewal',
    createdLabel: 'Jun 3',
    value: 54000,
    service: 'AR Automation',
    opportunityAgeDays: 67,
    stageAgeDays: 9,
    stage: DEFAULT_PIPELINE_STAGES[3].label,
    stageDotColor: DEFAULT_PIPELINE_STAGES[3].dotColor,
    expectedCloseDate: new Date('2026-12-20'),
    description: 'Renewing the automated AR reminders workflow for another 12-month term.',
    contacts: [PRIYA_NAIR],
    owner: MOCK_OWNER_OPTIONS[0],
    comments: [],
    attachments: [],
    customFields: [],
  },
];

export const MOCK_WORKFLOWS: LeadWorkflow[] = [
  {
    id: 'wf-1',
    name: 'Third Party Contingency Onboarding',
    status: 'Active',
    statusDotColor: 'var(--fg-success-primary)',
    currentStep: 'Step 3 of 5 · Awaiting signed agreement',
  },
  {
    id: 'wf-2',
    name: 'Credit Check & Verification',
    status: 'Active',
    statusDotColor: 'var(--fg-success-primary)',
    currentStep: 'Step 2 of 4 · Running credit check',
  },
  {
    id: 'wf-3',
    name: 'First Party Fit Assessment',
    status: 'Active',
    statusDotColor: 'var(--fg-success-primary)',
    currentStep: 'Step 1 of 3 · Discovery call scheduled',
  },
  {
    id: 'wf-4',
    name: 'Compliance Review',
    status: 'Pending',
    statusDotColor: 'var(--fg-warning-primary)',
    currentStep: 'Step 1 of 2 · Awaiting document upload',
  },
  {
    id: 'wf-5',
    name: 'Renewal Reminder',
    status: 'Active',
    statusDotColor: 'var(--fg-success-primary)',
    currentStep: 'Step 2 of 2 · Reminder scheduled',
  },
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
        subject: 'Proposal: Third Party Contingency ($18,000)',
        messages: [
          {
            id: 'msg-1',
            from: CURRENT_USER,
            to: 'dana.whitfield@kestrelmfg.com',
            timestamp: 'Yesterday',
            body: 'Hi Dana, following up on our call - attaching the proposal for third-party contingency at 22% on 90+ day placements. Let me know if you have any questions.',
            error: 'Could not log in to the SMTP server. Please reconnect your email account.',
          },
          {
            id: 'msg-2',
            from: SAAD_HASAN,
            to: 'mtouqeer@itpath.io',
            timestamp: '31 min ago',
            body: 'Dana asked if we could break this out by account tier - can you resend with that split included?',
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
        title: 'Discovery Call',
        direction: 'outgoing',
        durationSeconds: 512,
        recordingUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        transcript:
          "Hi Dana, thanks for taking the time today. I wanted to walk through our first-party collections approach for the receivables you flagged. We typically see a 22% recovery rate on 90-plus day placements in this segment, and I think there's a strong case for running this alongside your existing process rather than replacing it outright. Let me know if you'd like to loop in Marcus before we put together a formal proposal.",
        outcome: { label: 'Connected - Interested' },
      },
      {
        id: 'act-attempted-call',
        type: 'call',
        timestamp: '1hr ago',
        performedBy: CURRENT_USER,
        comments: [],
        linkedOpportunity: { id: 'opp-2', name: 'First Party Fit' },
        title: 'Attempted to call Dana Whitfield',
        direction: 'unanswered',
        durationSeconds: 0,
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
