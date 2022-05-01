import { mySubjects } from '@constants/myTimetable'
import { Subject } from '@models'
import { persistAtom } from '@utils/storage'
import { atom } from 'recoil'

export const subjectsAtom = atom<Subject[]>({
  key: 'subjectsState',
  default: mySubjects,
  effects: [persistAtom('subjectsState')],
})
