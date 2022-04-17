import { FC, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Dialog, Portal, RadioButton } from 'react-native-paper'
import Icon from './Icon'
import Picker, { PickerProps } from './Picker'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

type Props = PickerProps

const SubjectPicker: FC<Props> = ({
  style,
  placeholder = 'Pick a day',
  value,
  onChange,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const onPress = () => setVisible(true)
  const onDismiss = () => setVisible(false)
  const onValueChanged = (newValue: string) => {
    onChange?.(newValue)
    onDismiss()
  }
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
          <Dialog.Title>Pick a day</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView>
              <RadioButton.Group value={String(value) ?? ''} onValueChange={onValueChanged}>
                {days.map((day, i) => (
                  <RadioButton.Item
                    key={i}
                    label={day}
                    value={String(i)}
                    position="leading"
                    labelStyle={{ textAlign: undefined }}
                    style={{ backgroundColor: undefined, marginHorizontal: 0 }}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </>
  )
}
export default SubjectPicker
const styles = StyleSheet.create({
  dialog: {
    marginVertical: 100,
  },
})
