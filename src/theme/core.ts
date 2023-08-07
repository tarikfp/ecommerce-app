import { PALETTE } from './palette';
import { useTheme } from './useTheme';

const spacing = {
  xs: 4,
  s: 8,
  sm: 12,
  m: 16,
  l: 24,
  xl: 40,
};

const colors = {
  background: PALETTE.neutral100,
  primary: PALETTE.primaryNormal,
  paper: PALETTE.white,
  bodyText: PALETTE.neutral900,
  bodyTextLight: PALETTE.neutral400,
  bodyTextDisabled: PALETTE.neutral300,
  textDanger: PALETTE.redNormal,
  border: PALETTE.neutral200,
  tabbarIconDisabled: PALETTE.neutral300,
  tabbarIconActive: PALETTE.primaryNormal,
};

export const theme = {
  colors,
  spacing,
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    border: PALETTE.neutral700,
    background: PALETTE.neutral900,
    bodyText: PALETTE.white,
    bodyTextLight: PALETTE.neutral400,
    bodyTextDisabled: PALETTE.neutral500,
    paper: PALETTE.neutral800,
    textDanger: PALETTE.redNormal,
  },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
