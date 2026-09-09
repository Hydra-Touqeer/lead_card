import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * PrimeNG Aura preset with our brand color ("Horizon primary" in Figma) swapped
 * in for the default primary ramp. Everything else falls through to Aura's
 * stock formulas (e.g. dark-mode primary shades derive automatically from
 * this scale, same as upstream Aura).
 */
export const LeadCardPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#E6F0FE',
      100: '#B0D0FD',
      200: '#8AB9FC',
      300: '#5598FA',
      400: '#3485F9',
      500: '#0166F8',
      600: '#015DE2',
      700: '#0148B0',
      800: '#013888',
      900: '#002B68',
      950: '#020C2C',
    },
  },
  components: {
    // The design system sizes large buttons' text at 1.125rem, larger than
    // Aura's stock 1rem default for form.field.lg.fontSize.
    button: {
      root: {
        lg: {
          fontSize: '1.125rem',
        },
      },
    },
  },
});
