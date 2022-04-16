import { subjectsState } from '@atoms/subjectsState'
import { activeTimetableState, timetablesState } from '@atoms/timetablesState'
import { TimetableView } from '@components'
import { HeaderButton, Screen } from '@components/UI'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { MainStackParamList } from '@navigation/MainNavigator'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { compile } from '@utils/timetable'
import { FC, useEffect, useState } from 'react'
import { Divider, Menu } from 'react-native-paper'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useRecoilValue, useResetRecoilState } from 'recoil'

type Props = DrawerScreenProps<DrawerParamList & MainStackParamList, 'TimetableScreen'>

const TimetableScreen: FC<Props> = ({ navigation: { setOptions, navigate } }) => {
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false)
  const subjects = useRecoilValue(subjectsState)
  const timetable = useRecoilValue(activeTimetableState)
  const resetState = useResetRecoilState(timetablesState)
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
            <Menu.Item onPress={resetState} title="Reset" />
            <Menu.Item onPress={() => console.log(`Item 2 pressed`)} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => console.log(`Item 3 pressed`)} title="Item 1" />
          </Menu>
        </HeaderButtons>
      ),
    })
  }, [optionsMenuVisible, navigate, setOptions, staticTimetable?.id, resetState])
  return (
    <Screen>
      <TimetableView timetable={staticTimetable} subjects={subjects} />
    </Screen>
  )
}
export default TimetableScreen
