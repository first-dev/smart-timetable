import { Screen } from '@components/UI'
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { FC } from 'react'
import { Calendar } from 'react-native-calendars'

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
