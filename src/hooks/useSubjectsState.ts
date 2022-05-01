import { subjectsAtom } from '@atoms/subjectsState'
import { Subject } from '@models'
import { cloneDeep } from 'lodash'
import { useCallback } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

const useSubjectsState = () => {
  const [subjects, setSubjects] = useRecoilState(subjectsAtom)
  const resetState = useResetRecoilState(subjectsAtom)
  const addSubject = useCallback(
    (subjectToAdd: Subject) => {
      setSubjects(previousValue => {
        const subjectsStateValue = cloneDeep(previousValue)
        const existingSubjectIndex = subjectsStateValue.findIndex(
          ({ id }) => id === subjectToAdd.id,
        )
        if (existingSubjectIndex != -1) subjectsStateValue[existingSubjectIndex] = subjectToAdd
        else subjectsStateValue.push(subjectToAdd)
        return subjectsStateValue
      })
    },
    [setSubjects],
  )
  const deleteSubject = useCallback(
    (subjectId: string) =>
      setSubjects(previousValue => previousValue.filter(subject => subject.id !== subjectId)),
    [setSubjects],
  )
  const getSubjectById = useCallback(
    (subjectId: string) => subjects.find(({ id }) => id === subjectId),
    [subjects],
  )
  const editSubject = useCallback(
    (subjectId: string, subject: Omit<Subject, 'id'>) => {
      setSubjects(previousValue => {
        const subjectsStateValue = cloneDeep(previousValue)
        const oldSubjectIndex = subjectsStateValue.findIndex(({ id }) => id === subjectId)
        const oldSubject = subjectsStateValue[oldSubjectIndex]
        if (oldSubjectIndex != -1)
          subjectsStateValue[oldSubjectIndex] = { ...subject, id: oldSubject.id }
        return subjectsStateValue
      })
    },
    [setSubjects],
  )

  return {
    subjects,
    setSubjects,
    resetState,
    addSubject,
    deleteSubject,
    getSubjectById,
    editSubject,
  }
}
export default useSubjectsState
