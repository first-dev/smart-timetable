import { FC } from 'react'
import { Text } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { Screen } from '@components/UI'

type Props = DrawerScreenProps<DrawerParamList, 'AgendaScreen'>

const AgendaScreen: FC<Props> = () => {
  return (
    <Screen>
      <Text>AgendaScreen</Text>
    </Screen>
  )
}
export default AgendaScreen
