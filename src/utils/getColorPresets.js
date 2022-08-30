// theme
import palette from '../theme/palette';

// ----------------------------------------------------------------------

export const colorPresets = [

   // BLUE
   {
    name: 'blue',
    lighter: '#D1E9FC',
    light: '#76B0F1',
    main: '#2065D1',
    dark: '#103996',
    darker: '#061B64',
    contrastText: '#fff',
  },
];

export const defaultPreset = colorPresets[0];

export default function getColorPresets(presetsKey) {
  return {
    blue: defaultPreset
  }[presetsKey];
}
