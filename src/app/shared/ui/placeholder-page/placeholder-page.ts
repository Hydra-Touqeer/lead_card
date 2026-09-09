import { Component, input } from '@angular/core';

@Component({
  selector: 'app-placeholder-page',
  styleUrl: './placeholder-page.scss',
  template: `
    <div class="placeholder-page">
      <h1>{{ title() }}</h1>
      <p>This section hasn't been designed yet.</p>
    </div>
  `,
})
export class PlaceholderPage {
  readonly title = input.required<string>();
}
