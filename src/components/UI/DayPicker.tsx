import { FC, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, ScrollView, Platform } from 'react-native'
import {
  gestureHandlerRootHOC,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { Dialog, Portal, useTheme, RadioButton } from 'react-native-paper'
import Text from './Text'
import Icon from './Icon'

const Touchable = (
  Platform.OS === 'web' ? TouchableOpacity : TouchableNativeFeedback
) as // dirty workaround to avoid types conflict
typeof TouchableOpacity

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

type Props = {
  style?: StyleProp<ViewStyle>
  onSelect: (dayIndex: number) => void
  placeholder?: string
  value?: number
}

const SubjectPicker: FC<Props> = ({ style, placeholder = 'Pick a day', value, onSelect }) => {
  const [visible, setVisible] = useState(false)
  const {
    colors: { placeholder: placeholderColor },
  } = useTheme()
  const onPress = () => setVisible(true)
  const onDismiss = () => setVisible(false)
  const onValueChanged = (newValue: string) => {
    onSelect(Number(newValue))
    onDismiss()
  }
  return (
    <>
      <Touchable style={[styles.container, style]} onPress={onPress}>
        <Icon pack="MaterialCommunityIcons" icon="calendar" />
        <View style={styles.valueContainer}>
          <Text style={styles.value}>
            {value != undefined ? (
              days[value]
            ) : (
              <Text style={{ color: placeholderColor }}>{placeholder}</Text>
            )}
          </Text>
        </View>
      </Touchable>
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
          <Dialog.Title onPressIn={null} onPressOut={null}>
            Pick a day
          </Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView>
              <RadioButton.Group value={String(value) ?? ''} onValueChange={onValueChanged}>
                {days.map((day, i) => (
                  <RadioButton.Item
                    key={i}
                    label={day}
                    value={String(i)}
                    position="leading"
                    labelStyle={{ textAlign: undefined }}
                    style={{ backgroundColor: undefined, marginHorizontal: 0 }}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </>
  )
}
export default gestureHandlerRootHOC(SubjectPicker, { flex: undefined })
const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  valueContainer: {
    paddingLeft: 16,
    flex: 1,
  },
  value: {
    flexShrink: 1,
    fontSize: 18,
  },
  dialog: {
    marginVertical: 200,
  },
})
