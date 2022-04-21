import { colors } from '@constants'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import { FC, Fragment } from 'react'
import { StyleSheet } from 'react-native'
import { Colors, Divider, Drawer } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'
import Header from './Header'

const icons: Record<keyof DrawerParamList, IconSource> = {
  OverviewScreen: 'home',
  TimetableScreen: 'timetable',
  CalendarScreen: 'calendar-today',
  AgendaScreen: 'view-agenda',
  SubjectsScreen: 'school',
  SettingsScreen: 'settings',
}

const Content: FC<DrawerContentComponentProps> = ({ navigation, descriptors, state }) => {
  return (
    <DrawerContentScrollView style={styles.container}>
      <Header />
      <Divider style={styles.divider} />
      {state.routes.map(({ key, name }) => (
        <Fragment key={key}>
          {name === 'AgendaScreen' && <Divider style={styles.divider} />}
          <Drawer.Item
            style={styles.item}
            label={descriptors[key].options.title ?? name}
            icon={icons[name as never]}
            onPress={() => navigation.navigate(name)}
            active={descriptors[key].navigation.isFocused()}
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
