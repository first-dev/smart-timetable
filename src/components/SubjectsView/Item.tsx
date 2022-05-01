import PlatformTouchable from '@components/UI/PlatformTouchable'
import { Subject } from '@models'
import { FC } from 'react'
import { Text } from 'react-native-paper'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type SubjectProps = {
  style?: StyleProp<ViewStyle>
  subject: Subject
  onPress?: () => void
}

const Item: FC<SubjectProps> = ({ subject: { name, color }, style, onPress }) => {
  return (
    <View style={[styles.container, style]}>
      <PlatformTouchable onPress={onPress}>
        <View style={styles.inner}>
          <View style={[styles.header, { backgroundColor: color }]}>
            <Text style={styles.text} numberOfLines={2}>
              {name}
            </Text>
          </View>
          <View style={styles.body}></View>
        </View>
      </PlatformTouchable>
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
