export type TaskStatus = 'overdue' | 'upcoming' | 'completed';

export interface Task {
  title: string;
  status: TaskStatus;
  dueDate: string;
  tag: string;
  assignee: string;
  assigneeInitials: string;
  completed: boolean;
}
