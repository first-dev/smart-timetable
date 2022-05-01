import { NewTimetableDialog, TimetablesList } from '@components'
import { ConfirmationDialog, HeaderButton, Screen } from '@components/UI'
import { spacing } from '@constants'
import { useTimetablesState } from '@hooks'
import { Timetable } from '@models/Timetable'
import { MainStackParamList } from '@navigation/MainNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC, useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

type Props = NativeStackScreenProps<MainStackParamList, 'ManageTimetablesScreen'>

const ManageTimetablesScreen: FC<Props> = ({ navigation: { setOptions, navigate } }) => {
  const {
    timetables,
    activeTimetableId,
    editTimetableTitle,
    deleteTimetable,
    getTimetableById,
    setActiveTimetableId,
    addTimetable,
  } = useTimetablesState()
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
  const [timetableToDelete, setTimetableToDelete] = useState<Timetable<'dynamic'>>()
  const [newTimetableDialogVisible, setNewTimetableDialogVisible] = useState(false)
  const [timetableToEdit, setTimetableToEdit] = useState<Timetable<'dynamic'>>()
  const [editTimetableDialogVisible, setEditTimetableDialogVisible] = useState(false)

  const editHandler = useCallback(
    (id: string) => {
      setTimetableToEdit(getTimetableById(id))
      setEditTimetableDialogVisible(true)
    },
    [getTimetableById],
  )
  const confirmedEditHandler = useCallback(
    (title: string) => {
      if (timetableToEdit) {
        editTimetableTitle(timetableToEdit.id, title)
      }
    },
    [editTimetableTitle, timetableToEdit],
  )
  const deleteHandler = useCallback(
    (id: string) => {
      setTimetableToDelete(getTimetableById(id))
      setDeleteDialogVisible(true)
    },
    [getTimetableById],
  )
  const confirmedDeleteHandler = useCallback(() => {
    if (timetableToDelete) {
      deleteTimetable(timetableToDelete.id)
      setActiveTimetableId(idsList => idsList[0])
    }
  }, [deleteTimetable, setActiveTimetableId, timetableToDelete])
  const addTimetableHandler = useCallback(
    (title: string) => {
      addTimetable({
        title,
        id: title,
        sessions: [],
      })
    },
    [addTimetable],
  )

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add new timetable"
            iconName={'add'}
            onPress={() => setNewTimetableDialogVisible(true)}
          />
        </HeaderButtons>
      ),
    })
  }, [navigate, setOptions])

  return (
    <Screen style={styles.screen}>
      <TimetablesList
        timetables={timetables}
        activeTimetableId={activeTimetableId}
        onDelete={deleteHandler}
        onSelect={setActiveTimetableId}
        onEdit={editHandler}
      />
      <ConfirmationDialog
        visible={deleteDialogVisible}
        onDismiss={() => setDeleteDialogVisible(false)}
        title="Delete Timetable"
        onConfirm={confirmedDeleteHandler}
        deleteButton>
        <Text>
          Are you sure you want to delete{' '}
          <Text style={{ fontWeight: 'bold' }}>{timetableToDelete?.title}</Text> timetable?
        </Text>
      </ConfirmationDialog>
      <NewTimetableDialog
        visible={newTimetableDialogVisible}
        onConfirm={addTimetableHandler}
        onDismiss={() => setNewTimetableDialogVisible(false)}
      />
      <NewTimetableDialog
        defaultValue={timetableToEdit?.title}
        mode="edit"
        visible={editTimetableDialogVisible}
        onConfirm={confirmedEditHandler}
        onDismiss={() => setEditTimetableDialogVisible(false)}
      />
    </Screen>
  )
}
export default ManageTimetablesScreen

const styles = StyleSheet.create({
  screen: {
    padding: spacing.l,
  },
})
