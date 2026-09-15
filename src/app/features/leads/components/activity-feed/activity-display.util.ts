import { IconSvgObject } from '@hugeicons/angular';
import Calendar01Icon from '@hugeicons/core-free-icons/Calendar01Icon';
import CallIncoming01Icon from '@hugeicons/core-free-icons/CallIncoming01Icon';
import CallMissed01Icon from '@hugeicons/core-free-icons/CallMissed01Icon';
import CallOutgoing01Icon from '@hugeicons/core-free-icons/CallOutgoing01Icon';
import Exchange01Icon from '@hugeicons/core-free-icons/Exchange01Icon';
import Flag01Icon from '@hugeicons/core-free-icons/Flag01Icon';
import Mail01Icon from '@hugeicons/core-free-icons/Mail01Icon';
import Message01Icon from '@hugeicons/core-free-icons/Message01Icon';
import StickyNote01Icon from '@hugeicons/core-free-icons/StickyNote01Icon';
import TaskDone01Icon from '@hugeicons/core-free-icons/TaskDone01Icon';
import { ActivityItem, CallDirection } from '../../models/activity.model';

const CALL_DIRECTION_ICON: Record<CallDirection, IconSvgObject> = {
  outgoing: CallOutgoing01Icon,
  unanswered: CallOutgoing01Icon,
  incoming: CallIncoming01Icon,
  missed: CallMissed01Icon,
};

export interface ActivityIconMeta {
  icon: IconSvgObject;
  background: string;
  color: string;
}

export function getActivityIconMeta(activity: ActivityItem): ActivityIconMeta {
  switch (activity.type) {
    case 'note':
      return { icon: StickyNote01Icon, background: '#fef3c7', color: '#b45309' };
    case 'email':
      return { icon: Mail01Icon, background: 'var(--bg-brand-primary)', color: 'var(--fg-brand-primary)' };
    case 'sms':
      return { icon: Message01Icon, background: '#cffafe', color: '#0e7490' };
    case 'call': {
      const isFailed = activity.direction === 'missed' || activity.direction === 'unanswered';
      return {
        icon: CALL_DIRECTION_ICON[activity.direction],
        background: isFailed ? 'var(--bg-error-primary)' : 'var(--bg-success-primary)',
        color: isFailed ? 'var(--fg-error-primary)' : 'var(--fg-success-primary)',
      };
    }
    case 'meeting':
      return { icon: Calendar01Icon, background: '#ede9fe', color: '#6d28d9' };
    case 'status-change':
      return { icon: Exchange01Icon, background: 'var(--bg-quaternary)', color: 'var(--fg-quaternary)' };
    case 'task-completed':
      return { icon: TaskDone01Icon, background: 'var(--bg-warning-primary)', color: 'var(--fg-warning-primary)' };
    case 'custom':
      return { icon: Flag01Icon, background: activity.iconBackground, color: activity.iconColor };
  }
}

export function getActivityTitle(activity: ActivityItem): string {
  switch (activity.type) {
    case 'note':
      return 'Note';
    case 'email':
      return activity.subject;
    case 'sms':
      return activity.direction === 'outgoing' ? 'SMS sent' : 'SMS received';
    case 'call':
      return activity.title;
    case 'meeting':
      return activity.title;
    case 'status-change':
      return `Status changed from ${activity.fromStatus} to ${activity.toStatus}`;
    case 'task-completed':
      return `Task completed: ${activity.taskTitle}`;
    case 'custom':
      return activity.title;
  }
}

export function getActivitySubtitle(activity: ActivityItem): string | undefined {
  switch (activity.type) {
    case 'note':
      return activity.body;
    case 'sms':
      return activity.body;
    case 'custom':
      return activity.body;
    case 'email':
      return activity.messages.at(-1)?.body;
    case 'call':
      return activity.transcript;
    case 'meeting':
      return activity.description;
    case 'status-change':
    case 'task-completed':
      return undefined;
  }
}
