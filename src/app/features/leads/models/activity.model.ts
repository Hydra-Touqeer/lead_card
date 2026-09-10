export interface ActivityPerson {
  name: string;
  avatarUrl: string;
}

export interface ActivityComment {
  id: string;
  author: ActivityPerson;
  text: string;
  timestamp: string;
}

export interface ActivityOutcomeField {
  label: string;
  value: string;
}

export interface ActivityOutcome {
  label: string;
  fields?: ActivityOutcomeField[];
}

/** Flat, mocked for now - will come from the (not yet built) Settings screens. */
export interface ActivityOutcomeOption {
  label: string;
}

export interface LinkedOpportunity {
  id: string;
  name: string;
}

export interface ActivityTag {
  label: string;
  dotColor: string;
}

export type CallDirection = 'outgoing' | 'incoming' | 'missed' | 'unanswered';

interface ActivityBase {
  id: string;
  timestamp: string;
  performedBy: ActivityPerson;
  comments: ActivityComment[];
  outcome?: ActivityOutcome;
  linkedOpportunity?: LinkedOpportunity;
  tags?: ActivityTag[];
}

export interface NoteActivity extends ActivityBase {
  type: 'note';
  body: string;
}

export interface EmailMessage {
  id: string;
  from: ActivityPerson;
  to: string;
  timestamp: string;
  body: string;
  error?: string;
}

export interface EmailActivity extends ActivityBase {
  type: 'email';
  subject: string;
  messages: EmailMessage[];
}

export interface SmsActivity extends ActivityBase {
  type: 'sms';
  direction: 'outgoing' | 'incoming';
  body: string;
}

export interface CallActivity extends ActivityBase {
  type: 'call';
  title: string;
  direction: CallDirection;
  durationSeconds: number;
  recordingUrl?: string;
  transcript?: string;
}

export interface MeetingActivity extends ActivityBase {
  type: 'meeting';
  title: string;
  durationMinutes?: number;
  attendeeCount?: number;
  description?: string;
}

export interface StatusChangeActivity extends ActivityBase {
  type: 'status-change';
  fromStatus: string;
  toStatus: string;
}

export interface TaskCompletedActivity extends ActivityBase {
  type: 'task-completed';
  taskTitle: string;
}

export interface CustomActivity extends ActivityBase {
  type: 'custom';
  title: string;
  body?: string;
  iconBackground: string;
  iconColor: string;
}

export type ActivityItem =
  | NoteActivity
  | EmailActivity
  | SmsActivity
  | CallActivity
  | MeetingActivity
  | StatusChangeActivity
  | TaskCompletedActivity
  | CustomActivity;

/** Activity types that represent something at the opportunity level, not just the lead. */
export const OPPORTUNITY_LEVEL_TYPES: ReadonlySet<ActivityItem['type']> = new Set([
  'note',
  'email',
  'sms',
  'call',
  'meeting',
  'task-completed',
  'custom',
]);

export interface ActivityGroup {
  label?: string;
  items: ActivityItem[];
}
