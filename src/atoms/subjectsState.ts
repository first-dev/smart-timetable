import { mySubjects } from '@constants/myTimetable'
import { Subject } from '@models'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistAtom } from '@utils/storage'
import { cloneDeep } from 'lodash'
import { atom, DefaultValue, MutableSnapshot, selector } from 'recoil'

export const subjectsState = atom<Subject[]>({
  key: 'subjectsState',
  default: mySubjects,
  effects: [persistAtom('subjectsState')],
})
export const initializeSubjectsState = async ({ set }: MutableSnapshot) => {
  const savedValue = await AsyncStorage.getItem(subjectsState.key)
  const value = savedValue != null ? JSON.parse(savedValue) : new DefaultValue()
  value && set(subjectsState, value)
}

export const addSubjectState = selector<Subject | undefined>({
  key: 'addSubject',
  get: () => undefined,
  set: ({ set }, newValue) => {
    set(subjectsState, previousValue => {
      if (newValue instanceof DefaultValue || newValue == undefined) return previousValue
      const subjectsStateValue = cloneDeep(previousValue)
      const existingSubjectIndex = previousValue.findIndex(({ id }) => id === newValue.id)
      if (existingSubjectIndex != -1) subjectsStateValue[existingSubjectIndex] = newValue
      else subjectsStateValue.push(newValue)
      return subjectsStateValue
    })
  },
})
