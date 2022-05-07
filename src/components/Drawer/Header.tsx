import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

const Header: FC = () => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.primary,
          fontSize: 24,
        }}>
        Smart Timetable
      </Text>
    </View>
  )
}
export default Header
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
})
