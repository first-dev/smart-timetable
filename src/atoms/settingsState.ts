import { persistAtom } from '@utils/storage'
import { atom } from 'recoil'

export type Settings = {
  general: {
    theme: 'System preference' | 'Light' | 'Dark'
  }
  timetable: {
    firstDayIndex: string
    lastDayIndex: string
  }
}
const defaultValue: Settings = {
  general: {
    theme: 'System preference',
  },
  timetable: {
    firstDayIndex: '0',
    lastDayIndex: '6',
  },
}

export const settingsAtom = atom<Settings>({
  key: 'settingsState',
  default: defaultValue,
  effects: [
    persistAtom('settingsState', {
      defaultValue,
    }),
  ],
})
