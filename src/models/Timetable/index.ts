import Day from './Day'
import Session from './Session'

interface StaticTimetable {
  title: string
  id: string
  days: Day<'static'>[]
}
interface DynamicTimetable {
  title: string
  id: string
  sessions: Session<'dynamic'>[]
}

export type Timetable<T extends 'static' | 'dynamic'> = T extends 'static'
  ? StaticTimetable
  : DynamicTimetable
export { default as Day } from './Day'
export { default as Session } from './Session'
