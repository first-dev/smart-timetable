import { colors } from '@constants'
import { MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { HeaderButton as DefaultHeaderButton } from 'react-navigation-header-buttons'

type HeaderButtonProps = DefaultHeaderButton['props']

const HeaderButton: FC<HeaderButtonProps> = props => {
  return (
    <DefaultHeaderButton
      {...props}
      iconSize={24}
      IconComponent={MaterialIcons}
      color={colors.primary}
    />
  )
}
export default HeaderButton
