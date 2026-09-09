import { IconSvgObject } from '@hugeicons/angular';
import {
  Analytics01Icon,
  ChatBotIcon,
  DashboardSquare01Icon,
  ListViewIcon,
  Message01Icon,
  Ticket01Icon,
  UserGroupIcon,
  WorkflowSquare01Icon,
} from '@hugeicons/core-free-icons';

export interface NavItem {
  label: string;
  icon: IconSvgObject;
  route: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: DashboardSquare01Icon, route: '/dashboard' },
  { label: 'Leads', icon: ListViewIcon, route: '/leads' },
  { label: 'Debtors', icon: UserGroupIcon, route: '/debtors' },
  { label: 'Communication', icon: Message01Icon, route: '/communication' },
  { label: 'Workflow', icon: WorkflowSquare01Icon, route: '/workflow' },
  { label: 'Reports', icon: Analytics01Icon, route: '/reports' },
  { label: 'Tickets', icon: Ticket01Icon, route: '/tickets' },
  { label: 'Chatbot', icon: ChatBotIcon, route: '/chatbot' },
];
