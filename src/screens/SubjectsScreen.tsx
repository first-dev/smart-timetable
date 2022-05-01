import { SubjectsView } from '@components'
import { HeaderButton, Screen } from '@components/UI'
import { MoreMenu } from '@components/UI/HeaderButtons'
import useSubjectsState from '@hooks/useSubjectsState'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { MainStackParamList } from '@navigation/MainNavigator'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { FC, useCallback, useEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

type Props = DrawerScreenProps<DrawerParamList & MainStackParamList, 'SubjectsScreen'>

const SubjectsScreen: FC<Props> = ({ navigation: { setOptions, navigate } }) => {
  const { subjects, resetState } = useSubjectsState()
  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add new session"
            iconName={'add'}
            onPress={() => navigate('NewSubjectScreen', { action: 'new' })}
          />
          <MoreMenu>
            <MoreMenu.Item onPress={resetState} title="Reset" />
          </MoreMenu>
        </HeaderButtons>
      ),
    })
  }, [navigate, resetState, setOptions])
  const itemPressHandler = useCallback(
    (subjectId: string) => {
      navigate('SubjectDetailsScreen', { subjectId })
    },
    [navigate],
  )
  return (
    <Screen>
      <SubjectsView subjects={subjects} onItemPress={itemPressHandler} />
    </Screen>
  )
}
export default SubjectsScreen
