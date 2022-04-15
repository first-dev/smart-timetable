import { FC } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

type Props = {
  style?: StyleProp<ViewStyle>
}

const LoadingIndicator: FC<Props> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" animating={true} />
    </View>
  )
}
export default LoadingIndicator
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
