import { FC } from 'react'
import { Text } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'

import { DrawerParamList } from '@navigation/DrawerNavigator'
import { Screen } from '@components/UI'

type Props = DrawerScreenProps<DrawerParamList, 'SettingsScreen'>

const SettingsScreen: FC<Props> = () => {
  return (
    <Screen>
      <Text>SettingsScreen</Text>
    </Screen>
  )
}
export default SettingsScreen
