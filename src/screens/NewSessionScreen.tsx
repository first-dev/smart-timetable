import { subjectsState } from '@atoms/subjectsState'
import { activeTimetableState } from '@atoms/timetablesState'
import { SubjectPicker } from '@components'
import { DatePicker, DayPicker, HeaderButton, Screen, Space, TimePicker } from '@components/UI'
import { MainStackParamList } from '@navigation/MainNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { addSession } from '@utils/timetable'
import { compareAsc, parseJSON } from 'date-fns'
import { Formik, FormikProps, FormikValues } from 'formik'
import { FC, useCallback, useEffect, useRef } from 'react'
import { Divider } from 'react-native-paper'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as Yup from 'yup'

type Props = NativeStackScreenProps<MainStackParamList, 'NewSessionScreen'>
type Values = {
  subjectId?: string
  dayIndex?: string
  start?: string
  end?: string
  shelfLifeStart?: string
  shelfLifeEnd?: string
}

const NewSessionScreen: FC<Props> = ({ navigation: { setOptions, goBack } }) => {
  const [, setActiveTimetable] = useRecoilState(activeTimetableState)
  const subjects = useRecoilValue(subjectsState)
  const addSessionHandler = useCallback<(values: Values) => void>(
    ({ subjectId, dayIndex, start, end, shelfLifeStart, shelfLifeEnd }) => {
      if (
        dayIndex != undefined &&
        subjectId != undefined &&
        start != undefined &&
        end != undefined
      ) {
        const startDate = parseJSON(start)
        const endDate = parseJSON(end)
        setActiveTimetable(
          currentActiveTimetable =>
            currentActiveTimetable &&
            addSession(currentActiveTimetable, {
              dayIndex: parseInt(dayIndex),
              subjectId,
              start: startDate.getHours() + startDate.getMinutes() / 60,
              end: endDate.getHours() + endDate.getMinutes() / 60,
              shelfLife: {
                start: shelfLifeStart ? parseJSON(shelfLifeStart) : null,
                end: shelfLifeEnd ? parseJSON(shelfLifeEnd) : null,
              },
            }),
        )
      }
      goBack()
    },
    [goBack, setActiveTimetable],
  )
  const formRef = useRef<FormikProps<FormikValues>>(null)
  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Add new session" iconName="done" onPress={formRef.current?.handleSubmit} />
        </HeaderButtons>
      ),
    })
  }, [setOptions])
  const validationSchema = Yup.object().shape(
    {
      subjectId: Yup.string().required(),
      dayIndex: Yup.string().required(),
      start: Yup.string()
        // using when to access end
        .when(['end'], end =>
          // using schema with test to access start
          Yup.string().test(
            // the start should be before the end
            // if end is undefined the first statement will return false even if start is set
            // (!end && start) prevent that
            start =>
              (start && end && compareAsc(parseJSON(end), parseJSON(start)) === 1) ||
              (start && !end),
          ),
        ),
      end: Yup.string()
        .required()
        .when(['start'], start =>
          Yup.string().test(
            end =>
              (start && end && compareAsc(parseJSON(end), parseJSON(start)) === 1) ||
              (!start && end),
          ),
        ),
      shelfLifeStart: Yup.string().when(['shelfLifeEnd'], shelfLifeEnd =>
        Yup.string().test(
          shelfLifeStart =>
            (shelfLifeStart &&
              shelfLifeEnd &&
              compareAsc(parseJSON(shelfLifeEnd), parseJSON(shelfLifeStart)) === 1) ||
            // not valid if shelfLifeEnd is set white shelfLifeStart is not
            !shelfLifeEnd,
        ),
      ),
      shelfLifeEnd: Yup.string().when(['shelfLifeStart'], shelfLifeStart =>
        Yup.string().test(
          shelfLifeEnd =>
            (shelfLifeStart &&
              shelfLifeEnd &&
              compareAsc(parseJSON(shelfLifeEnd), parseJSON(shelfLifeStart)) === 1) ||
            !shelfLifeStart,
        ),
      ),
    },
    [
      // to avoid cyclic dependency
      ['start', 'end'],
      ['shelfLifeStart', 'shelfLifeEnd'],
    ],
  )
  return (
    <Screen>
      <Formik
        initialValues={{} as Values}
        validationSchema={validationSchema}
        onSubmit={addSessionHandler}
        validateOnBlur={false}
        validateOnChange={false}
        innerRef={formRef}>
        {({ values, errors, handleChange }) => (
          <>
            <Divider />
            <SubjectPicker
              subjects={subjects}
              onChange={handleChange('subjectId')}
              value={values.subjectId}
              error={!!errors.subjectId}
            />
            <Space topDivider bottomDivider />
            <DayPicker
              value={values.dayIndex}
              onChange={handleChange('dayIndex')}
              error={!!errors.dayIndex}
            />
            <Divider />
            <TimePicker
              label="Start"
              value={values.start}
              onChange={handleChange('start')}
              error={!!errors.start}
            />
            <Divider />
            <TimePicker
              label="End"
              value={values.end}
              onChange={handleChange('end')}
              error={!!errors.end}
            />
            <Space topDivider bottomDivider />
            <DatePicker
              label="First"
              value={values.shelfLifeStart}
              onChange={handleChange('shelfLifeStart')}
              error={!!errors.shelfLifeStart}
            />
            <Divider />
            <DatePicker
              label="Last"
              value={values.shelfLifeEnd}
              onChange={handleChange('shelfLifeEnd')}
              error={!!errors.shelfLifeEnd}
            />
          </>
        )}
      </Formik>
    </Screen>
  )
}
export default NewSessionScreen
