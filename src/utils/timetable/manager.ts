import { TimetablesStateType } from '@atoms/timetablesState'
import { Session, Timetable } from '@models/Timetable'
import { cloneDeep } from 'lodash'

export const parseTimetableState = (text: string): TimetablesStateType | null => {
  return JSON.parse(text, (key, value) => {
    if (['start', 'end'].includes(key) && typeof value === 'string') return new Date(value)
    else return value
  })
}

export const addSession = (
  timetable: Timetable<'dynamic'>,
  session: Session<'dynamic'>,
): Timetable<'dynamic'> => {
  const clone = cloneDeep(timetable)
  clone.sessions.push(session)
  return clone
}
