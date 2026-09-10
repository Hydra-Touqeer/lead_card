import { ActivityOutcomeOption, ActivityPerson, LinkedOpportunity } from '../../models/activity.model';

// Mocked reference data. Outcome options will eventually come from Settings
// (system-defined + org-custom outcomes); opportunities and the current user
// will come from their respective APIs.

export const CURRENT_USER: ActivityPerson = {
  name: 'Muhammad Touqeer',
  avatarUrl: 'https://www.figma.com/api/mcp/asset/b047646d-1e62-4573-be55-78a784583447.png',
};

export const MOCK_OUTCOME_OPTIONS: ActivityOutcomeOption[] = [
  { label: 'Connected - Interested' },
  { label: 'Connected - Not interested' },
  { label: 'Voicemail' },
  { label: 'No answer' },
  { label: 'Bad / Wrong number' },
  { label: 'Follow-up scheduled' },
];

export const MOCK_OPPORTUNITY_OPTIONS: LinkedOpportunity[] = [
  { id: 'opp-1', name: 'Third Party Contingency' },
  { id: 'opp-2', name: 'First Party Fit' },
];
