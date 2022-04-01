import { FC } from 'react'
// import { StoreProvider } from 'easy-peasy'
import { RecoilRoot } from 'recoil'
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import store from '@store'
import { colors } from '@constants'

const paperTheme: typeof PaperDefaultTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    text: colors.text,
    placeholder: colors.faintText,
  },
}
const navigationTheme: typeof NavigationDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: colors.primary,
    text: colors.primary,
    background: 'white',
    border: 'transparent',
  },
}
const Providers: FC = ({ children }) => {
  return (
    <>
      {/* <SafeAreaProvider> */}
      <PaperProvider
        theme={paperTheme}
        settings={{
          icon: props => {
            if (Object.keys(MaterialIcons.glyphMap).includes(props.name))
              return <MaterialIcons {...props} name={props.name as any} />
            else if (Object.keys(MaterialCommunityIcons.glyphMap).includes(props.name))
              return <MaterialCommunityIcons {...props} name={props.name as any} />
          },
        }}>
        {/* <StoreProvider store={store}> */}
        <RecoilRoot>
          <NavigationContainer theme={navigationTheme}>{children}</NavigationContainer>
        </RecoilRoot>
        {/* </StoreProvider> */}
      </PaperProvider>
      {/* </SafeAreaProvider> */}
    </>
  )
}
export default Providers
