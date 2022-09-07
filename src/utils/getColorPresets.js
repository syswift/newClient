// theme
import palette from '../theme/palette';

// ----------------------------------------------------------------------

export const colorPresets = [
  // DEFAULT
  {
    name: 'default',
    ...palette.light.primary,
  },
];

export const defaultPreset = colorPresets[0];

export default function getColorPresets(presetsKey) {
  return {
    default: defaultPreset
  }[presetsKey];
}
