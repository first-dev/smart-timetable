import { FC } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
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
import { useTheme } from 'react-native-paper'

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

type IconProps = Icon & {
  style?: StyleProp<ViewStyle>
  color?: string
  size?: number
}

const Icon: FC<IconProps> = ({ icon, pack, color, size = 24, style }) => {
  const { colors } = useTheme()
  const IconPack = Packs[pack]
  return <IconPack name={icon} color={color ?? colors.text} size={size} style={style} />
}
export default Icon
