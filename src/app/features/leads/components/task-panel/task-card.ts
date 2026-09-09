import { Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { Badge } from '../../../../shared/ui/badge/badge';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [FormsModule, Checkbox, Badge],
  styleUrl: './task-card.scss',
  template: `
    <div class="task-card">
      <p-checkbox
        [binary]="true"
        [ngModel]="task().completed"
        (ngModelChange)="completedChange.emit($event)"
      />

      <div class="task-body">
        <div class="title-row">
          <span class="title">{{ task().title }}</span>
          <app-badge [label]="statusLabel()" [dotColor]="statusDotColor()" />
        </div>

        <p class="due-date" [class.overdue]="task().status === 'overdue'">{{ task().dueDate }}</p>

        <div class="divider"></div>

        <div class="meta-row">
          <app-badge [label]="task().tag" dotColor="var(--fg-brand-primary)" [dropdown]="true" />
          <app-badge [label]="'Assignee: ' + task().assignee" [avatarInitials]="task().assigneeInitials" />
        </div>
      </div>
    </div>
  `,
})
export class TaskCard {
  readonly task = input.required<Task>();
  readonly completedChange = output<boolean>();

  protected readonly statusLabel = computed(() => {
    switch (this.task().status) {
      case 'overdue':
        return 'Overdue';
      case 'completed':
        return 'Completed';
      default:
        return 'Upcoming';
    }
  });

  protected readonly statusDotColor = computed(() => {
    switch (this.task().status) {
      case 'overdue':
        return 'var(--fg-error-primary)';
      case 'completed':
        return 'var(--fg-success-primary)';
      default:
        return 'var(--fg-quaternary)';
    }
  });
}
