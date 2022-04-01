import { useState } from 'react'
import type { HeaderOptions } from '@react-navigation/elements/lib/typescript/src/types'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Menu, Divider } from 'react-native-paper'
import { HeaderButton } from '@components/UI'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AllParamsList } from '@navigation'

const TimetableScreenHeaderRight: HeaderOptions['headerRight'] = () => {
  const [moreOptionsMenuVisible, setMoreOptionsMenuVisible] = useState(false)
  const { navigate } = useNavigation<NavigationProp<AllParamsList>>()
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Add new session" iconName={'add'} onPress={() => navigate('NewSessionScreen')} />
      <Menu
        visible={moreOptionsMenuVisible}
        onDismiss={() => setMoreOptionsMenuVisible(false)}
        anchor={
          <Item
            title="More options"
            iconName={'more-vert'}
            onPress={() => setMoreOptionsMenuVisible(true)}
          />
        }>
        <Menu.Item onPress={() => console.log(`Item 1 pressed`)} title="Item 1" />
        <Menu.Item onPress={() => console.log(`Item 2 pressed`)} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => console.log(`Item 3 pressed`)} title="Item 1" />
      </Menu>
    </HeaderButtons>
  )
}

export default TimetableScreenHeaderRight
