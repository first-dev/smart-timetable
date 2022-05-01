import { colors } from '@constants'
import { FC, ReactNode } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'

type Props = {
  style?: StyleProp<ViewStyle>
  visible?: boolean
  onDismiss?: () => void
  onConfirm?: () => void
  title?: ReactNode
  deleteButton?: boolean
}

const ConfirmationDialog: FC<Props> = ({
  style,
  children,
  onConfirm,
  onDismiss,
  visible = false,
  deleteButton = false,
  title,
}) => {
  return (
    <Portal>
      <Dialog style={[styles.dialog, style]} visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>{children}</Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button
            color={deleteButton ? colors.error : undefined}
            onPress={() => {
              onConfirm?.()
              onDismiss?.()
            }}>
            {deleteButton ? 'Delete' : 'Confirm'}
          </Button>
          <Button onPress={onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
export default ConfirmationDialog
const styles = StyleSheet.create({
  dialog: {
    alignSelf: 'center',
  },
  actions: {
    justifyContent: 'space-between',
  },
})
