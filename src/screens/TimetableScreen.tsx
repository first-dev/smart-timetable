import { TimetableView, SessionDetailsView } from '@components'
import { HeaderButton, Screen } from '@components/UI'
import { MoreMenu } from '@components/UI/HeaderButtons'
import { useSubjectsState, useTimetablesState } from '@hooks'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { MainStackParamList } from '@navigation/MainNavigator'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

type Props = DrawerScreenProps<DrawerParamList & MainStackParamList, 'TimetableScreen'>

const TimetableScreen: FC<Props> = ({ navigation: { setOptions, navigate } }) => {
  const { activeStaticTimetable, resetTimetablesState, getSessionById, deleteSession } =
    useTimetablesState()
  const { subjects, getSubjectById } = useSubjectsState()
  const [sessionDetailsVisible, setSessionDetailsVisible] = useState(false)
  const [selectedSessionId, setSelectedSessionId] = useState<string | number[]>()
  const selectedSession = useMemo(
    () => (selectedSessionId ? getSessionById(selectedSessionId) : undefined),
    [getSessionById, selectedSessionId],
  )
  const selectedSessionSubject = useMemo(
    () => (selectedSession ? getSubjectById(selectedSession?.subjectId) : undefined),
    [getSubjectById, selectedSession],
  )
  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add new session"
            iconName={'add'}
            onPress={() => navigate('NewSessionScreen', { action: 'new' })}
          />
          <MoreMenu>
            <MoreMenu.Item
              onPress={() => navigate('ManageTimetablesScreen')}
              title="Manage timetables"
            />
            <MoreMenu.Item onPress={resetTimetablesState} title="Reset" />
          </MoreMenu>
        </HeaderButtons>
      ),
    })
  }, [navigate, setOptions, resetTimetablesState, activeStaticTimetable?.title])
  const sessionPressedHandler = useCallback((sessionId: string | number[]) => {
    setSelectedSessionId(sessionId)
    setSessionDetailsVisible(true)
  }, [])

  return (
    <Screen>
      <TimetableView
        timetable={activeStaticTimetable}
        subjects={subjects}
        onSessionPress={sessionPressedHandler}
      />
      <SessionDetailsView
        session={selectedSession}
        subject={selectedSessionSubject}
        visible={sessionDetailsVisible}
        onDismiss={() => setSessionDetailsVisible(false)}
        onDelete={() => selectedSessionId && deleteSession(selectedSessionId)}
        onEdit={() =>
          selectedSessionId &&
          navigate('NewSessionScreen', {
            action: 'edit',
            sessionId: selectedSessionId,
          })
        }
      />
    </Screen>
  )
}
export default TimetableScreen
