import { FC, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { gestureHandlerRootHOC, TouchableNativeFeedback } from 'react-native-gesture-handler'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import { useTheme } from 'react-native-paper'
import Text from './Text'
import Icon from './Icon'

type Props = {
  style?: StyleProp<ViewStyle>
  label?: string
  value?: Date
  onChange?: (date: Date) => void
  placeholder?: string
}

const TimePicker: FC<Props> = ({ value, label, style, placeholder = 'Pick a time', onChange }) => {
  const [show, setShow] = useState(false)
  const {
    colors: { placeholder: placeholderColor },
  } = useTheme()
  const onDateChange = (_: Event, date?: Date) => {
    setShow(false)
    !!date && onChange?.(date)
  }
  const onPress = () => setShow(true)
  return (
    <>
      <TouchableNativeFeedback style={[styles.container, style]} onPress={onPress}>
        <Icon pack="MaterialIcons" icon="access-time" />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>
            {value ? (
              format(value, 'h:m a')
            ) : (
              <Text style={{ color: placeholderColor }}>{placeholder}</Text>
            )}
          </Text>
        </View>
      </TouchableNativeFeedback>
      {show && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="time"
          onChange={onDateChange}
          textColor="red"
        />
      )}
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  labelContainer: {
    width: 100,
    paddingLeft: 16,
  },
  label: {
    fontSize: 18,
  },
  valueContainer: {
    flex: 1,
  },
  value: {
    flexShrink: 1,
    fontSize: 18,
  },
})
export default gestureHandlerRootHOC(TimePicker, { flex: undefined })
