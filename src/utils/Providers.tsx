import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useFlipper } from '@react-navigation/devtools'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { navigationTheme, paperTheme } from '@utils/theme'
import AppLoading from 'expo-app-loading'
import { FC, Suspense } from 'react'
//@ts-ignore
import { connectToDevTools } from 'react-devtools-core'
import { LogBox } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { RecoilRoot } from 'recoil'
//@ts-ignore
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_100Thin,
} from '@expo-google-fonts/poppins'

if (__DEV__) {
  connectToDevTools({
    host: 'localhost',
    port: 8097,
  })
  //@ts-ignore
  import('react-native-console-time-polyfill')
}
LogBox.ignoreLogs(['timer'])

const Providers: FC = ({ children }) => {
  const navigationRef = useNavigationContainerRef()
  useFlipper(navigationRef)
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_100Thin,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
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
