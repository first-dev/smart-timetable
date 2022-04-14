import spacing from '@constants/spacing'
import { uniq } from 'lodash'
import { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Portal, Dialog, Colors, Button, Divider } from 'react-native-paper'
import Icon from '../Icon'
import Picker, { PickerProps } from '../Picker'
import Grid from './Grid'
import Variants from './Variants'

type Props = PickerProps
const colorsList = uniq(
  Object.keys(Colors)
    .map(s => s.replace(/[0-9]/g, ''))
    .filter(s => !s.endsWith('A') && !['black', 'white', 'transparent'].includes(s))
    .map(s => `${s}500`)
    .map(s => Colors[s as never]),
)
const ColorPicker: FC<Props> = ({
  value,
  style,
  placeholder = 'Pick a color',
  onChange,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const [activeGridColor, setActiveGridColor] = useState('')
  const [activeColor, setActiveColor] = useState('')
  const activeGridColorName = Object.keys(Colors)
    .find(key => Colors[key as never] === activeGridColor)
    ?.replace(/[0-9]/g, '')
  const pressHandler = () => {
    if (value) {
      setActiveColor(value)
      const activeValueColorName = Object.keys(Colors)
        .find(key => Colors[key as never] === value)
        ?.replace(/[0-9]/g, '')
      setActiveGridColor(Colors[`${activeValueColorName}500` as never])
    }
    setVisible(true)
  }
  const dismissHandler = () => setVisible(false)
  const submitHandler = () => {
    onChange?.(activeColor)
    dismissHandler()
  }
  return (
    <>
      <Picker
        valueComponent={value && <View style={[styles.value, { backgroundColor: value }]} />}
        onPress={pressHandler}
        icon={<Icon pack="MaterialIcons" icon="colorize" />}
        placeholder={placeholder}
        style={style}
        {...rest}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={dismissHandler} style={styles.dialog}>
          <Dialog.Title>Pick a color</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
            <ScrollView style={{ paddingHorizontal: spacing.l }}>
              <Grid
                colors={colorsList}
                itemSize={50}
                spacing={spacing.xs}
                activeColor={activeGridColor}
                onActiveColorChange={setActiveGridColor}
                style={styles.grid}
              />
              <Divider />
              <Variants
                colors={[
                  Colors[`${activeGridColorName}100` as never],
                  Colors[`${activeGridColorName}300` as never],
                  Colors[`${activeGridColorName}500` as never],
                  Colors[`${activeGridColorName}700` as never],
                  Colors[`${activeGridColorName}900` as never],
                ]}
                activeColor={activeColor}
                style={styles.variants}
                onActiveColorChange={setActiveColor}
              />
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions style={styles.action}>
            <Button contentStyle={styles.actionButton} onPress={dismissHandler}>
              Cancel
            </Button>
            <Button contentStyle={styles.actionButton} onPress={submitHandler}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}
export default ColorPicker
const styles = StyleSheet.create({
  dialog: {
    marginVertical: 200,
  },
  action: {
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingHorizontal: spacing.l,
  },
  grid: {
    marginVertical: spacing.l,
  },
  variants: {
    marginVertical: spacing.l,
  },
  value: {
    height: 24,
    aspectRatio: 2,
    borderRadius: 12,
  },
})
