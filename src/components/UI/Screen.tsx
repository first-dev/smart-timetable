import { FC } from 'react'
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native'
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen'

type Props = {
  optimize?: boolean
  scrollable?: boolean
  style?: StyleProp<ViewStyle>
}

const Screen: FC<Props> = ({ children, optimize = false, scrollable = false, style }) => {
  const ParentView = scrollable ? ScrollView : View
  return (
    <ParentView style={[{ flex: 1 }, style]}>
      {optimize ? <OptimizedHeavyScreen>{children}</OptimizedHeavyScreen> : children}
    </ParentView>
  )
}
export default Screen
