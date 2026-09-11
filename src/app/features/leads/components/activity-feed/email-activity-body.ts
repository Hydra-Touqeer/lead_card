import { Component, input, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArrowDown01Icon, Forward01Icon, PencilEdit02Icon, RefreshIcon, ReplyIcon } from '@hugeicons/core-free-icons';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { EmailMessage } from '../../models/activity.model';
import { CURRENT_USER } from './activity-options.mock';

type ComposeMode = 'reply' | 'forward' | null;

const PREVIEW_LENGTH = 70;

@Component({
  selector: 'app-email-activity-body',
  imports: [FormsModule, AppIcon],
  styleUrl: './email-activity-body.scss',
  template: `
    <div class="email-body">
      @for (message of messages(); track message.id) {
        @if (expandedId() === message.id) {
          <div class="message expanded">
            <div class="message-header">
              <button
                type="button"
                class="collapse-toggle"
                aria-label="Collapse message"
                (click)="toggleExpand(message.id)"
              >
                <app-icon [icon]="chevronIcon" [size]="12" />
              </button>

              <div class="header-lines">
                <div class="header-line">
                  <span class="header-label">From:</span>
                  <span class="header-value">{{ message.from.name }}</span>
                </div>
                <div class="header-line">
                  <span class="header-label">To:</span>
                  <span class="header-value">{{ message.to }}</span>
                </div>
              </div>

              <div class="header-meta">
                @if (message.error) {
                  <span class="error-badge">Error</span>
                }
                <span class="timestamp">{{ message.timestamp }}</span>
              </div>
            </div>

            @if (message.error && editingId() !== message.id) {
              <div class="error-banner">
                <p>{{ message.error }}</p>
                <div class="error-actions">
                  <button type="button" (click)="retry(message)" [disabled]="retryingId() === message.id">
                    <app-icon [icon]="retryIcon" [size]="14" />
                    {{ retryingId() === message.id ? 'Retrying…' : 'Retry Sending' }}
                  </button>
                  <button type="button" (click)="startEdit(message)">
                    <app-icon [icon]="editIcon" [size]="14" />
                    Edit
                  </button>
                </div>
              </div>
            }

            @if (editingId() === message.id) {
              <div class="edit-box">
                <textarea [(ngModel)]="editDraft" rows="4"></textarea>
                <div class="box-actions">
                  <button type="button" class="primary" (click)="saveEdit(message)">Save</button>
                  <button type="button" (click)="cancelEdit()">Cancel</button>
                </div>
              </div>
            } @else {
              <p class="message-body">{{ message.body }}</p>
            }

            <div class="message-actions">
              <button type="button" (click)="startReply(message)">
                <app-icon [icon]="replyIcon" [size]="14" />
                Reply
              </button>
              <button type="button" (click)="startForward()">
                <app-icon [icon]="forwardIcon" [size]="14" />
                Forward
              </button>
            </div>
          </div>
        } @else {
          <button type="button" class="message-row" (click)="toggleExpand(message.id)">
            <app-icon [icon]="chevronIcon" [size]="12" />
            <span class="sender">{{ message.from.name }}</span>
            <span class="preview">{{ preview(message.body) }}</span>
            @if (message.error) {
              <span class="error-badge">Error</span>
            }
            <span class="timestamp">{{ message.timestamp }}</span>
          </button>
        }
      }

      @if (composeMode(); as mode) {
        <div class="compose-box">
          <div class="compose-header">
            <span class="compose-label">{{ mode === 'reply' ? 'Reply' : 'Forward' }}</span>
            @if (mode === 'forward') {
              <input type="text" placeholder="Recipient email" [(ngModel)]="composeTo" />
            } @else {
              <span class="compose-to">To: {{ composeTo }}</span>
            }
          </div>
          <textarea [(ngModel)]="composeDraft" rows="4" placeholder="Write your message…"></textarea>
          <div class="box-actions">
            <button type="button" class="primary" (click)="sendCompose()">Send</button>
            <button type="button" (click)="cancelCompose()">Cancel</button>
          </div>
        </div>
      }
    </div>
  `,
})
export class EmailActivityBody {
  readonly initialMessages = input.required<EmailMessage[]>({ alias: 'messages' });

  protected readonly messages = linkedSignal(() => this.initialMessages());
  // Derived from the input (not the local `messages` copy) so that retrying/
  // editing a message - which mutates `messages` in place - doesn't reset
  // which message is expanded.
  protected readonly expandedId = linkedSignal<string | null>(() => this.initialMessages().at(-1)?.id ?? null);
  protected readonly retryingId = signal<string | null>(null);
  protected readonly editingId = signal<string | null>(null);
  protected editDraft = '';
  protected readonly composeMode = signal<ComposeMode>(null);
  protected composeTo = '';
  protected composeDraft = '';

  protected readonly chevronIcon = ArrowDown01Icon;
  protected readonly replyIcon = ReplyIcon;
  protected readonly forwardIcon = Forward01Icon;
  protected readonly retryIcon = RefreshIcon;
  protected readonly editIcon = PencilEdit02Icon;

  protected toggleExpand(id: string): void {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  protected preview(body: string): string {
    return body.length > PREVIEW_LENGTH ? body.slice(0, PREVIEW_LENGTH) + '…' : body;
  }

  protected retry(message: EmailMessage): void {
    this.retryingId.set(message.id);
    setTimeout(() => {
      this.messages.update((list) => list.map((m) => (m.id === message.id ? { ...m, error: undefined } : m)));
      this.retryingId.set(null);
    }, 1000);
  }

  protected startEdit(message: EmailMessage): void {
    this.editingId.set(message.id);
    this.editDraft = message.body;
  }

  protected cancelEdit(): void {
    this.editingId.set(null);
  }

  protected saveEdit(message: EmailMessage): void {
    const text = this.editDraft.trim();
    if (!text) {
      return;
    }
    this.messages.update((list) => list.map((m) => (m.id === message.id ? { ...m, body: text } : m)));
    this.editingId.set(null);
  }

  protected startReply(message: EmailMessage): void {
    this.composeMode.set('reply');
    this.composeTo = message.from.name;
    this.composeDraft = '';
  }

  protected startForward(): void {
    this.composeMode.set('forward');
    this.composeTo = '';
    this.composeDraft = '';
  }

  protected cancelCompose(): void {
    this.composeMode.set(null);
  }

  protected sendCompose(): void {
    const text = this.composeDraft.trim();
    if (!text || (this.composeMode() === 'forward' && !this.composeTo.trim())) {
      return;
    }
    const newMessage: EmailMessage = {
      id: crypto.randomUUID(),
      from: CURRENT_USER,
      to: this.composeTo || 'recipient',
      timestamp: 'Just now',
      body: text,
    };
    this.messages.update((list) => [...list, newMessage]);
    this.expandedId.set(newMessage.id);
    this.composeMode.set(null);
  }
}
