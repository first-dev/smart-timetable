/* eslint-disable react-native/no-unused-styles */
import { fonts, spacing } from '@constants'
import { format } from 'date-fns'
import { range } from 'lodash'
import { ComponentProps, FC, useMemo } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

type Props = {
  style?: StyleProp<ViewStyle>
  start: number
  end: number
  AmPm?: boolean
} & ComponentProps<typeof View>

const cellHeight = 20

const Sidebar: FC<Props> = ({ start, end, AmPm = false, style, ...rest }) => {
  const { fonts: fontsTheme } = useTheme()
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingVertical: cellHeight / 2,
          paddingHorizontal: spacing.xs,
          justifyContent: 'space-evenly',
          alignItems: 'stretch',
        },
        cell: {
          height: cellHeight,
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          fontSize: fonts.sizes.tiny,
          lineHeight: fonts.sizes.tiny + 2,
          ...fontsTheme.thin,
        },
        AmPm: {
          height: !AmPm ? 0 : undefined,
          overflow: !AmPm ? 'hidden' : undefined,
        },
      }),
    [AmPm, fontsTheme.thin],
  )
  return (
    <View style={[styles.container, style]} {...rest}>
      {range(start, end + 1).map(v => (
        <View key={v} style={styles.cell}>
          <Text style={styles.text}>
            {format(new Date(0, 0, 0, v), AmPm ? 'h' : 'H').toLowerCase()}
          </Text>
          <Text style={[styles.text, styles.AmPm]}>
            {format(new Date(0, 0, 0, v), 'a').toLowerCase()}
          </Text>
        </View>
      ))}
    </View>
  )
}
export default Sidebar
