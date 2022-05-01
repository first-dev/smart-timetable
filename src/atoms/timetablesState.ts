import { myTimetable, myTimetable2 } from '@constants/myTimetable'
import { Timetable } from '@models/Timetable'
import { persistAtom } from '@utils/storage'
import { parseTimetableState } from '@utils/timetable'
import { atom } from 'recoil'

export type TimetablesStateType = {
  active?: Timetable<'dynamic'>['id']
  timetables: Timetable<'dynamic'>[]
}

export const timetablesAtom = atom<TimetablesStateType>({
  key: 'timetablesState',
  default: {
    active: 'S2',
    timetables: [myTimetable, myTimetable2],
  },
  effects: [persistAtom('timetablesState', parseTimetableState)],
})
