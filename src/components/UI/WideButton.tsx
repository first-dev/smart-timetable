import { fonts, spacing } from '@constants'
import { ComponentProps, FC, ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { gestureHandlerRootHOC, TouchableNativeFeedback } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import PlatformTouchable from './PlatformTouchable'

export type Props = {
  style?: StyleProp<ViewStyle>
  icon?: ReactNode
  title?: string
} & ComponentProps<typeof TouchableNativeFeedback>

const WideButton: FC<Props> = ({ style, icon, title, ...rest }) => {
  return (
    <PlatformTouchable style={[styles.container, style]} {...rest}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </PlatformTouchable>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  iconContainer: {
    marginRight: spacing.l,
    width: 24,
    aspectRatio: 1,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: fonts.sizes.regular,
    lineHeight: fonts.sizes.regular + 2,
  },
})
export default gestureHandlerRootHOC(WideButton, { flex: undefined })
