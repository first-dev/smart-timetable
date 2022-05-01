import { Timetable } from '@models/Timetable'
import { FC } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Item from './Item'

type Props = {
  style?: StyleProp<ViewStyle>
  timetables?: Omit<Timetable<'dynamic'>, 'sessions'>[]
  activeTimetableId?: string
  onSelect?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const TimetablesList: FC<Props> = ({
  style,
  activeTimetableId,
  timetables,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={[styles.container, style]}>
      {timetables?.map((timetable, index) => (
        <Item
          key={index}
          title={timetable.title}
          selected={activeTimetableId === timetable.id}
          onSelect={() => onSelect?.(timetable.id)}
          onEdit={() => onEdit?.(timetable.id)}
          onDelete={() => onDelete?.(timetable.id)}
        />
      ))}
    </View>
  )
}
export default TimetablesList
const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
})
