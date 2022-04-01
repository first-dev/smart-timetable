import { createStore, persist } from 'easy-peasy'

const store = createStore(
  persist({
    expenses: [],
  }),
)

export default store
