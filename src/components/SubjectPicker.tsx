import { Icon, Picker } from '@components/UI'
import { Subject } from '@models'
import { FC, useState } from 'react'
import { Platform, ScrollView, StyleSheet, useWindowDimensions } from 'react-native'
import { Dialog, Portal, RadioButton } from 'react-native-paper'
import { PickerProps } from './UI/Picker'

type Props = PickerProps<string> & {
  subjects: Subject[]
}

const SubjectPicker: FC<Props> = ({
  style,
  placeholder = 'Pick a subject',
  value,
  subjects,
  onChange,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const { height } = useWindowDimensions()
  const onPress = () => setVisible(true)
  const onDismiss = () => setVisible(false)
  const onValueChanged = (newValue: string) => {
    onChange?.(newValue)
    onDismiss()
  }
  const pickedSubject = subjects.find(({ id }) => id === value)
  return (
    <>
      <Picker
        value={pickedSubject?.name}
        onPress={onPress}
        icon={<Icon pack="MaterialIcons" icon="school" />}
        placeholder={placeholder}
        style={style}
        {...rest}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={onDismiss}
          style={[styles.dialog, { maxHeight: Platform.OS === 'web' ? height - 200 : undefined }]}>
          <Dialog.Title>Pick a subject</Dialog.Title>
          <Dialog.ScrollArea style={{ maxHeight: '100%', paddingHorizontal: 0 }}>
            <ScrollView style={{}}>
              <RadioButton.Group value={value ?? ''} onValueChange={onValueChanged}>
                {subjects.map(({ id, name }, i) => (
                  <RadioButton.Item
                    key={i}
                    label={name}
                    value={id}
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
    alignSelf: 'center',
  },
})
