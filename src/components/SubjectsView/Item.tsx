import { Subject } from '@models'
import { FC } from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'

type SubjectProps = {
  style?: StyleProp<ViewStyle>
  subject: Subject
}

const Item: FC<SubjectProps> = ({ subject: { name, color }, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.inner}>
        <View style={[styles.header, { backgroundColor: color }]}>
          <Text style={styles.text} numberOfLines={2}>
            {name}
            {/* this is long ass text just for testing how it would look on multiple lines */}
          </Text>
        </View>
        <View style={styles.body}></View>
      </View>
    </View>
  )
}
export default Item
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  inner: {
    flex: 1,
    alignItems: 'stretch',
    margin: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    padding: 4,
    height: 50,
  },
  text: {
    color: 'white',
  },
  body: {
    height: 100,
    backgroundColor: 'grey',
  },
})
