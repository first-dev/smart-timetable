import { ComponentProps, FC } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { gestureHandlerRootHOC, TouchableNativeFeedback } from 'react-native-gesture-handler'
import { RadioButton, Text } from 'react-native-paper'

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
