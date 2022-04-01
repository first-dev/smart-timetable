import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { MainStackParamList } from '@navigation/MainNavigator'

type Props = NativeStackScreenProps<MainStackParamList, 'SetupScreen'>

const SetupScreen: FC<Props> = () => {
  return (
    <View style={styles.screen}>
      <Text>SetupScreen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
export default SetupScreen
