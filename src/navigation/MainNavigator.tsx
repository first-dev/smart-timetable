import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NewSessionScreen, NewSubjectScreen } from '@screens'
import DrawerNavigator from './DrawerNavigator'

export type MainStackParamList = {
  DrawerNavigator: undefined
  LoginScreen: undefined
  SetupScreen: undefined
  NewSessionScreen: undefined
  NewSubjectScreen: undefined
}

const Stack = createNativeStackNavigator<MainStackParamList>()

const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName="DrawerNavigator"
    screenOptions={{
      headerShadowVisible: false,
    }}>
    <Stack.Screen
      name="DrawerNavigator"
      component={DrawerNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NewSessionScreen"
      component={NewSessionScreen}
      options={{ headerTitle: '' }}
    />
    <Stack.Screen
      name="NewSubjectScreen"
      component={NewSubjectScreen}
      options={{ headerTitle: '' }}
    />
  </Stack.Navigator>
)

export default MainNavigator
