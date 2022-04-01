import { MainStackParamList } from './MainNavigator'
import { DrawerParamList } from './DrawerNavigator'

export { default as DrawerNavigator } from './DrawerNavigator'
export { default as MainNavigator } from './MainNavigator'
export type AllParamsList = MainStackParamList & DrawerParamList
