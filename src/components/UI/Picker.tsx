/* eslint-disable react-native/no-unused-styles */
import Icon from '@components/UI/Icon'
import { fonts, spacing } from '@constants'
import { ComponentProps, ReactNode, useMemo } from 'react'
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
  contentAlignment?: 'vertical' | 'horizontal'
  valueStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<ViewStyle>
  title?: string
} & ComponentProps<typeof TouchableNativeFeedback>

const Picker = ({
  value,
  label,
  style,
  placeholder,
  icon,
  error,
  valueComponent,
  contentAlignment = 'horizontal',
  valueStyle,
  labelStyle,
  ...rest
}: PickerProps<string> & { children?: ReactNode }) => {
  const { colors } = useTheme()
  const isHor = contentAlignment === 'horizontal'
  const styles = useMemo(
    () =>
      StyleSheet.create({
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
        contentContainer: {
          flexDirection: isHor ? 'row' : 'column',
          flex: 1,
        },
        labelContainer: {
          width: isHor ? 60 : undefined,
          marginRight: spacing.l,
        },
        label: {
          fontSize: fonts.sizes.regular,
          lineHeight: fonts.sizes.regular + 2,
        },
        value: {
          flexShrink: 1,
          fontSize: fonts.sizes.regular,
          lineHeight: fonts.sizes.regular + 2,
          color: colors.accent,
        },
      }),
    [colors.accent, isHor],
  )
  return (
    <PlatformTouchable style={[styles.container, style]} {...rest}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.contentContainer}>
        {label && (
          <View style={styles.labelContainer}>
            <Text style={[styles.label, labelStyle]} numberOfLines={1}>
              {label}
            </Text>
          </View>
        )}
        <View>
          {valueComponent ? (
            valueComponent
          ) : value ? (
            <Text style={[styles.value, valueStyle]}>{value}</Text>
          ) : isHor ? (
            <Text style={[styles.value, { color: colors.placeholder }]}>{placeholder}</Text>
          ) : null}
        </View>
      </View>
      <View>
        {error && <Icon pack="MaterialCommunityIcons" icon="close-circle" color={colors.error} />}
      </View>
    </PlatformTouchable>
  )
}
export default gestureHandlerRootHOC(Picker, { flex: undefined })
