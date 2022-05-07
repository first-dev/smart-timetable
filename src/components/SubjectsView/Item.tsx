import PlatformTouchable from '@components/UI/PlatformTouchable'
import spacing from '@constants/spacing'
import { Subject } from '@models'
import { FC } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Card, Text } from 'react-native-paper'

type SubjectProps = {
  style?: StyleProp<ViewStyle>
  subject: Subject
  onPress?: () => void
}

const Item: FC<SubjectProps> = ({ subject: { name, color }, style, onPress }) => {
  return (
    <View style={[styles.container, style]}>
      <Card elevation={4} style={styles.card}>
        <Card.Content style={styles.card}>
          <PlatformTouchable style={styles.touchable} onPress={onPress}>
            <View style={[styles.color, { backgroundColor: color }]} />
            <View style={styles.body}>
              <Text style={styles.text} numberOfLines={2}>
                {name}
              </Text>
            </View>
          </PlatformTouchable>
        </Card.Content>
      </Card>
    </View>
  )
}
export default Item
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  card: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.l,
  },
  color: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    marginRight: spacing.xl,
  },
  body: {
    flex: 1,
  },
  text: {},
})
