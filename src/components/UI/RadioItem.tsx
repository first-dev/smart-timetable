import { FC, ComponentProps } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { RadioButton, Text } from 'react-native-paper'
import { gestureHandlerRootHOC, TouchableNativeFeedback } from 'react-native-gesture-handler'

type Props = {
  style?: StyleProp<ViewStyle>
} & ComponentProps<typeof RadioButton.Item>

const RadioItem: FC<Props> = ({ style, ...rest }) => {
  return (
    <TouchableNativeFeedback style={[styles.container, style]} onPress={rest.onPress}>
      <View style={styles.innerContainer} pointerEvents="none">
        <Text style={undefined}>{rest.label}</Text>
        <RadioButton.Item
          {...rest}
          style={styles.radioItem}
          onPress={undefined}
          position="leading"
        />
      </View>
    </TouchableNativeFeedback>
  )
}
export default gestureHandlerRootHOC(RadioItem, { flex: 0 })
const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexShrink: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  radioItem: {
    padding: 0,
    margin: 0,
    backgroundColor: 'blue',
  },
})
