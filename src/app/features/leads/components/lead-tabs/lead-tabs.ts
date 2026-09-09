import { Component, model } from '@angular/core';

interface LeadTabItem {
  id: string;
  label: string;
  disabled: boolean;
}

@Component({
  selector: 'app-lead-tabs',
  styleUrl: './lead-tabs.scss',
  template: `
    <nav class="lead-tabs">
      @for (tab of tabs; track tab.id) {
        <button
          type="button"
          class="tab"
          [class.active]="activeTab() === tab.id"
          [disabled]="tab.disabled"
          (click)="activeTab.set(tab.id)"
        >
          {{ tab.label }}
        </button>
      }
    </nav>
  `,
})
export class LeadTabs {
  readonly activeTab = model<string>('activity');

  protected readonly tabs: LeadTabItem[] = [
    { id: 'activity', label: 'Activity', disabled: false },
    { id: 'details', label: 'Details', disabled: true },
    { id: 'opportunities', label: 'Opportunities (2)', disabled: true },
    { id: 'contacts', label: 'Contacts (50)', disabled: true },
  ];
}
