import { Component, input, model, signal } from '@angular/core';
import ArrowLeftDoubleIcon from '@hugeicons/core-free-icons/ArrowLeftDoubleIcon';
import ArrowRightDoubleIcon from '@hugeicons/core-free-icons/ArrowRightDoubleIcon';
import CheckListIcon from '@hugeicons/core-free-icons/CheckListIcon';
import Clock01Icon from '@hugeicons/core-free-icons/Clock01Icon';
import File02Icon from '@hugeicons/core-free-icons/File02Icon';
import Search01Icon from '@hugeicons/core-free-icons/Search01Icon';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Badge } from '../../../../shared/ui/badge/badge';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { Task } from '../../models/task.model';
import { TaskCard } from './task-card';

type RailTab = 'tasks' | 'files' | 'log';

@Component({
  selector: 'app-task-panel',
  imports: [AppIcon, IconField, InputIcon, InputText, Badge, TaskCard],
  styleUrl: './task-panel.scss',
  host: {
    '[class.collapsed]': 'collapsed()',
  },
  template: `
    <div class="task-panel">
      <div class="rail">
        <button
          type="button"
          class="collapse-toggle"
          [attr.aria-label]="collapsed() ? 'Expand panel' : 'Collapse panel'"
          (click)="collapsed.set(!collapsed())"
        >
          <app-icon [icon]="collapsed() ? expandIcon : collapseIcon" [size]="21" />
        </button>

        <nav class="rail-tabs">
          <button
            type="button"
            class="rail-tab"
            [class.active]="activeTab() === 'tasks'"
            aria-label="Tasks"
            (click)="activeTab.set('tasks')"
          >
            <app-icon [icon]="tasksIcon" [size]="16" />
          </button>
          <button type="button" class="rail-tab" disabled aria-label="Files">
            <app-icon [icon]="filesIcon" [size]="16" />
          </button>
          <button type="button" class="rail-tab" disabled aria-label="Log">
            <app-icon [icon]="logIcon" [size]="16" />
          </button>
        </nav>
      </div>

      @if (!collapsed()) {
        <div class="panel-card">
          <div class="panel-header">
            <div class="header-content">
              <span class="header-title">Pending Tasks</span>
              <app-badge [label]="tasks().length.toString()" />
            </div>
            <div class="header-divider"></div>
          </div>

          <div class="panel-body">
            <p-iconfield>
              <p-inputicon>
                <app-icon [icon]="searchIcon" [size]="14" />
              </p-inputicon>
              <input type="text" pInputText placeholder="Search tasks" />
            </p-iconfield>

            <div class="task-list">
              @for (task of tasks(); track task.title) {
                <app-task-card [task]="task" />
              }
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class TaskPanel {
  readonly tasks = input.required<Task[]>();
  readonly collapsed = model<boolean>(false);

  protected readonly activeTab = signal<RailTab>('tasks');

  protected readonly collapseIcon = ArrowRightDoubleIcon;
  protected readonly expandIcon = ArrowLeftDoubleIcon;
  protected readonly tasksIcon = CheckListIcon;
  protected readonly filesIcon = File02Icon;
  protected readonly logIcon = Clock01Icon;
  protected readonly searchIcon = Search01Icon;
}
