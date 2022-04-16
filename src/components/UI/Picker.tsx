import Icon from '@components/UI/Icon'
import { colors, fonts, spacing } from '@constants'
import { ComponentProps, ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { gestureHandlerRootHOC, TouchableNativeFeedback } from 'react-native-gesture-handler'
import { Text, useTheme } from 'react-native-paper'
import PlatformTouchable from './PlatformTouchable'

export type PickerProps<T = string> = {
  style?: StyleProp<ViewStyle>
  label?: string
  value?: T
  valueComponent?: ReactNode
  placeholder?: string
  icon?: ReactNode
  error?: boolean
  onChange?: (newValue: string) => void
} & ComponentProps<typeof TouchableNativeFeedback>

const Picker = ({
  value,
  label,
  style,
  placeholder,
  icon,
  error,
  valueComponent,
  ...rest
}: PickerProps<string> & { children?: ReactNode }) => {
  const {
    colors: { placeholder: placeholderColor },
  } = useTheme()
  return (
    <PlatformTouchable style={[styles.container, style]} {...rest}>
      <View style={styles.iconContainer}>{icon}</View>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
      <View style={styles.valueContainer}>
        {valueComponent ? (
          valueComponent
        ) : (
          <Text style={styles.value}>
            {value ?? <Text style={{ color: placeholderColor }}>{placeholder}</Text>}
          </Text>
        )}
      </View>
      <View style={styles.errorContainer}>
        {error && <Icon pack="MaterialCommunityIcons" icon="close-circle" color={colors.error} />}
      </View>
    </PlatformTouchable>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  iconContainer: {
    paddingRight: spacing.l,
    paddingVertical: spacing.xl,
  },
  labelContainer: {
    width: 60,
  },
  label: {
    fontSize: fonts.sizes.regular,
  },
  valueContainer: {
    flex: 1,
  },
  value: {
    flexShrink: 1,
    fontSize: fonts.sizes.regular,
  },
  errorContainer: {},
})
export default gestureHandlerRootHOC(Picker, { flex: undefined })
