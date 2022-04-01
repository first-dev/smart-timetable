import { createDrawerNavigator } from '@react-navigation/drawer'
import { colors } from '@constants'
import { Content } from '@components/Drawer'
import { useDynamicDimensions } from '@hooks'
import { TimetableScreenHeaderRight } from '@components/ScreensHeaders'
import {
  OverviewScreen,
  TimetableScreen,
  CalendarScreen,
  AgendaScreen,
  SubjectsScreen,
  SettingsScreen,
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
      initialRouteName="TimetableScreen"
      drawerContent={props => <Content {...props} />}
      screenOptions={{
        headerTintColor: colors.primary,
        headerShadowVisible: false,
        drawerType: width > transformThreshold ? 'permanent' : 'front',
        headerShown: width <= transformThreshold,
      }}>
      <Drawer.Screen name="OverviewScreen" component={OverviewScreen} />
      <Drawer.Screen
        name="TimetableScreen"
        component={TimetableScreen}
        options={{
          headerRight: TimetableScreenHeaderRight,
        }}
      />
      <Drawer.Screen name="CalendarScreen" component={CalendarScreen} />
      <Drawer.Screen name="AgendaScreen" component={AgendaScreen} />
      <Drawer.Screen name="SubjectsScreen" component={SubjectsScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
