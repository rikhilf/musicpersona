import { Appearance } from 'react-native';

const palette = {
  primary: '#20B2AA', // teal
  accent: '#FF6F61', // coral
  grayLight: '#F5F5F5',
  grayDark: '#222222',
  textLight: '#222222',
  textDark: '#F5F5F5',
};

export const getTheme = () => {
  const colorScheme = Appearance.getColorScheme();
  return {
    background: colorScheme === 'dark' ? palette.grayDark : palette.grayLight,
    text: colorScheme === 'dark' ? palette.textDark : palette.textLight,
    primary: palette.primary,
    accent: palette.accent,
    card: colorScheme === 'dark' ? '#333' : '#fff',
  };
}; 