/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { TextInput } from '@components/UI'
import ColorPicker from '@components/UI/ColorPicker'
import { Formik, FormikProps, FormikValues } from 'formik'
import { forwardRef } from 'react'
import { Divider } from 'react-native-paper'
import * as Yup from 'yup'

export type SubjectFormValues = {
  name?: string
  color?: string
  teacher?: string
  room?: string
}
type Props = {
  initialValues?: SubjectFormValues
  onSubmit: (values: SubjectFormValues) => void
}

const SubjectForm = forwardRef<FormikProps<FormikValues>, Props>(
  ({ initialValues, onSubmit }, ref) => {
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
      <Formik
        initialValues={initialValues ?? { name: '', color: '', room: '', teacher: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        innerRef={ref}>
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
              defaultValue={initialValues?.color}
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
    )
  },
)
export default SubjectForm
