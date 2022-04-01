import { FC, Fragment } from 'react'
import { StyleSheet } from 'react-native'
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import { Colors, Divider, Drawer } from 'react-native-paper'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import Header from './Header'
import { colors } from '@constants'

const getIcon = (name: keyof DrawerParamList) => {
  switch (name) {
    case 'OverviewScreen':
      return 'home'
    case 'TimetableScreen':
      return 'timetable'
    case 'CalendarScreen':
      return 'calendar-today'
    case 'AgendaScreen':
      return 'view-agenda'
    case 'SubjectsScreen':
      return 'school'
    case 'SettingsScreen':
      return 'settings'
  }
}

const Content: FC<DrawerContentComponentProps> = props => {
  return (
    <DrawerContentScrollView style={styles.container}>
      <Header />
      <Divider style={styles.divider} />
      {props.state.routes.map(({ key, name }) => (
        <Fragment key={key}>
          {name === 'AgendaScreen' && <Divider style={styles.divider} />}
          <Drawer.Item
            style={styles.item}
            label={name}
            icon={getIcon(name as any)}
            onPress={() => props.navigation.navigate(name)}
            active={props.descriptors[key].navigation.isFocused()}
            theme={{
              colors: {
                text: colors.blackFont,
              },
            }}
          />
        </Fragment>
      ))}
    </DrawerContentScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRightWidth: 1,
    borderRightColor: Colors.grey200,
  },
  item: {
    paddingVertical: 4,
    // backgroundColor: 'transparent',
  },
  divider: {
    marginHorizontal: 8,
  },
})
export default Content
