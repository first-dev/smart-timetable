import { FC } from 'react'
import { Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { MainStackParamList } from '@navigation/MainNavigator'
import { Screen } from '@components/UI'

type Props = NativeStackScreenProps<MainStackParamList, 'SetupScreen'>

const SetupScreen: FC<Props> = () => {
  return (
    <Screen>
      <Text>SetupScreen</Text>
    </Screen>
  )
}
export default SetupScreen
