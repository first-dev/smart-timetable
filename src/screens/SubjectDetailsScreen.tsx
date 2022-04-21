import { HeaderButton, Icon, Screen, Space } from '@components/UI'
import { MoreMenu } from '@components/UI/HeaderButtons'
import { colors, fonts, spacing } from '@constants'
import { useSubjectsState } from '@hooks'
import { MainStackParamList } from '@navigation/MainNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC, useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Dialog, Divider, Portal, Text, Title } from 'react-native-paper'
import { HeaderButtons } from 'react-navigation-header-buttons'

type Props = NativeStackScreenProps<MainStackParamList, 'SubjectDetailsScreen'>

const SubjectDetailsScreen: FC<Props> = ({
  navigation: { setOptions, navigate, goBack },
  route: { params },
}) => {
  const { subjectId } = params
  const { getSubjectById, deleteSubject } = useSubjectsState()
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
  const subject = getSubjectById(subjectId)
  const deleteHandler = useCallback(() => {
    deleteSubject(subjectId)
    goBack()
  }, [deleteSubject, goBack, subjectId])
  useEffect(() => {
    setOptions({
      headerTitle: subject?.name,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <MoreMenu>
            <MoreMenu.Item
              title="Edit"
              onPress={() => navigate('NewSubjectScreen', { action: 'edit', subjectId })}
            />
            <MoreMenu.Item title="Delete" onPress={() => setDeleteDialogVisible(true)} />
          </MoreMenu>
        </HeaderButtons>
      ),
    })
  }, [deleteHandler, navigate, setOptions, subject?.name, subjectId])

  if (!subject) return null
  return (
    <Screen scrollable style={styles.screen}>
      <View style={styles.attributeContainer}>
        <Icon pack="MaterialIcons" icon="colorize" />
        <View style={[styles.colorView, { backgroundColor: subject.color }]} />
      </View>
      <Divider />
      <View style={styles.attributeContainer}>
        <Icon pack="MaterialIcons" icon="room" />
        <Text style={styles.text}>{subject.room}</Text>
      </View>
      <Divider />
      <View style={styles.attributeContainer}>
        <Icon pack="MaterialIcons" icon="person" />
        <Text style={styles.text}>{subject.teacher}</Text>
      </View>
      <Space bottomDivider />
      <Title style={styles.title}>Next session</Title>
      <Space height={200} bottomDivider />
      <Title style={styles.title}>Upcoming events</Title>
      <Space height={200} />
      <Portal>
        <Dialog
          style={styles.dialog}
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}>
          <Dialog.Title>Delete Subject</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to delete{' '}
              <Text style={{ fontWeight: 'bold' }}>{subject.name}</Text>?
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.actions}>
            <Button color={colors.error} onPress={deleteHandler}>
              Delete
            </Button>
            <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Screen>
  )
}
export default SubjectDetailsScreen
const styles = StyleSheet.create({
  screen: {
    padding: spacing.l,
  },
  attributeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.l,
  },
  text: {
    fontSize: fonts.sizes.regular,
    marginLeft: spacing.l,
  },
  colorView: {
    marginLeft: spacing.l,
    height: 24,
    aspectRatio: 4,
    borderRadius: 12,
  },
  title: {
    fontSize: fonts.sizes.title,
  },
  dialog: {
    alignSelf: 'center',
  },
  actions: {
    justifyContent: 'space-between',
  },
})
