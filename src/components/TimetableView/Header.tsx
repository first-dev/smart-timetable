import { FC } from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Colors } from 'react-native-paper'
import { colors } from '@constants'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

type HeaderProps = {
  style?: StyleProp<ViewStyle>
  start: number
  end: number
  highlightedDay?: number
}

const Header: FC<HeaderProps> = ({ start, end, style, highlightedDay }) => {
  return (
    <View style={[styles.container, style]}>
      {days.map(
        (day, i) =>
          i >= start &&
          i <= end && (
            <View key={day} style={styles.element}>
              <Text style={[styles.text, i === highlightedDay ? styles.highlighted : undefined]}>
                {day}
              </Text>
            </View>
          ),
      )}
    </View>
  )
}
export default Header
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey200,
  },
  element: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  text: {
    fontSize: 12,
    color: colors.text,
  },
  highlighted: {
    color: colors.highlight,
    fontWeight: 'bold',
  },
})
