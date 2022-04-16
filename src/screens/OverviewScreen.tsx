import { FC } from 'react'
import { Text } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'

import { DrawerParamList } from '@navigation/DrawerNavigator'
import { Screen } from '@components/UI'

type Props = DrawerScreenProps<DrawerParamList, 'OverviewScreen'>

const OverviewScreen: FC<Props> = () => {
  return (
    <Screen>
      <Text>OverviewScreen</Text>
    </Screen>
  )
}
export default OverviewScreen
