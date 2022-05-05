/* eslint-disable react/prop-types */
import { FC, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Dialog, Portal, RadioButton, useTheme } from 'react-native-paper'
import Icon from './Icon'
import Picker, { PickerProps } from './Picker'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

type Props = PickerProps & {
  maxValue?: string
  minValue?: string
}

const DayPicker: FC<Props> = ({
  style,
  placeholder = 'Pick a day',
  value,
  onChange,
  maxValue = '6',
  minValue = '0',
  title,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const onPress = () => setVisible(true)
  const onDismiss = () => setVisible(false)
  const onValueChanged = (newValue: string) => {
    onChange?.(newValue)
    onDismiss()
  }
  const { colors } = useTheme()
  return (
    <>
      <Picker
        value={value != undefined ? days[parseInt(value)] : undefined}
        onPress={onPress}
        icon={<Icon pack="MaterialCommunityIcons" icon="calendar" />}
        placeholder={placeholder}
        style={style}
        {...rest}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
          <Dialog.Title>{title ?? 'Pick a day'}</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView>
              <RadioButton.Group value={String(value) ?? ''} onValueChange={onValueChanged}>
                {days.map((day, i) => {
                  const disabled = parseInt(minValue) > i || parseInt(maxValue) < i
                  return (
                    <RadioButton.Item
                      key={i}
                      label={day}
                      value={String(i)}
                      disabled={disabled}
                      labelStyle={{
                        textAlign: undefined,
                        color: disabled ? colors.disabled : colors.text,
                      }}
                      style={{ backgroundColor: undefined, marginHorizontal: 0 }}
                    />
                  )
                })}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </>
  )
}
export default DayPicker
const styles = StyleSheet.create({
  dialog: {
    marginVertical: 100,
  },
})
