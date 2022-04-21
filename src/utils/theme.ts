import { colors } from '@constants'
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
export const paperTheme: typeof PaperDefaultTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    text: colors.text,
    placeholder: colors.faintText,
    error: colors.error,
  },
}
export const navigationTheme: typeof NavigationDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: colors.primary,
    text: colors.primary,
    background: 'white',
    border: 'transparent',
  },
}
