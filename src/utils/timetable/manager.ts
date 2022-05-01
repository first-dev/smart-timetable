import { TimetablesStateType } from '@atoms/timetablesState'
import { Session, Timetable } from '@models/Timetable'
import { cloneDeep } from 'lodash'

export const parseTimetableState = (text: string): TimetablesStateType | null => {
  return JSON.parse(text, (key, value) => {
    if (['start', 'end'].includes(key) && typeof value === 'string') return new Date(value)
    else return value
  })
}

export const addSessionToTimetable = (
  timetable: Timetable<'dynamic'>,
  session: Session<'dynamic'>,
): Timetable<'dynamic'> => {
  const clone = cloneDeep(timetable)
  clone.sessions.push(session)
  return clone
}

export const deleteSessionFromTimetable = (
  timetable: Timetable<'dynamic'>,
  sessionId: Session<'dynamic'>['id'],
): Timetable<'dynamic'> => {
  const clone = cloneDeep(timetable)
  clone.sessions = clone.sessions.filter(session => session.id !== sessionId)
  return clone
}

export const editSessionInTimetable = (
  timetable: Timetable<'dynamic'>,
  sessionId: Session<'dynamic'>['id'],
  newSession: Omit<Session<'dynamic'>, 'id'>,
): Timetable<'dynamic'> => {
  const clone = cloneDeep(timetable)
  const oldSession = clone.sessions.find(session => session.id === sessionId)
  if (oldSession) {
    oldSession.subjectId = newSession.subjectId
    oldSession.dayIndex = newSession.dayIndex
    oldSession.start = newSession.start
    oldSession.end = newSession.end
    oldSession.shelfLife = newSession.shelfLife
  }
  return clone
}
