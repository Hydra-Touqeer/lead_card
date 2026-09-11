import { Component, signal } from '@angular/core';

const SUMMARY_GENERATION_DELAY_MS = 900;

// Mocked, client-side-only placeholder - the real summary will come from an
// (not yet built) AI endpoint that analyzes the account's activity history.
const MOCK_SUMMARY =
  'Kestrel Manufacturing has been highly responsive since the proposal was sent, with strong engagement on the ' +
  'Third Party Contingency opportunity. One email delivery failed and should be resent once the connected mailbox ' +
  'is reauthorized. Recommend confirming the account-tier split Dana asked about before the next call.';

@Component({
  selector: 'app-ask-collectware-ai',
  styleUrl: './ask-collectware-ai.scss',
  template: `
    <button type="button" class="ask-ai-trigger" [disabled]="generating()" (click)="generate()">
      <img
        class="logomark"
        src="https://www.figma.com/api/mcp/asset/752352aa-aa2f-40ba-be70-679467697ba3.svg"
        alt=""
      />
      <span class="ask-ai-text">
        <span>Ask </span><span class="brand">Collectware AI</span><span> to </span
        ><span class="emphasis">summarize or analyze this account.</span>
      </span>
    </button>

    @if (generating()) {
      <p class="ask-ai-summary generating">Generating summary…</p>
    } @else if (summary()) {
      <p class="ask-ai-summary">{{ summary() }}</p>
    }
  `,
})
export class AskCollectwareAi {
  protected readonly generating = signal(false);
  protected readonly summary = signal<string | null>(null);

  protected generate(): void {
    this.generating.set(true);
    setTimeout(() => {
      this.summary.set(MOCK_SUMMARY);
      this.generating.set(false);
    }, SUMMARY_GENERATION_DELAY_MS);
  }
}
