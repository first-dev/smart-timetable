import { Screen } from '@components/UI'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { FC } from 'react'
import { Text } from 'react-native'

type Props = DrawerScreenProps<DrawerParamList, 'OverviewScreen'>

const OverviewScreen: FC<Props> = () => {
  return (
    <Screen scrollable>
      <Text>OverviewScreen</Text>
    </Screen>
  )
}
export default OverviewScreen
