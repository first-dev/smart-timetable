import { FC, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, ScrollView, Platform } from 'react-native'
import {
  gestureHandlerRootHOC,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { Dialog, Portal, useTheme, RadioButton } from 'react-native-paper'
import { Text, Icon } from '@components/UI'
import { Subject } from '@models'

// dirty workaround to avoid types conflict
const Touchable = (
  Platform.OS === 'web' ? TouchableOpacity : TouchableNativeFeedback
) as typeof TouchableOpacity

type Props = {
  style?: StyleProp<ViewStyle>
  subjects: Subject[]
  onSelect: (subjectId: string) => void
  placeholder?: string
  value?: string
}

const SubjectPicker: FC<Props> = ({
  style,
  placeholder = 'Pick a subject',
  value,
  subjects,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false)
  const {
    colors: { placeholder: placeholderColor },
  } = useTheme()
  const onPress = () => setVisible(true)
  const onDismiss = () => setVisible(false)
  const onValueChanged = (newValue: string) => {
    onSelect(newValue)
    onDismiss()
  }
  const pickedSubject = subjects.find(({ id }) => id === value)
  return (
    <>
      <Touchable style={[styles.container, style]} onPress={onPress}>
        <Icon pack="MaterialIcons" icon="school" />
        <View style={styles.valueContainer}>
          <Text style={styles.value}>
            {value ? (
              pickedSubject?.name
            ) : (
              <Text style={{ color: placeholderColor }}>{placeholder}</Text>
            )}
          </Text>
        </View>
      </Touchable>
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
          <Dialog.Title onPressIn={null} onPressOut={null}>
            Pick a subject
          </Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView>
              <RadioButton.Group value={value ?? ''} onValueChange={onValueChanged}>
                {subjects.map(({ id, name }, i) => (
                  <RadioButton.Item
                    key={i}
                    label={name}
                    value={id}
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
