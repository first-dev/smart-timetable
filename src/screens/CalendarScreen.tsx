import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { Calendar } from 'react-native-calendars'
import { MaterialIcons } from '@expo/vector-icons'

type Props = DrawerScreenProps<DrawerParamList, 'CalendarScreen'>

const CalendarScreen: FC<Props> = () => {
  return (
    <View style={styles.screen}>
      <Calendar
        renderArrow={d => (
          <MaterialIcons name={`arrow-${d === 'left' ? 'back' : 'forward'}-ios`} size={18} />
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
export default CalendarScreen
