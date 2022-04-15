import { FC, Suspense, useState } from 'react'
import { RecoilRoot } from 'recoil'
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@constants'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import { initializeTimetablesState } from '@atoms/timetablesState'
import { initializeSubjectsState } from '@atoms/subjectsState'
import * as SplashScreen from 'expo-splash-screen'

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
SplashScreen.preventAutoHideAsync()
const Providers: FC = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  return (
    <>
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
        <Suspense fallback={<LoadingIndicator />}>
          <RecoilRoot
            initializeState={async mutableSnapshot => {
              await Promise.all([
                initializeTimetablesState(mutableSnapshot),
                initializeSubjectsState(mutableSnapshot),
              ])
              setIsInitialized(true)
              SplashScreen.hideAsync()
            }}>
            {isInitialized && (
              <NavigationContainer theme={navigationTheme}>{children}</NavigationContainer>
            )}
          </RecoilRoot>
        </Suspense>
      </PaperProvider>
    </>
  )
}
export default Providers
