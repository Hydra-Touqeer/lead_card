import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

interface ActivityFilterOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-activity-filter',
  imports: [FormsModule, SelectButton],
  template: `
    <p-selectbutton
      [options]="options"
      optionLabel="label"
      optionValue="value"
      [ngModel]="selected()"
      (ngModelChange)="selected.set($event)"
      [allowEmpty]="false"
    />
  `,
})
export class ActivityFilter {
  readonly selected = model<string>('all');

  protected readonly options: ActivityFilterOption[] = [
    { label: 'All (12)', value: 'all' },
    { label: 'Important', value: 'important' },
    { label: 'Conversations', value: 'conversations' },
    { label: 'Notes & Summaries', value: 'notes' },
    { label: 'Log', value: 'log' },
  ];
}
