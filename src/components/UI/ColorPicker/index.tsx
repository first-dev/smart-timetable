import spacing from '@constants/spacing'
import { uniq } from 'lodash'
import { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Colors, Dialog, Divider, Portal } from 'react-native-paper'
import Icon from '../Icon'
import Picker, { PickerProps } from '../Picker'
import Grid from './Grid'
import Variants from './Variants'

type Color = {
  main: string
  variants: string[]
}
type Props = PickerProps & {
  colors?: Color[]
}
const defaultColors: Color[] = uniq(
  Object.keys(Colors)
    .map(s => s.replace(/[0-9]/g, ''))
    .filter(s => !s.endsWith('A') && !['black', 'white', 'transparent'].includes(s)),
).map(colorName => ({
  main: Colors[`${colorName}500` as never],
  variants: [
    Colors[`${colorName}100` as never],
    Colors[`${colorName}300` as never],
    Colors[`${colorName}500` as never],
    Colors[`${colorName}700` as never],
    Colors[`${colorName}900` as never],
  ],
}))

const ColorPicker: FC<Props> = ({
  style,
  placeholder = 'Pick a color',
  onChange,
  colors = defaultColors,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const [activeGridColorIndex, setActiveGridColorIndex] = useState<number>()
  const [activeVariantColorIndex, setActiveVariantColorIndex] = useState<number>()
  const [value, setValue] = useState<{
    activeColor?: string
    activeGridColorIndex?: number
    activeVariantColorIndex?: number
  }>({})
  const activeColor =
    activeGridColorIndex != undefined &&
    activeVariantColorIndex != undefined &&
    colors[activeGridColorIndex].variants[activeVariantColorIndex]
  const pressHandler = () => {
    setActiveGridColorIndex(value.activeGridColorIndex)
    setActiveVariantColorIndex(value.activeVariantColorIndex)
    setVisible(true)
  }
  const dismissHandler = () => setVisible(false)
  const submitHandler = () => {
    if (activeColor) {
      onChange?.(activeColor)
      setValue({
        activeColor,
        activeGridColorIndex,
        activeVariantColorIndex,
      })
    }
    dismissHandler()
  }

  return (
    <>
      <Picker
        valueComponent={
          value.activeColor && (
            <View style={[styles.value, { backgroundColor: value.activeColor }]} />
          )
        }
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
                style={styles.grid}
                itemSize={50}
                spacing={spacing.xs}
                colors={colors.map(color => color.main)}
                activeColorIndex={activeGridColorIndex}
                onActiveColorChange={setActiveGridColorIndex}
              />
              <Divider />
              <Variants
                style={styles.variants}
                colors={
                  activeGridColorIndex != undefined
                    ? colors[activeGridColorIndex].variants
                    : undefined
                }
                activeColorIndex={activeVariantColorIndex}
                onActiveColorChange={setActiveVariantColorIndex}
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
    marginVertical: 100,
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
    width: 24 * 4,
    borderRadius: 12,
  },
})
