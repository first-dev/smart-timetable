import { Timetable, Day } from '@models/Timetable'
import { isWithinInterval } from 'date-fns'
import { range } from 'lodash'

export const compile = ({ title, id, sessions }: Timetable<'dynamic'>): Timetable<'static'> => ({
  title,
  id,
  days: range(0, 7).map(i =>
    compileDay({ index: i, sessions: sessions.filter(({ dayIndex }) => dayIndex === i) }),
  ),
})
const compileDay = ({ index, sessions }: Day<'dynamic'>): Day<'static'> => ({
  index,
  sessions: sessions
    .filter(({ shelfLife: { start, end } }) =>
      isWithinInterval(new Date().getTime(), {
        start: start != null ? start : 0,
        end: end != null ? end : 1e15,
      }),
    )
    .map(({ id, start, end, subjectId }) => ({
      id,
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
