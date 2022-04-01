// import { timetablesState } from '@atoms/timetablesState'
import { Session, Timetable } from '@models/Timetable'
// import { useRecoilState } from 'recoil'
import { cloneDeep } from 'lodash'

// const useTimetableManager = () => {
//   const [timetablesStateValue, setTimetablesStateValue] = useRecoilState(timetablesState)
//   return {}
// }

// type Return = {
//   activeTimetable: {
//     dynamic: Timetable<'dynamic'>
//     static: Timetable<'static'>
//   }
// }

export const addSession = (
  timetable: Timetable<'dynamic'>,
  session: Session<'dynamic'>,
): Timetable<'dynamic'> => {
  const clone = cloneDeep(timetable)
  clone.sessions.push(session)
  return clone
}
