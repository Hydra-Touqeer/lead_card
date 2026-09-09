import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigation } from '../header-navigation/header-navigation';
import { SideNav } from '../side-nav/side-nav';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SideNav, HeaderNavigation],
  styleUrl: './app-shell.scss',
  template: `
    <div class="app-shell">
      <app-side-nav class="app-shell__nav" />
      <div class="app-shell__main">
        <app-header-navigation />
        <div class="app-shell__content">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
})
export class AppShell {}
