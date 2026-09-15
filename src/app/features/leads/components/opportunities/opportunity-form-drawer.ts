import { Component, input, model, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Cancel01Icon from '@hugeicons/core-free-icons/Cancel01Icon';
import { Drawer } from 'primeng/drawer';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import {
  DEFAULT_PIPELINE_STAGES,
  Opportunity,
  OpportunityAttachment,
  OpportunityContact,
  OpportunityCustomFieldValue,
} from '../../models/opportunity.model';
import { ActivityComment } from '../../models/activity.model';
import { OpportunityAttachmentsList } from './opportunity-attachments-list';
import { OpportunityCustomFields } from './opportunity-custom-fields';

type FormMode = 'add' | 'edit';

interface PreservedFields {
  createdLabel: string;
  opportunityAgeDays: number;
  stageAgeDays: number;
  comments: ActivityComment[];
}

@Component({
  selector: 'app-opportunity-form-drawer',
  imports: [FormsModule, Drawer, AppIcon, OpportunityAttachmentsList, OpportunityCustomFields],
  styleUrl: './opportunity-form-drawer.scss',
  template: `
    <p-drawer
      [(visible)]="visible"
      position="right"
      [modal]="true"
      [showCloseIcon]="false"
      [style]="{ width: '520px' }"
    >
      <ng-template #header>
        <div class="drawer-header">
          <p class="drawer-title">Opportunity</p>
          <button type="button" class="close-button" aria-label="Close" (click)="cancel()">
            <app-icon [icon]="closeIcon" [size]="16" />
          </button>
        </div>
      </ng-template>

      <ng-template #content>
        <div class="drawer-body">
          <div class="field">
            <label for="opp-name">Opportunity name</label>
            <input
              id="opp-name"
              type="text"
              [(ngModel)]="name"
              placeholder="e.g. Third Party Contingency"
            />
          </div>

          <div class="field-row">
            <div class="field">
              <label for="opp-service">Service</label>
              <input id="opp-service" type="text" [(ngModel)]="service" placeholder="e.g. Contingency" />
            </div>
            <div class="field">
              <label for="opp-stage">Stage</label>
              <select id="opp-stage" [(ngModel)]="stage">
                @for (option of stageOptions; track option) {
                  <option [value]="option">{{ option }}</option>
                }
              </select>
            </div>
          </div>

          <p class="section-title">Details</p>

          <div class="field-row">
            <div class="field">
              <label for="opp-value">Estimated value</label>
              <div class="input-with-prefix">
                <span class="prefix">$</span>
                <input
                  id="opp-value"
                  type="number"
                  min="0"
                  [(ngModel)]="value"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div class="field">
              <label for="opp-close-date">Expected close date</label>
              <input id="opp-close-date" type="date" [(ngModel)]="expectedCloseDateValue" />
            </div>
          </div>

          <div class="field">
            <label for="opp-description">Description</label>
            <textarea
              id="opp-description"
              rows="4"
              [(ngModel)]="description"
              placeholder="Description"
            ></textarea>
          </div>

          <p class="section-title">People</p>

          <div class="field">
            <label for="opp-contact">Contact</label>
            <select id="opp-contact" [(ngModel)]="contactName">
              <option value="" disabled>Select</option>
              @for (option of contactOptions(); track option.name) {
                <option [value]="option.name">{{ option.name }}</option>
              }
            </select>
          </div>

          <div class="field">
            <label for="opp-owner">Owner</label>
            <select id="opp-owner" [(ngModel)]="ownerName">
              <option value="" disabled>Select</option>
              @for (option of ownerOptions(); track option.name) {
                <option [value]="option.name">{{ option.name }}</option>
              }
            </select>
          </div>

          <div class="section">
            <app-opportunity-attachments-list [attachments]="attachmentsValue()" mode="edit" />
          </div>

          <div class="section">
            <app-opportunity-custom-fields [fields]="customFieldsValue()" />
          </div>
        </div>
      </ng-template>

      <ng-template #footer>
        <div class="drawer-footer">
          <button type="button" class="cancel-button" (click)="cancel()">Cancel</button>
          <button type="button" class="save-button" [disabled]="!canSave" (click)="save()">
            {{ mode() === 'edit' ? 'Save Changes' : 'Add Opportunity' }}
          </button>
        </div>
      </ng-template>
    </p-drawer>
  `,
})
export class OpportunityFormDrawer {
  readonly visible = model<boolean>(false);
  readonly contactOptions = input.required<OpportunityContact[]>();
  readonly ownerOptions = input.required<OpportunityContact[]>();

  readonly saved = output<{ mode: FormMode; opportunity: Opportunity }>();

  protected readonly mode = signal<FormMode>('add');
  protected readonly stageOptions = DEFAULT_PIPELINE_STAGES.map((stage) => stage.label);

  private editingId: string | null = null;
  private preserved: PreservedFields = {
    createdLabel: 'Just now',
    opportunityAgeDays: 0,
    stageAgeDays: 0,
    comments: [],
  };

  protected readonly attachmentsValue = signal<OpportunityAttachment[]>([]);
  protected readonly customFieldsValue = signal<OpportunityCustomFieldValue[]>([]);

  private readonly attachmentsList = viewChild(OpportunityAttachmentsList);
  private readonly customFields = viewChild(OpportunityCustomFields);

  protected name = '';
  protected service = '';
  protected value: number | null = null;
  protected stage = this.stageOptions[0];
  protected description = '';
  protected contactName = '';
  protected ownerName = '';
  private expectedCloseDate: Date | null = null;

  protected readonly closeIcon = Cancel01Icon;

  protected get expectedCloseDateValue(): string {
    return this.expectedCloseDate ? this.expectedCloseDate.toISOString().slice(0, 10) : '';
  }

  protected set expectedCloseDateValue(value: string) {
    this.expectedCloseDate = value ? new Date(value) : null;
  }

  protected get canSave(): boolean {
    return this.name.trim().length > 0 && this.value != null && !!this.contactName && !!this.ownerName;
  }

  openForAdd(): void {
    this.mode.set('add');
    this.editingId = null;
    this.name = '';
    this.service = '';
    this.value = null;
    this.stage = this.stageOptions[0];
    this.expectedCloseDate = null;
    this.description = '';
    this.contactName = '';
    this.ownerName = this.ownerOptions()[0]?.name ?? '';
    this.preserved = {
      createdLabel: 'Just now',
      opportunityAgeDays: 0,
      stageAgeDays: 0,
      comments: [],
    };
    this.attachmentsValue.set([]);
    this.customFieldsValue.set([]);
    this.visible.set(true);
  }

  openForEdit(opportunity: Opportunity): void {
    this.mode.set('edit');
    this.editingId = opportunity.id;
    this.name = opportunity.name;
    this.service = opportunity.service;
    this.value = opportunity.value;
    this.stage = opportunity.stage;
    this.expectedCloseDate = opportunity.expectedCloseDate;
    this.description = opportunity.description;
    this.contactName = opportunity.contacts[0]?.name ?? '';
    this.ownerName = opportunity.owner.name;
    this.preserved = {
      createdLabel: opportunity.createdLabel,
      opportunityAgeDays: opportunity.opportunityAgeDays,
      stageAgeDays: opportunity.stageAgeDays,
      comments: opportunity.comments,
    };
    this.attachmentsValue.set(opportunity.attachments);
    this.customFieldsValue.set(opportunity.customFields);
    this.visible.set(true);
  }

  protected cancel(): void {
    this.visible.set(false);
  }

  protected save(): void {
    if (!this.canSave) {
      return;
    }
    const stageMeta =
      DEFAULT_PIPELINE_STAGES.find((option) => option.label === this.stage) ??
      DEFAULT_PIPELINE_STAGES[0];
    const contact = this.contactOptions().find((option) => option.name === this.contactName);
    const owner = this.ownerOptions().find((option) => option.name === this.ownerName);
    if (!contact || !owner) {
      return;
    }

    const opportunity: Opportunity = {
      id: this.editingId ?? crypto.randomUUID(),
      name: this.name.trim(),
      service: this.service.trim(),
      value: this.value!,
      stage: this.stage,
      stageDotColor: stageMeta.dotColor,
      expectedCloseDate: this.expectedCloseDate ?? new Date(),
      description: this.description.trim(),
      contacts: [contact],
      owner,
      attachments: this.attachmentsList()?.getAttachments() ?? this.attachmentsValue(),
      customFields: this.customFields()?.getFields() ?? this.customFieldsValue(),
      ...this.preserved,
    };

    this.saved.emit({ mode: this.mode(), opportunity });
    this.visible.set(false);
  }
}
