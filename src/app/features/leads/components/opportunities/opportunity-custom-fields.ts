import { Component, computed, input, linkedSignal, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Delete02Icon from '@hugeicons/core-free-icons/Delete02Icon';
import PlusSignIcon from '@hugeicons/core-free-icons/PlusSignIcon';
import Search01Icon from '@hugeicons/core-free-icons/Search01Icon';
import { Popover } from 'primeng/popover';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import {
  MOCK_CUSTOM_FIELD_CATALOG,
  OpportunityCustomFieldValue,
} from '../../models/opportunity.model';

@Component({
  selector: 'app-opportunity-custom-fields',
  imports: [FormsModule, AppIcon, Popover],
  styleUrl: './opportunity-custom-fields.scss',
  template: `
    <div class="fields-header">
      <p class="section-title">Custom Fields</p>
      <button
        type="button"
        class="add-field-button"
        aria-label="Add custom field"
        (click)="openCatalog($event)"
      >
        <app-icon [icon]="plusIcon" [size]="14" />
      </button>
    </div>

    @if (fields().length > 0) {
      <div class="fields-list">
        @for (field of fields(); track field.id) {
          <div class="field-row">
            <span class="field-label">{{ field.label }}</span>
            <input
              type="text"
              class="field-value"
              [ngModel]="field.value"
              (ngModelChange)="updateValue(field.id, $event)"
            />
            <button
              type="button"
              class="field-remove"
              aria-label="Remove field"
              (click)="removeField(field.id)"
            >
              <app-icon [icon]="deleteIcon" [size]="14" />
            </button>
          </div>
        }
      </div>
    } @else {
      <p class="empty-state">No custom fields added yet.</p>
    }

    <p-popover #popover>
      <div class="catalog-panel">
        <div class="panel-header">Add a field</div>
        <div class="catalog-search">
          <app-icon [icon]="searchIcon" [size]="14" />
          <input
            type="text"
            placeholder="Search fields"
            [ngModel]="searchTerm()"
            (ngModelChange)="searchTerm.set($event)"
          />
        </div>
        @for (definition of availableDefinitions(); track definition.id) {
          <button type="button" class="catalog-option" (click)="addField(definition.id); popover.hide()">
            {{ definition.label }}
          </button>
        } @empty {
          <p class="panel-empty">No matching fields.</p>
        }
      </div>
    </p-popover>
  `,
})
export class OpportunityCustomFields {
  readonly initialFields = input<OpportunityCustomFieldValue[]>([], { alias: 'fields' });

  protected readonly fields = linkedSignal(() => this.initialFields());
  protected readonly searchTerm = signal('');

  protected readonly availableDefinitions = computed(() => {
    const usedLabels = new Set(this.fields().map((field) => field.label));
    const term = this.searchTerm().trim().toLowerCase();
    return MOCK_CUSTOM_FIELD_CATALOG.filter(
      (definition) =>
        !usedLabels.has(definition.label) && definition.label.toLowerCase().includes(term),
    );
  });

  protected readonly plusIcon = PlusSignIcon;
  protected readonly deleteIcon = Delete02Icon;
  protected readonly searchIcon = Search01Icon;

  private readonly popoverRef = viewChild.required(Popover);

  protected openCatalog(event: Event): void {
    this.searchTerm.set('');
    this.popoverRef().toggle(event);
  }

  openPanel(anchor: HTMLElement): void {
    this.searchTerm.set('');
    this.popoverRef().show(undefined, anchor);
  }

  getFields(): OpportunityCustomFieldValue[] {
    return this.fields();
  }

  protected addField(definitionId: string): void {
    const definition = MOCK_CUSTOM_FIELD_CATALOG.find((option) => option.id === definitionId);
    if (!definition) {
      return;
    }
    this.fields.update((list) => [...list, { id: crypto.randomUUID(), label: definition.label, value: '' }]);
  }

  protected updateValue(id: string, value: string): void {
    this.fields.update((list) => list.map((field) => (field.id === id ? { ...field, value } : field)));
  }

  protected removeField(id: string): void {
    this.fields.update((list) => list.filter((field) => field.id !== id));
  }
}
