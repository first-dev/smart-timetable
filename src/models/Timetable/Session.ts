interface StaticSession {
  subjectId: string
  start: number
  end: number
  highlighted: boolean
}
interface DynamicSession {
  subjectId: string
  dayIndex: number
  start: number
  end: number
  shelfLife: {
    start: Date
    end: Date
  }
}
type Session<T extends 'static' | 'dynamic'> = T extends 'static' ? StaticSession : DynamicSession
export default Session
