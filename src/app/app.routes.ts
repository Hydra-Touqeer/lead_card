import { Routes } from '@angular/router';
import { AppShell } from './layout/app-shell/app-shell';
import { PlaceholderPage } from './shared/ui/placeholder-page/placeholder-page';

export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      { path: '', redirectTo: 'leads/demo', pathMatch: 'full' },
      { path: 'dashboard', component: PlaceholderPage, data: { title: 'Dashboard' } },
      { path: 'leads', component: PlaceholderPage, data: { title: 'Leads' } },
      {
        path: 'leads/:leadId',
        loadComponent: () =>
          import('./features/leads/pages/lead-detail/lead-detail').then((m) => m.LeadDetail),
      },
      { path: 'debtors', component: PlaceholderPage, data: { title: 'Debtors' } },
      { path: 'communication', component: PlaceholderPage, data: { title: 'Communication' } },
      { path: 'workflow', component: PlaceholderPage, data: { title: 'Workflow' } },
      { path: 'reports', component: PlaceholderPage, data: { title: 'Reports' } },
      { path: 'tickets', component: PlaceholderPage, data: { title: 'Tickets' } },
      { path: 'chatbot', component: PlaceholderPage, data: { title: 'Chatbot' } },
    ],
  },
];
