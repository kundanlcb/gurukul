import { Platform } from 'react-native';

export const colors = {
  primary: {
    600: '#5A53D6', // Primary action, active tab
    500: '#6A63E8', // Gradient end
    200: '#D6D3F5', // Light border
    100: '#E9E7FB', // Light backgrounds
    50: '#F5F7FF',  // Very light background
  },
  surface: {
    app: '#F3F4F6',   // App background
    card: '#FFFFFF',  // Card background
    soft: '#F7F8FB',  // Secondary blocks
    default: '#FFFFFF', // Alias for card
    background: '#F3F4F6', // Alias for app
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  premium: {
    gold: '#D4AF37',
    goldLight: '#FFF8E1',
    goldDark: '#B4922B',
    background: '#FFFFFF',
    card: '#F8F9FA',
    cardSelected: '#FFF8E1',
    border: '#E0E0E0',
    borderSelected: '#D4AF37',
    textTitle: '#B4922B',
    badge: '#D4AF37',
    badgeText: '#FFFFFF',
  },
  accent: {
    teal: '#3DB9BE',
    mint: '#E3F6F4',
    amber: '#F2B457',
    orange: '#F29C4C',
    purple: '#9C27B0',
    pink: '#E91E63',
  },
  status: {
    success: '#20A56F',
    danger: '#EC6B57',
    warning: '#F2B457',
    info: '#3DB9BE',
  },
  text: {
    primary: '#1F2533',
    secondary: '#6E7583',
    inverse: '#FFFFFF',
    tertiary: '#9CA3AF', // Lighter grey
    disabled: '#9CA3AF', // Alias for tertiary
  },
  border: {
    soft: '#E4E7EC',
    light: '#E4E7EC', // Alias for soft
    default: '#E0E0E0',
    focused: '#5A53D6', // Match primary.600
  },
} as const;

export const spacing = {
  none: 0,
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
  '3xl': 48,
  '4xl': 64,
} as const;

export const radius = {
  none: 0,
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

export const typography = {
  weight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  } as const,
  size: {
    xs: 12,
    s: 14,
    base: 16, // Alias for m
    m: 16,
    l: 18,
    xl: 24,
    xxl: 32,
    '3xl': 36,
    '4xl': 48,
  } as const,
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  fontFamily: {
    primary: {
      regular: 'Inter-Regular', 
      medium: 'Inter-Medium',
      bold: 'Inter-Bold',
    },
    // Adding fallbacks just in case
    regular: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    medium: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
    bold: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
  },
};

export const theme = {
  colors,
  spacing,
  radius,
  shadows,
  typography,
};
