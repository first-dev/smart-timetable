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
      initialRouteName="SubjectsScreen"
      drawerContent={props => <Content {...props} />}
      useLegacyImplementation
      screenOptions={{
        headerTintColor: colors.primary,
        headerShadowVisible: false,
        drawerType: width > transformThreshold ? 'permanent' : 'front',
        // headerShown: width <= transformThreshold,
        lazy: false,
      }}>
      <Drawer.Screen name="OverviewScreen" component={OverviewScreen} />
      <Drawer.Screen name="TimetableScreen" component={TimetableScreen} />
      <Drawer.Screen name="CalendarScreen" component={CalendarScreen} />
      <Drawer.Screen name="AgendaScreen" component={AgendaScreen} />
      <Drawer.Screen name="SubjectsScreen" component={SubjectsScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
