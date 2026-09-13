import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import PlusSignIcon from '@hugeicons/core-free-icons/PlusSignIcon';
import Search01Icon from '@hugeicons/core-free-icons/Search01Icon';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { Opportunity } from '../../models/opportunity.model';
import { OpportunityCard } from './opportunity-card';

@Component({
  selector: 'app-opportunities-panel',
  imports: [FormsModule, AppIcon, OpportunityCard],
  styleUrl: './opportunities-panel.scss',
  template: `
    <div class="opportunities-panel">
      <div class="panel-header">
        <div class="heading-block">
          <p class="title">Opportunities</p>
          <p class="description">Manage and track active opportunities for this account.</p>
        </div>

        <div class="actions">
          <div class="search-field">
            <app-icon [icon]="searchIcon" [size]="14" />
            <input
              type="text"
              placeholder="Search"
              [ngModel]="searchTerm()"
              (ngModelChange)="searchTerm.set($event)"
            />
          </div>
          <button type="button" class="add-button" (click)="onAddOpportunity()">
            <app-icon [icon]="plusIcon" [size]="14" />
            Add Opportunity
          </button>
        </div>
      </div>

      <div class="opportunities-grid">
        @for (opportunity of filteredOpportunities(); track opportunity.id) {
          <app-opportunity-card
            [opportunity]="opportunity"
            (delete)="removeOpportunity(opportunity.id)"
            (view)="onView(opportunity.id)"
          />
        } @empty {
          <p class="empty-state">No opportunities match your search.</p>
        }
      </div>
    </div>
  `,
})
export class OpportunitiesPanel {
  readonly initialOpportunities = input.required<Opportunity[]>({ alias: 'opportunities' });

  protected readonly opportunities = linkedSignal(() => this.initialOpportunities());
  protected readonly searchTerm = signal('');

  protected readonly filteredOpportunities = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.opportunities();
    }
    return this.opportunities().filter((opportunity) =>
      opportunity.name.toLowerCase().includes(term),
    );
  });

  protected readonly searchIcon = Search01Icon;
  protected readonly plusIcon = PlusSignIcon;

  protected removeOpportunity(id: string): void {
    this.opportunities.update((list) => list.filter((opportunity) => opportunity.id !== id));
  }

  protected onView(id: string): void {
    // TODO: navigate to the opportunity detail view once it exists.
  }

  protected onAddOpportunity(): void {
    // TODO: open the create-opportunity form once it exists.
  }
}
