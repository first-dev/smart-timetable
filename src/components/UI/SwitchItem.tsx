import { ComponentProps, FC, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Switch, TouchableRipple, Text } from 'react-native-paper'

type SwitchItemProps = ComponentProps<typeof Switch> & {
  label?: string
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
