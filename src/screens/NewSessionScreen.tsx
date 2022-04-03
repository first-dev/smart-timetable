import { FC, useCallback, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Divider } from 'react-native-paper'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { MainStackParamList } from '@navigation/MainNavigator'
import { SubjectPicker } from '@components'
import { mySubjects } from '@constants/myTimetable'
import { DayPicker, HeaderButton, DatePicker, TimePicker, Space } from '@components/UI'
import { useRecoilState } from 'recoil'
import { activeTimetableState } from '@atoms/timetablesState'
import { addSession } from '@utils/timetable/manager'

type Props = NativeStackScreenProps<MainStackParamList, 'NewSessionScreen'>

const NewSessionScreen: FC<Props> = ({ navigation: { setOptions, goBack } }) => {
  const [, setActiveTimetable] = useRecoilState(activeTimetableState)
  const [start, setStart] = useState<Date>()
  const [end, setEnd] = useState<Date>()
  const [shelfLifeStart, setShelfLifeStartStart] = useState<Date>()
  const [shelfLifeEnd, setShelfLifeEnd] = useState<Date>()
  const [subjectId, setSubjectId] = useState<string>()
  const [dayIndex, setDayIndex] = useState<number>()
  const onDone = useCallback(() => {
    if (dayIndex != undefined && subjectId != undefined && start != undefined && end != undefined)
      setActiveTimetable(currentActiveTimetable =>
        currentActiveTimetable != undefined
          ? addSession(currentActiveTimetable, {
              dayIndex,
              subjectId,
              start: start.getHours() + start.getMinutes() / 60,
              end: end.getHours() + end.getMinutes() / 60,
              shelfLife: { start: shelfLifeStart ?? null, end: shelfLifeEnd ?? null },
            })
          : undefined,
      )
    goBack()
  }, [dayIndex, end, goBack, setActiveTimetable, shelfLifeEnd, shelfLifeStart, start, subjectId])

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Add new session" iconName="done" onPress={onDone} />
        </HeaderButtons>
      ),
    })
  }, [onDone, setOptions])
  return (
    <View style={styles.screen}>
      <Divider />
      <SubjectPicker subjects={mySubjects} onSelect={setSubjectId} value={subjectId} />
      <Space topDivider bottomDivider />
      <DayPicker value={dayIndex} onSelect={setDayIndex} />
      <Divider />
      <TimePicker label="Start" value={start} onChange={setStart} />
      <Divider />
      <TimePicker label="End" value={end} onChange={setEnd} />
      <Space topDivider bottomDivider />
      <DatePicker label="First" value={shelfLifeStart} onChange={setShelfLifeStartStart} />
      <Divider />
      <DatePicker label="Last" value={shelfLifeEnd} onChange={setShelfLifeEnd} />
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
export default NewSessionScreen
