import { Component } from '@angular/core';
import { MoreVerticalIcon } from '@hugeicons/core-free-icons';
import { MenuItem } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
import { AppIcon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-lead-actions-toolbar',
  imports: [SplitButton, AppIcon],
  styleUrl: './lead-actions-toolbar.scss',
  template: `
    <div class="toolbar">
      <p-splitbutton label="Connect" severity="primary" [model]="connectOptions" />
      <button type="button" class="menu-button" aria-label="More options">
        <app-icon [icon]="moreIcon" [size]="16" />
      </button>
    </div>
  `,
})
export class LeadActionsToolbar {
  protected readonly moreIcon = MoreVerticalIcon;

  // Command actions (call/email/etc.) aren't wired up yet - not specified.
  protected readonly connectOptions: MenuItem[] = [
    { label: 'Call' },
    { label: 'Email' },
    { label: 'SMS' },
    { label: 'Meeting' },
  ];
}
