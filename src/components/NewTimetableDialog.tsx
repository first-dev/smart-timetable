import { FC, useState } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Button, Dialog, Divider, Portal } from 'react-native-paper'
import { TextInput } from './UI'

type Props = {
  style?: StyleProp<ViewStyle>
  visible?: boolean
  onDismiss?: () => void
  onConfirm?: (title: string) => void
  defaultValue?: string
  mode?: 'new' | 'edit'
}

const ConfirmationDialog: FC<Props> = ({
  style,
  onConfirm,
  onDismiss,
  visible = false,
  defaultValue,
  mode = 'new',
}) => {
  const [value, setValue] = useState(defaultValue ?? '')
  return (
    <Portal>
      <Dialog style={style} visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{mode === 'new' ? 'New timetable' : 'Edit timetable'}</Dialog.Title>
        <Dialog.Content>
          <Divider />
          <TextInput icon="title" placeholder="Title" value={value} onChangeText={setValue} />
          <Divider />
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button
            onPress={() => {
              value && onConfirm?.(value)
              onDismiss?.()
            }}>
            {mode === 'new' ? 'Add' : 'Edit'}
          </Button>
          <Button onPress={onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
export default ConfirmationDialog
const styles = StyleSheet.create({
  actions: {
    justifyContent: 'space-between',
  },
})
