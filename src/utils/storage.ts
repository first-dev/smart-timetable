import AsyncStorage from '@react-native-async-storage/async-storage'
import { AtomEffect } from 'recoil'
export const persistAtom = <T>(key: string): AtomEffect<T> => {
  return ({ onSet }) => {
    onSet((newValue, _, isReset) => {
      // TODO-FIX: for some reason useResetRecoilState doesn't trigger the atom effect
      if (isReset) {
        AsyncStorage.removeItem(key)
      } else {
        AsyncStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }
}
