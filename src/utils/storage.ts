import AsyncStorage from '@react-native-async-storage/async-storage'
import { AtomEffect, DefaultValue } from 'recoil'
export const persistAtom =
  <T>(key: string, parse = JSON.parse, stringify = JSON.stringify): AtomEffect<T> =>
  ({ onSet, setSelf }) => {
    setSelf(
      AsyncStorage.getItem(key).then(savedValue =>
        savedValue != null ? parse(savedValue) : new DefaultValue(),
      ),
    )
    onSet((newValue, _, isReset) => {
      if (isReset) {
        AsyncStorage.removeItem(key)
      } else {
        AsyncStorage.setItem(key, stringify(newValue))
      }
    })
  }
