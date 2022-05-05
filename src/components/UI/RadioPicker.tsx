/* eslint-disable react/prop-types */
import { FC, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Dialog, Portal, RadioButton, withTheme } from 'react-native-paper'
import Picker, { PickerProps } from './Picker'

type Props = PickerProps

const RadioPicker: FC<Props> & { Item: typeof Item } = ({ onChange, children, title, ...rest }) => {
  const { value } = rest
  const [visible, setVisible] = useState(false)
  const onPress = () => setVisible(true)
  const onDismiss = () => setVisible(false)
  const onValueChanged = (newValue: string) => {
    onChange?.(newValue)
    onDismiss()
  }
  return (
    <>
      <Picker onPress={onPress} {...rest} />
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
          {title && <Dialog.Title>{title}</Dialog.Title>}
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView>
              <RadioButton.Group value={value ?? ''} onValueChange={onValueChanged}>
                {children}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </>
  )
}
const Item: typeof RadioButton.Item = ({ labelStyle, ...rest }) => {
  const { theme, disabled } = rest
  return (
    <RadioButton.Item
      labelStyle={[
        {
          color: disabled ? theme?.colors?.disabled : theme?.colors?.text,
        },
        labelStyle,
      ]}
      {...rest}
    />
  )
}
RadioPicker.Item = withTheme(Item as any) as typeof Item
export default RadioPicker
const styles = StyleSheet.create({
  dialog: {
    marginVertical: 100,
  },
})
