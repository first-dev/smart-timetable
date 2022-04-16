import { Subject } from '@models'
import { FC, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import Item from './Item'

type Props = {
  subjects: Subject[]
}

const SubjectsView: FC<Props> = ({ subjects }) => {
  const [width, setWidth] = useState(Dimensions.get('window').width)
  const numColumns = Math.round(width / 250) || 1
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        key={numColumns}
        numColumns={numColumns}
        data={subjects}
        renderItem={({ item }) => <Item subject={item} style={{ flex: 1 / numColumns }} />}
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => width && setWidth(width)}
      />
    </View>
  )
}
export default SubjectsView
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {},
})
