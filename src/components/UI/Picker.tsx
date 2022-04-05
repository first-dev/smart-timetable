import { ComponentProps, ReactNode } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { gestureHandlerRootHOC, TouchableNativeFeedback } from 'react-native-gesture-handler'
import { useTheme, Text } from 'react-native-paper'
import { spacing, fonts, colors } from '@constants'
import { Icon } from '@components/UI'

export type PickerProps<T = string> = {
  style?: StyleProp<ViewStyle>
  label?: string
  value?: T
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
  ...rest
}: PickerProps<string> & { children?: ReactNode }) => {
  const {
    colors: { placeholder: placeholderColor },
  } = useTheme()
  return (
    <TouchableNativeFeedback style={[styles.container, style]} {...rest}>
      <View style={styles.iconContainer}>{icon}</View>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
      <View style={styles.valueContainer}>
        <Text style={styles.value}>
          {value ?? <Text style={{ color: placeholderColor }}>{placeholder}</Text>}
        </Text>
      </View>
      <View style={styles.errorContainer}>
        {error && <Icon pack="MaterialCommunityIcons" icon="close-circle" color={colors.error} />}
      </View>
    </TouchableNativeFeedback>
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
    paddingRight: spacing.l,
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
