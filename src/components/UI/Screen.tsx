import { FC } from 'react'
import { View } from 'react-native'
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen'

type Props = {
  optimize?: boolean
}

const Screen: FC<Props> = ({ children, optimize = false }) => {
  return (
    <View style={{ flex: 1 }}>
      {optimize ? <OptimizedHeavyScreen>{children}</OptimizedHeavyScreen> : children}
    </View>
  )
}
export default Screen
