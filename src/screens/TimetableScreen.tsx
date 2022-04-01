import { FC, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { TimetableView } from '@components'
import { compile } from '@utils/timetable'
import { useRecoilValue } from 'recoil'
import { activeTimetableState } from '@atoms/timetablesState'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Menu, Divider } from 'react-native-paper'
import { mySubjects } from '@constants/myTimetable'
import { HeaderButton } from '@components/UI'
import { MainStackParamList } from '@navigation/MainNavigator'

type Props = DrawerScreenProps<DrawerParamList & MainStackParamList, 'TimetableScreen'>

const TimetableScreen: FC<Props> = ({ navigation: { setOptions, navigate } }) => {
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false)
  const timetable = useRecoilValue(activeTimetableState)
  const staticTimetable = timetable ? compile(timetable) : undefined
  useEffect(() => {
    setOptions({
      headerTitle: staticTimetable?.id,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add new session"
            iconName={'add'}
            onPress={() => navigate('NewSessionScreen')}
          />
          <Menu
            visible={optionsMenuVisible}
            onDismiss={() => setOptionsMenuVisible(false)}
            anchor={
              <Item
                title="Options"
                iconName={'more-vert'}
                onPress={() => setOptionsMenuVisible(true)}
              />
            }>
            <Menu.Item onPress={() => console.log(`Item 1 pressed`)} title="Item 1" />
            <Menu.Item onPress={() => console.log(`Item 2 pressed`)} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => console.log(`Item 3 pressed`)} title="Item 1" />
          </Menu>
        </HeaderButtons>
      ),
    })
  }, [optionsMenuVisible, navigate, setOptions, staticTimetable?.id])
  return (
    <View style={styles.screen}>
      <TimetableView timetable={staticTimetable} subjects={mySubjects} />
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
export default TimetableScreen
