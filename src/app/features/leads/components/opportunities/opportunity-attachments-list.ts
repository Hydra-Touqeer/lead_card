import { Component, ElementRef, input, linkedSignal, signal, viewChild } from '@angular/core';
import Csv01Icon from '@hugeicons/core-free-icons/Csv01Icon';
import Delete02Icon from '@hugeicons/core-free-icons/Delete02Icon';
import Doc01Icon from '@hugeicons/core-free-icons/Doc01Icon';
import File02Icon from '@hugeicons/core-free-icons/File02Icon';
import MoreVerticalIcon from '@hugeicons/core-free-icons/MoreVerticalIcon';
import Pdf01Icon from '@hugeicons/core-free-icons/Pdf01Icon';
import Upload04Icon from '@hugeicons/core-free-icons/Upload04Icon';
import Xls01Icon from '@hugeicons/core-free-icons/Xls01Icon';
import { IconSvgObject } from '@hugeicons/angular';
import { Popover } from 'primeng/popover';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { OpportunityAttachment } from '../../models/opportunity.model';

type AttachmentsMode = 'view' | 'edit';

const FILE_ICONS: { pattern: RegExp; icon: IconSvgObject; color: string }[] = [
  { pattern: /\.pdf$/i, icon: Pdf01Icon, color: '#dc2626' },
  { pattern: /\.(xlsx?|csv)$/i, icon: Xls01Icon, color: '#16a34a' },
  { pattern: /\.(docx?)$/i, icon: Doc01Icon, color: '#0166f8' },
];

@Component({
  selector: 'app-opportunity-attachments-list',
  imports: [AppIcon, Popover],
  styleUrl: './opportunity-attachments-list.scss',
  template: `
    <p class="section-title">Shared Attachments</p>

    @if (attachments().length > 0) {
      <div class="attachment-list">
        @for (attachment of attachments(); track attachment.id) {
          @if (mode() === 'view') {
            <button type="button" class="attachment-row" (click)="download(attachment)">
              <app-icon
                [icon]="iconFor(attachment.name).icon"
                [size]="20"
                [style.color]="iconFor(attachment.name).color"
              />
              <div class="attachment-text">
                <span class="attachment-name">{{ attachment.name }}</span>
                <span class="attachment-meta">
                  {{ attachment.sizeLabel }}
                  @if (attachment.sentLabel) {
                    · {{ attachment.sentLabel }}
                  }
                </span>
              </div>
            </button>
          } @else {
            <div class="attachment-row">
              <app-icon
                [icon]="iconFor(attachment.name).icon"
                [size]="20"
                [style.color]="iconFor(attachment.name).color"
              />
              <div class="attachment-text">
                <span class="attachment-name">{{ attachment.name }}</span>
                <span class="attachment-meta">
                  {{ attachment.sizeLabel }}
                  @if (attachment.sentLabel) {
                    · {{ attachment.sentLabel }}
                  }
                </span>
              </div>
              <button
                #kebabBtn
                type="button"
                class="kebab-trigger"
                aria-label="Attachment actions"
                (click)="openMenu(attachment, kebabBtn)"
              >
                <app-icon [icon]="moreIcon" [size]="16" />
              </button>
            </div>
          }
        }
      </div>
    } @else {
      <p class="empty-state">No attachments yet.</p>
    }

    @if (mode() === 'edit') {
      <label class="upload-dropzone" (dragover)="$event.preventDefault()" (drop)="onDrop($event)">
        <input type="file" accept=".csv,.xls,.xlsx,.pdf,.doc,.docx" (change)="onFileSelected($event)" hidden />
        <app-icon [icon]="uploadIcon" [size]="20" />
        <span><strong>Click to upload</strong> or drag and drop</span>
        <span class="hint">CSV or XLS (max. 1mb)</span>
      </label>
    }

    <p-popover #menu>
      <div class="menu-panel">
        @if (activeAttachment(); as attachment) {
          <button type="button" class="menu-item" (click)="download(attachment); menu.hide()">
            Download
          </button>
          <button
            type="button"
            class="menu-item destructive"
            (click)="removeAttachment(attachment.id); menu.hide()"
          >
            Delete
          </button>
        }
      </div>
    </p-popover>
  `,
})
export class OpportunityAttachmentsList {
  readonly initialAttachments = input<OpportunityAttachment[]>([], { alias: 'attachments' });
  readonly mode = input<AttachmentsMode>('view');

  protected readonly attachments = linkedSignal(() => this.initialAttachments());
  protected readonly activeAttachment = signal<OpportunityAttachment | null>(null);

  protected readonly moreIcon = MoreVerticalIcon;
  protected readonly uploadIcon = Upload04Icon;

  private readonly menuRef = viewChild.required(Popover);

  getAttachments(): OpportunityAttachment[] {
    return this.attachments();
  }

  protected iconFor(name: string): { icon: IconSvgObject; color: string } {
    const match = FILE_ICONS.find((entry) => entry.pattern.test(name));
    return match ?? { icon: File02Icon, color: 'var(--fg-quaternary)' };
  }

  protected openMenu(attachment: OpportunityAttachment, anchor: HTMLElement): void {
    this.activeAttachment.set(attachment);
    this.menuRef().show(undefined, anchor);
  }

  protected download(attachment: OpportunityAttachment): void {
    const blob = new Blob([`This is a placeholder for "${attachment.name}".`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = attachment.name;
    link.click();
    URL.revokeObjectURL(url);
  }

  protected removeAttachment(id: string): void {
    this.attachments.update((list) => list.filter((attachment) => attachment.id !== id));
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.addFile(file);
    }
    input.value = '';
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.addFile(file);
    }
  }

  private addFile(file: File): void {
    this.attachments.update((list) => [
      ...list,
      { id: crypto.randomUUID(), name: file.name, sizeLabel: formatFileSize(file.size), sentLabel: 'Just now' },
    ]);
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${Math.round(kb)} KB`;
  }
  return `${(kb / 1024).toFixed(1)} MB`;
}
