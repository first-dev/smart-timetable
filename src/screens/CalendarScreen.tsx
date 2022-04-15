import { FC } from 'react'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { Calendar } from 'react-native-calendars'
import { MaterialIcons } from '@expo/vector-icons'
import Screen from './Screen'

type Props = DrawerScreenProps<DrawerParamList, 'CalendarScreen'>

const CalendarScreen: FC<Props> = () => {
  return (
    <Screen>
      <Calendar
        renderArrow={d => (
          <MaterialIcons name={`arrow-${d === 'left' ? 'back' : 'forward'}-ios`} size={18} />
        )}
      />
    </Screen>
  )
}
export default CalendarScreen
