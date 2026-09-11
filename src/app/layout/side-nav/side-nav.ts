import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import SidebarLeftIcon from '@hugeicons/core-free-icons/SidebarLeftIcon';
import { AppIcon } from '../../shared/ui/icon/icon';
import { NAV_ITEMS } from './nav-items';

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink, RouterLinkActive, AppIcon],
  styleUrl: './side-nav.scss',
  template: `
    <div class="side-nav">
      <img class="logomark" src="https://www.figma.com/api/mcp/asset/752352aa-aa2f-40ba-be70-679467697ba3.svg" alt="Collectware" />

      <button type="button" class="collapse-toggle" aria-label="Collapse navigation">
        <app-icon [icon]="collapseIcon" [size]="21" />
      </button>

      <div class="divider"></div>

      <nav class="nav-list">
        @for (item of navItems; track item.route) {
          <a
            class="nav-item"
            [routerLink]="item.route"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: false }"
            [attr.aria-label]="item.label"
          >
            <app-icon [icon]="item.icon" [size]="20" />
          </a>
        }
      </nav>
    </div>
  `,
})
export class SideNav {
  protected readonly navItems = NAV_ITEMS;
  protected readonly collapseIcon = SidebarLeftIcon;
}
