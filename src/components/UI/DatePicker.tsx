import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, parseJSON } from 'date-fns'
import { FC, useState } from 'react'
import Icon from './Icon'
import Picker, { PickerProps } from './Picker'

type Props = PickerProps

const DatePicker: FC<Props> = ({
  value,
  label,
  style,
  placeholder = 'Pick a date',
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
        value={dateValue && format(dateValue, 'yyyy / MM / dd')}
        onPress={onPress}
        icon={<Icon pack="MaterialCommunityIcons" icon="calendar-range" />}
        placeholder={placeholder}
        label={label}
        style={style}
        {...rest}
      />
      {show && (
        <DateTimePicker
          value={dateValue ?? new Date()}
          mode="date"
          onChange={onDateChange}
          textColor="red"
        />
      )}
    </>
  )
}
export default DatePicker
