import * as React from 'react'
import { FC, useState } from 'react'
import {
  View,
  StyleSheet,
  Switch as NativeSwitch,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { Paragraph, Switch, TouchableRipple, Text } from 'react-native-paper'

type SwitchItemProps = NativeSwitch['props'] & {
  /**
   * Disable toggling the switch.
   */
  disabled?: boolean
  /**
   * Value of the switch, true means 'on', false means 'off'.
   */
  value?: boolean
  /**
   * Custom color for switch.
   */
  color?: string
  /**
   * Callback called with the new value when it changes.
   */
  onValueChange?: Function
  style?: StyleProp<ViewStyle>
  /**
   * @optional
   */
  theme?: ReactNativePaper.Theme
  /**
   * Switch label
   */
  label?: string
  /**
   *
   */
  containerStyle?: StyleProp<ViewStyle>
}

const SwitchItem: FC<SwitchItemProps> = props => {
  const [value, setValue] = useState(props.value)
  return (
    <TouchableRipple onPress={() => setValue(!value)}>
      <View style={[styles.row, props.containerStyle]}>
        <Text style={styles.label}>{props.label}</Text>
        <View pointerEvents="none">
          <Switch {...props} value={value} />
        </View>
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    flexShrink: 1,
    flexGrow: 1,
  },
})

export default SwitchItem
