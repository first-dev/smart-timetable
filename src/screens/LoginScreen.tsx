import { FC } from 'react'
import { Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { MainStackParamList } from '@navigation/MainNavigator'
import Screen from './Screen'

type Props = NativeStackScreenProps<MainStackParamList, 'LoginScreen'>

const LoginScreen: FC<Props> = () => {
  return (
    <Screen>
      <Text>LoginScreen</Text>
    </Screen>
  )
}
export default LoginScreen
