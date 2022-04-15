import { FC, useCallback, useEffect, useRef } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { HeaderButton, TextInput } from '@components/UI'
import { MainStackParamList } from '@navigation/MainNavigator'
import { Formik, FormikProps, FormikValues } from 'formik'
import * as Yup from 'yup'
import { Divider } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import { addSubjectState } from '@atoms/subjectsState'
import ColorPicker from '@components/UI/ColorPicker'
import Screen from './Screen'

type Props = NativeStackScreenProps<MainStackParamList, 'NewSubjectScreen'>
type Values = {
  name?: string
  color?: string
  teacher?: string
  room?: string
}

const NewSubjectScreen: FC<Props> = ({ navigation: { setOptions, goBack } }) => {
  const [, setAddSubjectState] = useRecoilState(addSubjectState)
  const formRef = useRef<FormikProps<FormikValues>>(null)
  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Add new subject" iconName="done" onPress={formRef.current?.handleSubmit} />
        </HeaderButtons>
      ),
    })
  }, [setOptions])
  const addSubjectHandler = useCallback<(values: Values) => void>(
    ({ name, color, teacher, room }) => {
      if (name && color) {
        setAddSubjectState({
          name: name.trim(),
          color,
          teacher: teacher?.trim(),
          room: room?.trim(),
          id: name,
        })
        goBack()
      }
    },
    [goBack, setAddSubjectState],
  )
  const validationSchema = Yup.object({
    name: Yup.string()
      .required()
      .matches(/(?!\s*$)/),
    color: Yup.string()
      .required()
      .matches(/^#[0-9a-fA-f]{6}$/g),
    teacher: Yup.string()
      .optional()
      .matches(/(?!\s*$)/),
    room: Yup.string()
      .optional()
      .matches(/(?!\s*$)/),
  })

  return (
    <Screen>
      <Formik
        initialValues={{ name: '', color: '', room: '', teacher: '' } as Values}
        validationSchema={validationSchema}
        onSubmit={addSubjectHandler}
        validateOnChange={false}
        validateOnBlur={false}
        innerRef={formRef}>
        {({ values, errors, handleChange }) => (
          <>
            <Divider />
            <TextInput
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder="Add a name"
              icon="title"
              error={!!errors.name}
            />
            <Divider />
            <ColorPicker
              error={!!errors.color}
              onChange={handleChange('color')}
              placeholder="Pick a color"
            />
            <Divider />
            <TextInput
              value={values.room}
              onChangeText={handleChange('room')}
              placeholder="Add a room"
              icon="room"
              error={!!errors.room}
            />
            <Divider />
            <TextInput
              value={values.teacher}
              onChangeText={handleChange('teacher')}
              placeholder="Add a teacher"
              icon="person"
              error={!!errors.teacher}
            />
            <Divider />
          </>
        )}
      </Formik>
    </Screen>
  )
}

export default NewSubjectScreen
