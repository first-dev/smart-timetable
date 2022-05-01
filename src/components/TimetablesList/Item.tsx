// import { IconButton } from '@components/UI'
import fonts from '@constants/fonts'
import spacing from '@constants/spacing'
import { FC } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { RadioButton, Text, IconButton } from 'react-native-paper'

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
export default gestureHandlerRootHOC(Item, { flex: 0 })
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
