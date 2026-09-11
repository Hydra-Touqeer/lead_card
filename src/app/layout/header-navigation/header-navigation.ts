import { Component, inject } from '@angular/core';
import ArrowDown01Icon from '@hugeicons/core-free-icons/ArrowDown01Icon';
import MoonIcon from '@hugeicons/core-free-icons/MoonIcon';
import Notification01Icon from '@hugeicons/core-free-icons/Notification01Icon';
import Search01Icon from '@hugeicons/core-free-icons/Search01Icon';
import Sun01Icon from '@hugeicons/core-free-icons/Sun01Icon';
import { Avatar } from 'primeng/avatar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { OverlayBadge } from 'primeng/overlaybadge';
import { ThemeService } from '../../core/theme/theme.service';
import { AppIcon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-header-navigation',
  imports: [AppIcon, Avatar, IconField, InputIcon, InputText, OverlayBadge],
  styleUrl: './header-navigation.scss',
  template: `
    <div class="header-navigation">
      <div class="header-left">
        <ng-content />
      </div>

      <div class="header-right">
        <p-iconfield class="search">
          <p-inputicon>
            <app-icon [icon]="searchIcon" [size]="14" />
          </p-inputicon>
          <input type="text" pInputText placeholder="Search anything" />
        </p-iconfield>

        <button type="button" class="icon-button" aria-label="Notifications">
          <p-overlay-badge [value]="notificationCount" severity="danger">
            <app-icon [icon]="notificationIcon" [size]="18" />
          </p-overlay-badge>
        </button>

        <!-- Temporary: move this into the settings screen once it exists, then remove from here. -->
        <button
          type="button"
          class="icon-button"
          [attr.aria-label]="themeService.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          (click)="themeService.toggle()"
        >
          <app-icon [icon]="themeService.theme() === 'dark' ? sunIcon : moonIcon" [size]="18" />
        </button>

        <div class="user">
          <p-avatar image="https://www.figma.com/api/mcp/asset/b047646d-1e62-4573-be55-78a784583447.png" shape="circle" size="large" />
          <div class="user-text">
            <span class="user-name">Muhammad Touqeer</span>
            <span class="user-role">Collector</span>
          </div>
          <app-icon [icon]="chevronIcon" [size]="15" />
        </div>
      </div>
    </div>
  `,
})
export class HeaderNavigation {
  protected readonly themeService = inject(ThemeService);

  protected readonly searchIcon = Search01Icon;
  protected readonly notificationIcon = Notification01Icon;
  protected readonly chevronIcon = ArrowDown01Icon;
  protected readonly sunIcon = Sun01Icon;
  protected readonly moonIcon = MoonIcon;
  protected readonly notificationCount = 12;
}
