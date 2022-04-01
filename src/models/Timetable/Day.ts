import Session from './Session'

interface StaticDay {
  index: number
  sessions: Session<'static'>[]
  highlighted: boolean
}
interface DynamicDay {
  index: number
  sessions: Session<'dynamic'>[]
}

type Day<T extends 'static' | 'dynamic'> = T extends 'static' ? StaticDay : DynamicDay
export default Day
