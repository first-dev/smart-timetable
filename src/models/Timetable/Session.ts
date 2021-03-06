interface StaticSession {
  id: string | number[]
  subjectId: string
  start: number
  end: number
  highlighted: boolean
}
interface DynamicSession {
  id: string | number[]
  subjectId: string
  dayIndex: number
  start: number
  end: number
  shelfLife: {
    start: Date | null
    end: Date | null
  }
}
type Session<T extends 'static' | 'dynamic'> = T extends 'static' ? StaticSession : DynamicSession
export default Session
