import SubjectForm, { SubjectFormValues } from '@components/SubjectForm'
import { HeaderButton, Screen } from '@components/UI'
import useSubjectsState from '@hooks/useSubjectsState'
import { MainStackParamList } from '@navigation/MainNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FormikProps, FormikValues } from 'formik'
import { FC, useCallback, useEffect, useRef } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

type Props = NativeStackScreenProps<MainStackParamList, 'NewSubjectScreen'>

const NewSubjectScreen: FC<Props> = ({
  navigation: { setOptions, goBack, navigate },
  route: { params },
}) => {
  const { action, subjectId } = params
  const isEdit = action === 'edit'
  const { addSubject, getSubjectById, editSubject } = useSubjectsState()
  const formRef = useRef<FormikProps<FormikValues>>(null)
  const subject = isEdit && subjectId ? getSubjectById(subjectId) : undefined
  const initialValues = isEdit ? subject : undefined
  useEffect(() => {
    setOptions({
      headerTitle: isEdit ? subject?.name : undefined,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Add new subject" iconName="done" onPress={formRef.current?.submitForm} />
        </HeaderButtons>
      ),
    })
  }, [isEdit, setOptions, subject?.name])
  const addSubjectHandler = useCallback<(values: SubjectFormValues) => void>(
    ({ name, color, teacher, room }) => {
      if (name && color) {
        const subject = {
          name: name.trim(),
          color,
          teacher: teacher?.trim(),
          room: room?.trim(),
          id: name,
        }
        if (action === 'new') {
          addSubject(subject)
          goBack()
        } else if (subjectId) {
          editSubject(subjectId, subject)
          navigate('SubjectDetailsScreen', { subjectId })
        }
      }
    },
    [action, addSubject, editSubject, goBack, navigate, subjectId],
  )

  return (
    <Screen scrollable>
      <SubjectForm ref={formRef} onSubmit={addSubjectHandler} initialValues={initialValues} />
    </Screen>
  )
}

export default NewSubjectScreen
