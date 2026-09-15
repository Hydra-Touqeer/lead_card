import { Component, input, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Call02Icon from '@hugeicons/core-free-icons/Call02Icon';
import Mail01Icon from '@hugeicons/core-free-icons/Mail01Icon';
import Message01Icon from '@hugeicons/core-free-icons/Message01Icon';
import SentIcon from '@hugeicons/core-free-icons/SentIcon';
import { Popover } from 'primeng/popover';
import { AppIcon } from '../../../../shared/ui/icon/icon';
import { OpportunityContact } from '../../models/opportunity.model';

type QuickAction = 'call' | 'sms' | 'email';

@Component({
  selector: 'app-opportunity-contact-card',
  imports: [FormsModule, AppIcon, Popover],
  styleUrl: './opportunity-contact-card.scss',
  template: `
    <div class="contact-card">
      <span class="avatar">{{ contact().initials }}</span>
      <div class="contact-text">
        <span class="contact-name">{{ contact().name }}</span>
        <span class="contact-role">{{ contact().role }}</span>
      </div>

      <div class="quick-actions">
        <button #callBtn type="button" class="quick-action" (click)="open('call', callBtn)">
          <app-icon [icon]="callIcon" [size]="14" />
          Call
        </button>
        <button #smsBtn type="button" class="quick-action" (click)="open('sms', smsBtn)">
          <app-icon [icon]="smsIcon" [size]="14" />
          SMS
        </button>
        <button #emailBtn type="button" class="quick-action" (click)="open('email', emailBtn)">
          <app-icon [icon]="emailIcon" [size]="14" />
          Email
        </button>
      </div>
    </div>

    <p-popover #popover>
      @switch (activeAction()) {
        @case ('call') {
          <div class="action-panel">
            @if (!callConnected()) {
              <p class="panel-title">Call {{ contact().name }}</p>
              <p class="panel-subtitle">{{ contact().phone ?? 'No phone number on file' }}</p>
              <button
                type="button"
                class="primary"
                [disabled]="!contact().phone"
                (click)="startCall()"
              >
                <app-icon [icon]="callIcon" [size]="14" />
                Start call
              </button>
            } @else {
              <p class="panel-title">Calling {{ contact().name }}…</p>
              <p class="panel-subtitle">{{ contact().phone }}</p>
              <button type="button" (click)="endCall()">End call</button>
            }
          </div>
        }
        @case ('sms') {
          <div class="action-panel">
            <p class="panel-title">Text {{ contact().name }}</p>
            <p class="panel-subtitle">{{ contact().phone ?? 'No phone number on file' }}</p>
            <textarea [(ngModel)]="draftMessage" rows="3" placeholder="Write a message…"></textarea>
            <button
              type="button"
              class="primary"
              [disabled]="!draftMessage.trim() || sent()"
              (click)="send()"
            >
              <app-icon [icon]="sentIcon" [size]="14" />
              {{ sent() ? 'Sent' : 'Send' }}
            </button>
          </div>
        }
        @case ('email') {
          <div class="action-panel">
            <p class="panel-title">Email {{ contact().name }}</p>
            <p class="panel-subtitle">{{ contact().email ?? 'No email on file' }}</p>
            <textarea [(ngModel)]="draftMessage" rows="3" placeholder="Write a message…"></textarea>
            <button
              type="button"
              class="primary"
              [disabled]="!draftMessage.trim() || sent()"
              (click)="send()"
            >
              <app-icon [icon]="sentIcon" [size]="14" />
              {{ sent() ? 'Sent' : 'Send' }}
            </button>
          </div>
        }
      }
    </p-popover>
  `,
})
export class OpportunityContactCard {
  readonly contact = input.required<OpportunityContact>();

  protected readonly activeAction = signal<QuickAction | null>(null);
  protected readonly callConnected = signal(false);
  protected readonly sent = signal(false);
  protected draftMessage = '';

  protected readonly callIcon = Call02Icon;
  protected readonly smsIcon = Message01Icon;
  protected readonly emailIcon = Mail01Icon;
  protected readonly sentIcon = SentIcon;

  private readonly popoverRef = viewChild.required(Popover);

  protected open(action: QuickAction, anchor: HTMLElement): void {
    this.activeAction.set(action);
    this.callConnected.set(false);
    this.sent.set(false);
    this.draftMessage = '';
    this.popoverRef().show(undefined, anchor);
  }

  protected startCall(): void {
    this.callConnected.set(true);
  }

  protected endCall(): void {
    this.popoverRef().hide();
  }

  protected send(): void {
    this.sent.set(true);
    setTimeout(() => this.popoverRef().hide(), 900);
  }
}
