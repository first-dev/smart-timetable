import { colors } from '@constants'
import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'

const Header: FC = () => {
  return (
    <View style={styles.container}>
      <Title style={styles.text}>Smart Timetable</Title>
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
  text: {
    flex: 1,
    color: colors.primary,
  },
})
