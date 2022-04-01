export default interface Event {
  id: string
  type: 'homework' | 'exam' | 'other'
  name: string
  subjectId: string
  date: Date
}
