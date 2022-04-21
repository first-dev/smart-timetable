/* eslint-disable react/prop-types */
import { createContext, FC, useContext, useState } from 'react'
import { Menu, withTheme } from 'react-native-paper'
import { Item as HeaderItem } from 'react-navigation-header-buttons'

type Props = {
  title?: string
}

const MenuVisibleContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(null)

const MoreMenu: FC<Props> & { Item: typeof Menu.Item } = ({ title = 'Options', children }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <HeaderItem title={title} iconName={'more-vert'} onPress={() => setMenuVisible(true)} />
      }>
      <MenuVisibleContext.Provider value={setMenuVisible}>{children}</MenuVisibleContext.Provider>
    </Menu>
  )
}

const Item: typeof Menu.Item = ({ onPress, ...rest }) => {
  const setMenuVisible = useContext(MenuVisibleContext)
  return (
    <Menu.Item
      onPress={() => {
        onPress?.()
        setMenuVisible?.(false)
      }}
      {...rest}
    />
  )
}

MoreMenu.Item = Item
export default withTheme(MoreMenu as any) as typeof MoreMenu
