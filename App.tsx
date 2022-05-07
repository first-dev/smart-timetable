import { MainNavigator } from '@navigation'
import { Providers } from '@utils'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

/* TODO-Features:
 /////* dynamic timetable (changes based on current date)
 * swipe horizontally to navigate between weeks {TimetableView}
 * export and import timetables and subjects
 * use recoil selector to wrap active timetable logic
 /////* add horizontal line to indicate current time in timetable
 * add web support for time and date pickers
 */
/* TODO-Bugs:
 /////! can't access header buttons when header is not shown
 /////! statusbar overlaps with content on landscape mode
 /////! scroll wheel disalign TimetableView body and header
 /////! static timetable gets outdated
 ! sessions intersection not handled
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
