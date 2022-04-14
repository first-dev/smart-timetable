import fonts from '@constants/fonts'
import { ComponentProps, FC } from 'react'
import { View, StyleSheet, TextInput as NativeTextInput, Platform } from 'react-native'
import { useTheme } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import Icon from './Icon'
import spacing from '@constants/spacing'

type Props = ComponentProps<typeof NativeTextInput> & {
  icon?: keyof typeof MaterialIcons['glyphMap']
  error?: boolean
}
const webOutlineStyle = Platform.OS === 'web' ? { outlineStyle: 'none' } : {}
const TextInput: FC<Props> = ({ style, icon, error, ...rest }) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <Icon style={[styles.icon, { paddingRight: spacing.l }]} pack="MaterialIcons" icon={icon} />
      )}
      <NativeTextInput
        style={[styles.textInput, webOutlineStyle as any]}
        placeholderTextColor={colors.placeholder}
        {...rest}
      />
      {error && (
        <Icon
          style={[styles.icon, { paddingLeft: spacing.l }]}
          pack="MaterialCommunityIcons"
          icon="close-circle"
          color={colors.error}
        />
      )}
    </View>
  )
}
export default TextInput
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
  },
  textInput: {
    flex: 1,
    fontSize: fonts.sizes.regular,
    height: '100%',
  },
  icon: {
    paddingVertical: spacing.xl,
  },
})
