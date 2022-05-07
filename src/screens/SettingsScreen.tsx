/* eslint-disable react-native/no-unused-styles */
import { DayPicker, Icon, RadioPicker, Screen, WideButton } from '@components/UI'
import spacing from '@constants/spacing'
import { useSettings } from '@hooks'
import { AllParamsList } from '@navigation'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { FC, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Divider, Text, useTheme } from 'react-native-paper'

type Props = DrawerScreenProps<AllParamsList, 'SettingsScreen'>

const SettingsScreen: FC<Props> = ({ navigation: { navigate } }) => {
  const { colors } = useTheme()
  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          color: colors.primary,
          marginHorizontal: spacing.l,
          marginVertical: spacing.m,
        },
        picker: {
          paddingVertical: spacing.m,
        },
      }),
    [colors.primary],
  )
  const { settings, updateSettings, resetState } = useSettings()
  return (
    <Screen scrollable>
      <Text style={styles.title}>General</Text>
      <RadioPicker
        style={styles.picker}
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
      <Divider />
      <RadioPicker
        style={styles.picker}
        label="Hour format"
        title="Hour format"
        contentAlignment="vertical"
        onChange={newValue =>
          updateSettings(oldSettings => (oldSettings.general.hourFormat = newValue as any))
        }
        icon={<Icon pack="MaterialCommunityIcons" icon="hours-24" />}
        value={settings.general.hourFormat}>
        <RadioPicker.Item label="24-hour" value="24-hour" />
        <RadioPicker.Item label="12-hour" value="12-hour" />
      </RadioPicker>
      <Text style={styles.title}>Timetable</Text>
      <DayPicker
        style={styles.picker}
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
        style={styles.picker}
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
      <Divider />
      <WideButton
        title="Manage timetables"
        style={styles.picker}
        icon={<Icon pack="MaterialCommunityIcons" icon="table-settings" />}
        onPress={() => navigate('ManageTimetablesScreen')}
      />
      <Text style={styles.title}>Subjects</Text>
      <RadioPicker
        style={styles.picker}
        label="Dumb picker"
        title="Opp"
        contentAlignment="vertical"
        icon={<Icon pack="MaterialCommunityIcons" icon="alpha-c-circle" />}
        value="Value"
      />
      <Text style={styles.title}>Calendar</Text>
      <RadioPicker
        style={styles.picker}
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
