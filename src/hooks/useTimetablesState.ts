import { timetablesAtom } from '@atoms/timetablesState'
import { Session, Timetable } from '@models/timetable'
import { addSessionToTimetable, compile } from '@utils/timetable'
import { deleteSessionFromTimetable, editSessionInTimetable } from '@utils/timetable/manager'
import { cloneDeep } from 'lodash'
import { useCallback, useMemo } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import useRealTime from './useRealTime'

const useTimetablesState = () => {
  const [timetablesState, setTimetablesState] = useRecoilState(timetablesAtom)
  const resetTimetablesState = useResetRecoilState(timetablesAtom)
  const time = useRealTime(60 * 1000).getMinutes()
  const { timetables, active: activeTimetableId } = timetablesState
  const activeTimetable = useMemo(
    () => timetablesState.timetables.find(({ id }) => id === timetablesState.active),
    [timetablesState.active, timetablesState.timetables],
  )
  const activeStaticTimetable = useMemo(
    () => (activeTimetable ? compile(activeTimetable) : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTimetable, time],
  )
  const addTimetable = useCallback(
    (timetableToAdd: Timetable<'dynamic'>) => {
      setTimetablesState(oldState => {
        const stateCopy = cloneDeep(oldState)
        stateCopy.timetables.push(timetableToAdd)
        return stateCopy
      })
    },
    [setTimetablesState],
  )
  const setActiveTimetableId = useCallback(
    (idOrUpdater: string | ((idsList: string[]) => string)) => {
      if (typeof idOrUpdater === 'string')
        setTimetablesState(oldState => ({ ...oldState, active: idOrUpdater }))
      else
        setTimetablesState(oldState => ({
          ...oldState,
          active: idOrUpdater(oldState.timetables.map(timetable => timetable.id)),
        }))
    },
    [setTimetablesState],
  )
  const addSession = useCallback(
    (sessionToAdd: Session<'dynamic'>) => {
      setTimetablesState(oldState => {
        const stateCopy = cloneDeep(oldState)
        const activeTimetableIndex = stateCopy.timetables.findIndex(
          ({ id }) => id === activeTimetableId,
        )
        if (activeTimetable && activeTimetableIndex !== -1)
          stateCopy.timetables[activeTimetableIndex] = addSessionToTimetable(
            activeTimetable,
            sessionToAdd,
          )
        return stateCopy
      })
    },
    [activeTimetable, activeTimetableId, setTimetablesState],
  )
  const deleteTimetable = useCallback(
    (id: string) => {
      setTimetablesState(oldState => {
        const stateCopy = cloneDeep(oldState)
        stateCopy.timetables = stateCopy.timetables.filter(timetable => timetable.id !== id)
        stateCopy.active = undefined
        return stateCopy
      })
    },
    [setTimetablesState],
  )
  const editTimetableTitle = useCallback(
    (id: string, title: string) => {
      setTimetablesState(oldState => {
        const stateCopy = cloneDeep(oldState)
        stateCopy.timetables.forEach(timetable => {
          if (timetable.id === id) timetable.title = title
        })
        return stateCopy
      })
    },
    [setTimetablesState],
  )
  const getTimetableById = useCallback(
    (id: string) => timetables.find(timetable => timetable.id === id),
    [timetables],
  )
  const getSessionById = useCallback(
    (sessionId: Session<'dynamic'>['id']) =>
      activeTimetable?.sessions.find(session => session.id === sessionId),
    [activeTimetable?.sessions],
  )
  const deleteSession = useCallback(
    (sessionId: Session<'dynamic'>['id']) =>
      setTimetablesState(oldState => {
        const stateCopy = cloneDeep(oldState)
        const activeTimetableIndex = stateCopy.timetables.findIndex(
          ({ id }) => id === activeTimetableId,
        )
        if (activeTimetable && activeTimetableIndex !== -1)
          stateCopy.timetables[activeTimetableIndex] = deleteSessionFromTimetable(
            activeTimetable,
            sessionId,
          )
        return stateCopy
      }),
    [activeTimetable, activeTimetableId, setTimetablesState],
  )
  const editSession = useCallback(
    (sessionId: Session<'dynamic'>['id'], session: Omit<Session<'dynamic'>, 'id'>) =>
      setTimetablesState(oldState => {
        const stateCopy = cloneDeep(oldState)
        const activeTimetableIndex = stateCopy.timetables.findIndex(
          ({ id }) => id === activeTimetableId,
        )
        if (activeTimetable && activeTimetableIndex !== -1)
          stateCopy.timetables[activeTimetableIndex] = editSessionInTimetable(
            activeTimetable,
            sessionId,
            session,
          )
        return stateCopy
      }),
    [activeTimetable, activeTimetableId, setTimetablesState],
  )
  return {
    resetTimetablesState,
    timetables,
    activeTimetableId,
    activeTimetable,
    activeStaticTimetable,
    addTimetable,
    setActiveTimetableId,
    addSession,
    deleteTimetable,
    editTimetableTitle,
    getTimetableById,
    getSessionById,
    deleteSession,
    editSession,
  }
}
export default useTimetablesState
