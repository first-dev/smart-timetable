import React, { FC } from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons'

const Packs = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
}

type PacksType = typeof Packs

type Icon =
  | { pack: 'AntDesign'; icon: keyof PacksType['AntDesign']['glyphMap'] }
  | { pack: 'Entypo'; icon: keyof PacksType['Entypo']['glyphMap'] }
  | { pack: 'EvilIcons'; icon: keyof PacksType['EvilIcons']['glyphMap'] }
  | { pack: 'Feather'; icon: keyof PacksType['Feather']['glyphMap'] }
  | { pack: 'FontAwesome'; icon: keyof PacksType['FontAwesome']['glyphMap'] }
  | { pack: 'FontAwesome5'; icon: keyof PacksType['FontAwesome5']['glyphMap'] }
  | { pack: 'Fontisto'; icon: keyof PacksType['Fontisto']['glyphMap'] }
  | { pack: 'Foundation'; icon: keyof PacksType['Foundation']['glyphMap'] }
  | { pack: 'Ionicons'; icon: keyof PacksType['Ionicons']['glyphMap'] }
  | {
      pack: 'MaterialCommunityIcons'
      icon: keyof PacksType['MaterialCommunityIcons']['glyphMap']
    }
  | { pack: 'MaterialIcons'; icon: keyof PacksType['MaterialIcons']['glyphMap'] }
  | { pack: 'Octicons'; icon: keyof PacksType['Octicons']['glyphMap'] }
  | { pack: 'SimpleLineIcons'; icon: keyof PacksType['SimpleLineIcons']['glyphMap'] }
  | { pack: 'Zocial'; icon: keyof PacksType['Zocial']['glyphMap'] }

// type IconButtonProps = Icon & TouchableOpacity['props'] & { color: string }

type IconButtonProps = Icon & {
  color?: string
  size?: number

  onPress?: () => void
  onPressIn?: () => void
  onPressOut?: () => void
  style?: StyleProp<ViewStyle>
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  pack,
  color,
  onPress,
  onPressIn,
  onPressOut,
  size = 22,
  style,
}) => {
  const IconPack = Packs[pack]
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <IconPack name={icon} color={color} size={size} />
    </TouchableOpacity>
  )
}
export default IconButton
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
