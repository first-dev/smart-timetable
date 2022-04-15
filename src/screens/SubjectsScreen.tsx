import { FC, useState, useEffect } from 'react'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { HeaderButton } from '@components/UI'
import { Menu, Divider } from 'react-native-paper'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { MainStackParamList } from '@navigation/MainNavigator'
import { SubjectsView } from '@components'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { subjectsState } from '@atoms/subjectsState'
import Screen from './Screen'

type Props = DrawerScreenProps<DrawerParamList & MainStackParamList, 'SubjectsScreen'>

const SubjectsScreen: FC<Props> = ({ navigation: { setOptions, navigate } }) => {
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false)
  const subjects = useRecoilValue(subjectsState)
  const resetState = useResetRecoilState(subjectsState)
  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add new session"
            iconName={'add'}
            onPress={() => navigate('NewSubjectScreen')}
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
            <Menu.Item onPress={() => console.log(`Item 3 pressed`)} title="Item 3" />
          </Menu>
        </HeaderButtons>
      ),
    })
  }, [navigate, optionsMenuVisible, resetState, setOptions])
  return (
    <Screen>
      <SubjectsView subjects={subjects} />
    </Screen>
  )
}
export default SubjectsScreen
