/* eslint-disable react-native/no-unused-styles */
import useRealTime from '@hooks/useRealTime'
import { FC, useMemo } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'

type Props = {
  style?: StyleProp<ViewStyle>
}

const TimeIndicator: FC<Props> = ({ style }) => {
  const time = useRealTime(60 * 1000)
  const progress = ((time.getHours() + time.getMinutes() / 60) / 24) * 100
  const { colors } = useTheme()
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        indicator: {
          backgroundColor: colors.accent,
          position: 'absolute',
          top: `${progress}%`,
          width: '100%',
          height: 2,
        },
      }),
    [colors.accent, progress],
  )
  return (
    <View style={[styles.container, style]} pointerEvents="none">
      <View style={styles.indicator} />
    </View>
  )
}
export default TimeIndicator
