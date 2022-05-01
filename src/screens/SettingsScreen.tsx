import { Screen } from '@components/UI'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { FC } from 'react'
import { Text } from 'react-native-paper'

type Props = DrawerScreenProps<DrawerParamList, 'SettingsScreen'>

const SettingsScreen: FC<Props> = () => {
  return (
    <Screen scrollable>
      <Text>SettingsScreen</Text>
    </Screen>
  )
}
export default SettingsScreen
