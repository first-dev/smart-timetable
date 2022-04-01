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
      <View style={[styles.inner, { backgroundColor: color }]}>
        <View style={styles.header}>
          <Text style={styles.text} numberOfLines={2}>
            {name}
          </Text>
        </View>
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
  },
  text: {
    color: 'white',
  },
})
