import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'

import { DrawerParamList } from '@navigation/DrawerNavigator'

type Props = DrawerScreenProps<DrawerParamList, 'OverviewScreen'>

const OverviewScreen: FC<Props> = () => {
  return (
    <View style={styles.screen}>
      <Text>OverviewScreen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
export default OverviewScreen
