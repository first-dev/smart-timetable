import { MainNavigator } from '@navigation'
import { Providers } from '@utils'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

/*
TODO-Features:
* ////dynamic timetable (changes based on current date)
* swipe horizontally to navigate between weeks {TimetableView}


TODO-Bugs:
! can't access header buttons when header is not shown
! statusbar overlaps with content on landscape mode
*/

export default function App() {
  return (
    <Providers>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <MainNavigator />
      </View>
    </Providers>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
