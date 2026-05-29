export const styles: {
  id: string;
  hidden?: boolean;
  experimental?: boolean;
}[] = [
  // dotychczasowe
  { id: 'normal' },
  { id: 'animated' },
  { id: 'compact' },
  { id: 'rounded' },
  { id: 'rounded-compact' },
  { id: 'radar' },
  { id: 'classic' },

  // nowe layouty/efekty
 { id: 'amoled' },
  { id: 'aurora', hidden: true },
  { id: 'auroraflow', hidden: true },
  { id: 'banner' },
  { id: 'card', hidden: true },
  { id: 'circle' },
  { id: 'circuit', hidden: true },
  { id: 'glass' },
  { id: 'horizon' },
  { id: 'justelo' },
  { id: 'justelomatches' },
  { id: 'justelomatchesname' },
  { id: 'justeloname' },
  { id: 'neon', hidden: true },
  { id: 'photon', hidden: true },
  { id: 'pulsegrid', hidden: true },
  { id: 'ripple', hidden: true },
  { id: 'sidebar', hidden: true },
  { id: 'split', hidden: true },
  { id: 'stack' },
  { id: 'terminal' },

  // własny
  { id: 'custom', experimental: true, hidden: true },
];

export const colorSchemes: string[] = [
  'dark',
  'faceit',
  'ctp-latte',
  'ctp-frappe',
  'ctp-macchiato',
  'ctp-mocha',
  'custom',
];
