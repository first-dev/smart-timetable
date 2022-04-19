import { colors } from '@constants'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useFlipper } from '@react-navigation/devtools'
import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { FC, Suspense } from 'react'
//@ts-ignore
import { connectToDevTools } from 'react-devtools-core'
import { LogBox } from 'react-native'
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { RecoilRoot } from 'recoil'
//@ts-ignore
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
if (__DEV__) {
  connectToDevTools({
    host: 'localhost',
    port: 8097,
  })
  //@ts-ignore
  import('react-native-console-time-polyfill')
}
LogBox.ignoreLogs(['timer'])

const paperTheme: typeof PaperDefaultTheme = {
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
  const navigationRef = useNavigationContainerRef()
  useFlipper(navigationRef)

  return (
    <>
      <FlipperAsyncStorage />
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
        <Suspense fallback={<AppLoading />}>
          <RecoilRoot>
            <NavigationContainer theme={navigationTheme} ref={navigationRef}>
              {children}
            </NavigationContainer>
          </RecoilRoot>
        </Suspense>
      </PaperProvider>
    </>
  )
}
export default Providers
