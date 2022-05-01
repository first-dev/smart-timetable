import { Session } from '@models/Timetable'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ManageTimetablesScreen, NewSessionScreen, NewSubjectScreen } from '@screens'
import SubjectDetailsScreen from '@screens/SubjectDetailsScreen'
import { paperTheme } from '@utils/theme'
import DrawerNavigator from './DrawerNavigator'

export type MainStackParamList = {
  DrawerNavigator: undefined
  LoginScreen: undefined
  SetupScreen: undefined
  NewSessionScreen: {
    action: 'edit' | 'new'
    sessionId?: Session<'dynamic'>['id']
  }
  NewSubjectScreen: {
    action: 'edit' | 'new'
    subjectId?: string
  }
  SubjectDetailsScreen: { subjectId: string }
  ManageTimetablesScreen: undefined
}

const Stack = createNativeStackNavigator<MainStackParamList>()

const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName="DrawerNavigator"
    screenOptions={{
      headerShadowVisible: false,
      headerTitleStyle: {
        ...paperTheme.fonts.medium,
      },
    }}>
    <Stack.Screen
      name="DrawerNavigator"
      component={DrawerNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NewSessionScreen"
      component={NewSessionScreen}
      options={{ headerTitle: 'New session' }}
    />
    <Stack.Screen
      name="NewSubjectScreen"
      component={NewSubjectScreen}
      options={{ title: 'New subject' }}
    />
    <Stack.Screen
      name="SubjectDetailsScreen"
      component={SubjectDetailsScreen}
      options={{ headerTitle: '' }}
    />
    <Stack.Screen
      name="ManageTimetablesScreen"
      component={ManageTimetablesScreen}
      options={{ headerTitle: 'Manage timetables' }}
    />
  </Stack.Navigator>
)

export default MainNavigator
