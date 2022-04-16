import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, parseJSON } from 'date-fns'
import { FC, useState } from 'react'
import Icon from './Icon'
import Picker, { PickerProps } from './Picker'

type Props = PickerProps

const TimePicker: FC<Props> = ({
  value,
  label,
  style,
  placeholder = 'Pick a time',
  onChange,
  ...rest
}) => {
  const [show, setShow] = useState(false)
  const onDateChange = (_: Event, date?: Date) => {
    setShow(false)
    !!date && onChange?.(date.toISOString())
  }
  const onPress = () => setShow(true)
  const dateValue = value != undefined ? parseJSON(value) : undefined
  return (
    <>
      <Picker
        value={dateValue && format(dateValue, 'h:m a')}
        onPress={onPress}
        icon={<Icon pack="MaterialIcons" icon="access-time" />}
        placeholder={placeholder}
        label={label}
        style={style}
        {...rest}
      />
      {show && (
        <DateTimePicker
          value={dateValue ?? new Date()}
          mode="time"
          onChange={onDateChange}
          textColor="red"
        />
      )}
    </>
  )
}
export default TimePicker
