import { IconSvgObject } from '@hugeicons/angular';
import Analytics01Icon from '@hugeicons/core-free-icons/Analytics01Icon';
import ChatBotIcon from '@hugeicons/core-free-icons/ChatBotIcon';
import DashboardSquare01Icon from '@hugeicons/core-free-icons/DashboardSquare01Icon';
import ListViewIcon from '@hugeicons/core-free-icons/ListViewIcon';
import Message01Icon from '@hugeicons/core-free-icons/Message01Icon';
import Ticket01Icon from '@hugeicons/core-free-icons/Ticket01Icon';
import UserGroupIcon from '@hugeicons/core-free-icons/UserGroupIcon';
import WorkflowSquare01Icon from '@hugeicons/core-free-icons/WorkflowSquare01Icon';

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
