import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { MainStackParamList } from '@navigation/MainNavigator'

type Props = NativeStackScreenProps<MainStackParamList, 'LoginScreen'>

const LoginScreen: FC<Props> = () => {
  return (
    <View style={styles.screen}>
      <Text>LoginScreen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
export default LoginScreen
