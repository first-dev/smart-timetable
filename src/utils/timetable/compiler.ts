import { Timetable, Day } from '@models/Timetable'
import { isWithinInterval } from 'date-fns'
import { range } from 'lodash'

export const compile = ({ id, sessions }: Timetable<'dynamic'>): Timetable<'static'> => ({
  id,
  days: range(1, 6).map(i =>
    compileDay({ index: i, sessions: sessions.filter(({ dayIndex }) => dayIndex === i) }),
  ),
  // .filter(v => v.sessions.length > 0),
})
const compileDay = ({ index, sessions }: Day<'dynamic'>): Day<'static'> => ({
  index,
  sessions: sessions
    .filter(({ shelfLife }) => isWithinInterval(new Date().getTime(), shelfLife))
    .map(({ start, end, subjectId }) => ({
      start,
      end,
      subjectId,
      highlighted: isSessionHighlighted(start, end) && isDayHighlighted(index),
    })),
  highlighted: isDayHighlighted(index),
})
const isSessionHighlighted = (start: number, end: number) => {
  const now = new Date()
  const hours = now.getHours() + now.getMinutes() / 60

  return start <= hours && hours <= end
}
const isDayHighlighted = (index: number) => index === new Date().getDay()

// const calculateTimetableShelfLife = (days: Timetable<'dynamic'>['days']) => {
//   const now = new Date()
//   const transactionWeeks = days
//     .map(({ sessions }) => sessions)
//     .flat()
//     .map(({ shelfLife: { start, end } }) => [start, end])
//     .flat()
//     .sort(compareAsc)
//   const before = transactionWeeks.filter(date => isBefore(date, now))
//   const after = transactionWeeks.filter(date => isAfter(date, now))
//   return {
//     start: closestTo(now, after) ?? now,
//     end: closestTo(now, before) ?? now,
//   }
// }
