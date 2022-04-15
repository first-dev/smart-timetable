import { Timetable } from '@models/Timetable'
import { atom, DefaultValue, MutableSnapshot, selector } from 'recoil'
import { emptyTimetable } from '@constants/myTimetable'
import { compile, parseTimetableState } from '@utils/timetable'
import { cloneDeep, findIndex } from 'lodash'
import { persistAtom } from '@utils/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type TimetablesStateType = {
  active: Timetable<'dynamic'>['id'] | null
  timetables: Timetable<'dynamic'>[]
}

export const timetablesState = atom<TimetablesStateType>({
  key: 'timetablesState',
  default: {
    active: 'S2',
    timetables: [emptyTimetable],
  },
  effects: [persistAtom('timetablesState')],
})

export const initializeTimetablesState = async ({ set }: MutableSnapshot) => {
  const savedValue = await AsyncStorage.getItem(timetablesState.key)
  const value = savedValue != null ? parseTimetableState(savedValue) : new DefaultValue()
  value && set(timetablesState, value)
}

export const activeTimetableState = selector<Timetable<'dynamic'> | undefined>({
  key: 'activeTimetableState',
  get: ({ get }) => {
    const timetables = get(timetablesState).timetables
    const active = get(activeTimetableIdState)
    return timetables.find(({ id }) => id === active)
  },
  set: ({ set, get }, newValue) =>
    set(timetablesState, previousValue => {
      const timetablesStateValue = cloneDeep(previousValue)
      const activeTimetableIndex = findIndex(
        timetablesStateValue.timetables,
        ({ id }) => id === get(activeTimetableIdState),
      )
      if (activeTimetableIndex === -1 || newValue instanceof DefaultValue || newValue == undefined)
        return previousValue
      timetablesStateValue.timetables[activeTimetableIndex] = newValue
      return timetablesStateValue
    }),
})

export const activeTimetableIdState = selector<string | null>({
  key: 'setActiveTimetable',
  get: ({ get }) => get(timetablesState).active,
  set: ({ set }, newValue) =>
    set(timetablesState, previousValue =>
      newValue instanceof DefaultValue ? previousValue : { ...previousValue, active: newValue },
    ),
})

export const compiledTimetableState = selector({
  key: 'compiledTimetableState',
  get: ({ get }) => {
    const activeTimetable = get(activeTimetableState)
    return activeTimetable ? compile(activeTimetable) : undefined
  },
})
