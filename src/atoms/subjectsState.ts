import { atom } from 'recoil'
// import { recoilPersist, PersistStorage } from 'recoil-persist'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { Subject } from '@models'
import { mySubjects } from '@constants/myTimetable'

// const { persistAtom } = recoilPersist({
//   storage: AsyncStorage as PersistStorage,
// })

export default atom<Subject[]>({
  key: 'timetableState',
  default: mySubjects,
  // effects: [persistAtom],
})
