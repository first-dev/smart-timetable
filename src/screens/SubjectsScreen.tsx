import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'

import { DrawerParamList } from '@navigation/DrawerNavigator'
import { SubjectsView } from '@components'
import { mySubjects } from '@constants/myTimetable'

type Props = DrawerScreenProps<DrawerParamList, 'SubjectsScreen'>

const SubjectsScreen: FC<Props> = () => {
  return (
    <View style={styles.screen}>
      <SubjectsView subjects={mySubjects} />
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
export default SubjectsScreen
