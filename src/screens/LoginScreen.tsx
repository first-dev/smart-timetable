import { Screen } from '@components/UI'
import { MainStackParamList } from '@navigation/MainNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC } from 'react'
import { Text } from 'react-native'

type Props = NativeStackScreenProps<MainStackParamList, 'LoginScreen'>

const LoginScreen: FC<Props> = () => {
  return (
    <Screen scrollable>
      <Text>LoginScreen</Text>
    </Screen>
  )
}
export default LoginScreen
