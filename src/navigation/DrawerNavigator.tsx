import { Content } from '@components/Drawer'
import { colors } from '@constants'
import { useDynamicDimensions } from '@hooks'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  AgendaScreen,
  CalendarScreen,
  OverviewScreen,
  SettingsScreen,
  SubjectsScreen,
  TimetableScreen,
} from '@screens'
import { paperTheme } from '@utils/theme'

export type DrawerParamList = {
  OverviewScreen: undefined
  TimetableScreen: undefined
  CalendarScreen: undefined
  AgendaScreen: undefined
  SubjectsScreen: undefined
  SettingsScreen: undefined
}

const Drawer = createDrawerNavigator<DrawerParamList>()

const DrawerNavigator = () => {
  const { width } = useDynamicDimensions('window')
  const transformThreshold = 800

  return (
    <Drawer.Navigator
      initialRouteName="TimetableScreen"
      drawerContent={props => <Content {...props} />}
      useLegacyImplementation
      screenOptions={{
        headerTintColor: colors.primary,
        headerShadowVisible: false,
        drawerType: width > transformThreshold ? 'permanent' : undefined,
        // headerShown: width <= transformThreshold,
        lazy: false,
        headerTitleStyle: {
          ...paperTheme.fonts.medium,
        },
      }}>
      <Drawer.Screen
        name="OverviewScreen"
        component={OverviewScreen}
        options={{ title: 'Overview' }}
      />
      <Drawer.Screen
        name="TimetableScreen"
        component={TimetableScreen}
        options={{ title: 'Timetable' }}
      />
      <Drawer.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ title: 'Calendar' }}
      />
      <Drawer.Screen name="AgendaScreen" component={AgendaScreen} options={{ title: 'Agenda' }} />
      <Drawer.Screen
        name="SubjectsScreen"
        component={SubjectsScreen}
        options={{ title: 'Subjects' }}
      />
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
