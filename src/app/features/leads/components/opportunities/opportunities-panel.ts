import { Component, computed, inject, input, linkedSignal, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import PlusSignIcon from '@hugeicons/core-free-icons/PlusSignIcon';
import Search01Icon from '@hugeicons/core-free-icons/Search01Icon';
import { ConfirmationService } from 'primeng/api';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { ActivityItem } from '../../models/activity.model';
import { Opportunity, OpportunityContact } from '../../models/opportunity.model';
import { OpportunityCard } from './opportunity-card';
import { OpportunityDetailDrawer } from './opportunity-detail-drawer';
import { OpportunityFormDrawer } from './opportunity-form-drawer';

@Component({
  selector: 'app-opportunities-panel',
  imports: [FormsModule, AppIcon, OpportunityCard, OpportunityDetailDrawer, OpportunityFormDrawer],
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
            (delete)="confirmDelete(opportunity)"
            (view)="onView(opportunity)"
            (edit)="onEditOpportunity(opportunity)"
          />
        } @empty {
          <p class="empty-state">No opportunities match your search.</p>
        }
      </div>
    </div>

    <app-opportunity-detail-drawer
      [opportunity]="selectedOpportunity()"
      [activities]="activities()"
      [(visible)]="viewDrawerVisible"
      (edit)="onEditFromDrawer()"
      (delete)="onDeleteFromDrawer()"
      (viewActivity)="onViewActivity($event)"
    />

    <app-opportunity-form-drawer
      [contactOptions]="contactOptions()"
      [ownerOptions]="ownerOptions()"
      (saved)="onSaved($event)"
    />
  `,
})
export class OpportunitiesPanel {
  readonly initialOpportunities = input.required<Opportunity[]>({ alias: 'opportunities' });
  readonly contactOptions = input.required<OpportunityContact[]>();
  readonly ownerOptions = input.required<OpportunityContact[]>();
  readonly activities = input<ActivityItem[]>([]);

  readonly viewActivity = output<string>();

  private readonly confirmationService = inject(ConfirmationService);

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

  protected readonly selectedOpportunity = signal<Opportunity | null>(null);
  protected readonly viewDrawerVisible = signal(false);

  private readonly formDrawer = viewChild.required(OpportunityFormDrawer);

  protected onView(opportunity: Opportunity): void {
    this.selectedOpportunity.set(opportunity);
    this.viewDrawerVisible.set(true);
  }

  protected onAddOpportunity(): void {
    this.formDrawer().openForAdd();
  }

  protected onEditOpportunity(opportunity: Opportunity): void {
    this.formDrawer().openForEdit(opportunity);
  }

  protected onEditFromDrawer(): void {
    const opportunity = this.selectedOpportunity();
    if (!opportunity) {
      return;
    }
    this.viewDrawerVisible.set(false);
    this.formDrawer().openForEdit(opportunity);
  }

  protected onSaved(event: { mode: 'add' | 'edit'; opportunity: Opportunity }): void {
    if (event.mode === 'add') {
      this.opportunities.update((list) => [...list, event.opportunity]);
    } else {
      this.opportunities.update((list) =>
        list.map((item) => (item.id === event.opportunity.id ? event.opportunity : item)),
      );
      if (this.selectedOpportunity()?.id === event.opportunity.id) {
        this.selectedOpportunity.set(event.opportunity);
      }
    }
  }

  protected confirmDelete(opportunity: Opportunity): void {
    this.confirmationService.confirm({
      header: 'Delete opportunity',
      message: `Delete "${opportunity.name}"? This can't be undone.`,
      acceptButtonProps: { label: 'Delete', severity: 'danger' },
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
      accept: () => this.removeOpportunity(opportunity.id),
    });
  }

  protected onDeleteFromDrawer(): void {
    const opportunity = this.selectedOpportunity();
    if (opportunity) {
      this.confirmDelete(opportunity);
    }
  }

  protected onViewActivity(activityId: string): void {
    this.viewDrawerVisible.set(false);
    this.viewActivity.emit(activityId);
  }

  private removeOpportunity(id: string): void {
    this.opportunities.update((list) => list.filter((opportunity) => opportunity.id !== id));
    if (this.selectedOpportunity()?.id === id) {
      this.viewDrawerVisible.set(false);
      this.selectedOpportunity.set(null);
    }
  }
}
