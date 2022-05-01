import Subject from '@models/Subject'
import { Session } from '@models/Timetable'
import { paperTheme } from '@utils/theme'
import { format, formatDuration, hoursToMinutes, intervalToDuration } from 'date-fns'
import { FC } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Button, Dialog, IconButton, Portal, Text, useTheme } from 'react-native-paper'

type Props = {
  style?: StyleProp<ViewStyle>
  visible?: boolean
  session?: Session<'dynamic'>
  subject?: Subject
  onDismiss?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

const SessionDetailsView: FC<Props> = ({
  style,
  visible = false,
  session,
  subject,
  onDismiss,
  onDelete,
  onEdit,
}) => {
  const { colors } = useTheme()
  if (!session) return null
  const startDate = new Date(0, 0, 0, 0, hoursToMinutes(session.start))
  const endDate = new Date(0, 0, 0, 0, hoursToMinutes(session.end))
  const formatDate = (date: Date) => format(date, 'h:mm a').toLowerCase()
  return (
    <Portal>
      <Dialog style={style} visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>
          <Text>{subject?.name}</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text>{format(new Date(0, 0, session.dayIndex), 'EEEE')}</Text>
          <Text>
            from <Text style={styles.coloredText}>{formatDate(startDate)}</Text> to{' '}
            <Text style={styles.coloredText}>{formatDate(endDate)}</Text>
          </Text>
          <Text>{`${formatDuration(
            intervalToDuration({
              start: startDate,
              end: endDate,
            }),
          )} long`}</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <View style={styles.subActions}>
            <IconButton
              icon="delete"
              color={colors.error}
              onPress={() => {
                onDismiss?.()
                onDelete?.()
              }}
            />
            <IconButton
              icon="edit"
              color={colors.primary}
              onPress={() => {
                onDismiss?.()
                onEdit?.()
              }}
            />
          </View>
          <Button onPress={onDismiss}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
export default SessionDetailsView
const styles = StyleSheet.create({
  actions: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coloredText: {
    color: paperTheme.colors.accent,
  },
})
