import { Screen } from '@components/UI'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { FC } from 'react'
import { Text } from 'react-native-paper'

type Props = DrawerScreenProps<DrawerParamList, 'AgendaScreen'>

const AgendaScreen: FC<Props> = () => {
  return (
    <Screen scrollable>
      <Text>AgendaScreen</Text>
    </Screen>
  )
}
export default AgendaScreen
