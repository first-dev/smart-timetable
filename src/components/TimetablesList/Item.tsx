import { fonts, spacing } from '@constants'
import { FC } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { IconButton, RadioButton, Text } from 'react-native-paper'

type Props = {
  style?: StyleProp<ViewStyle>
  title?: string
  onSelect?: () => void
  onEdit?: () => void
  onDelete?: () => void
  selected?: boolean
}

const Item: FC<Props> = ({ style, onDelete, onEdit, onSelect, title, selected }) => {
  return (
    <View style={[styles.container, style]}>
      <RadioButton value="" onPress={onSelect} status={selected ? 'checked' : 'unchecked'} />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <View style={{ flex: 1 }} />
      <IconButton icon="edit" onPress={onEdit} />
      <IconButton icon="delete-outline" onPress={onDelete} />
    </View>
  )
}
export default Item
const styles = StyleSheet.create({
  container: {
    padding: spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.sizes.regular,
    marginHorizontal: spacing.l,
    flexShrink: 1,
  },
})
