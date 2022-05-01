import { Screen } from '@components/UI'
import { MainStackParamList } from '@navigation/MainNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC } from 'react'
import { Text } from 'react-native-paper'

type Props = NativeStackScreenProps<MainStackParamList, 'SetupScreen'>

const SetupScreen: FC<Props> = () => {
  return (
    <Screen scrollable>
      <Text>SetupScreen</Text>
    </Screen>
  )
}
export default SetupScreen
