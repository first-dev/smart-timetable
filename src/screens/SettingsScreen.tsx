/* eslint-disable react-native/no-unused-styles */
import { DayPicker, Icon, RadioPicker, Screen } from '@components/UI'
import spacing from '@constants/spacing'
import { useSettings } from '@hooks'
import { DrawerParamList } from '@navigation/DrawerNavigator'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { FC, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Divider, Text, useTheme } from 'react-native-paper'

type Props = DrawerScreenProps<DrawerParamList, 'SettingsScreen'>

const SettingsScreen: FC<Props> = () => {
  const { colors } = useTheme()
  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          color: colors.primary,
          marginHorizontal: spacing.l,
          marginVertical: spacing.s,
        },
      }),
    [colors.primary],
  )
  const { settings, updateSettings, resetState } = useSettings()
  return (
    <Screen scrollable>
      <Text style={styles.title}>General</Text>
      <RadioPicker
        label="App theme"
        title="App theme"
        contentAlignment="vertical"
        icon={<Icon pack="MaterialCommunityIcons" icon="theme-light-dark" />}
        onChange={newValue =>
          updateSettings(oldSettings => (oldSettings.general.theme = newValue as any))
        }
        value={settings.general.theme}>
        <RadioPicker.Item label="System preference" value="System preference" />
        <RadioPicker.Item label="Light" value="Light" />
        <RadioPicker.Item label="Dark" value="Dark" />
      </RadioPicker>
      <Text style={styles.title}>Timetable</Text>
      <DayPicker
        label="First week day"
        title="First week day"
        value={settings.timetable.firstDayIndex}
        onChange={newValue =>
          updateSettings(oldSettings => (oldSettings.timetable.firstDayIndex = newValue))
        }
        contentAlignment="vertical"
        maxValue={settings.timetable.lastDayIndex}
        icon={<Icon pack="MaterialCommunityIcons" icon="calendar-week-begin" />}
      />
      <Divider />
      <DayPicker
        label="Last week day"
        title="First week day"
        value={settings.timetable.lastDayIndex.toString()}
        onChange={newValue =>
          updateSettings(oldSettings => (oldSettings.timetable.lastDayIndex = newValue))
        }
        contentAlignment="vertical"
        minValue={settings.timetable.firstDayIndex}
        icon={
          <Icon
            pack="MaterialCommunityIcons"
            icon="calendar-week-begin"
            style={{ transform: [{ rotateY: '180deg' }] }}
          />
        }
      />
      <Text style={styles.title}>Subjects</Text>
      <RadioPicker
        label="Dumb picker"
        title="Opp"
        contentAlignment="vertical"
        icon={<Icon pack="MaterialCommunityIcons" icon="alpha-c-circle" />}
        value="Value"
      />
      <Text style={styles.title}>Calendar</Text>
      <RadioPicker
        label="Dumb picker"
        title="Opp"
        contentAlignment="vertical"
        icon={<Icon pack="MaterialCommunityIcons" icon="calendar-account" />}
        value="Value"
      />
      <Button onPress={resetState}>Reset state</Button>
    </Screen>
  )
}
export default SettingsScreen
