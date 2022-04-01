import { FC } from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-paper'

type Props = {
  height?: number
  topDivider?: boolean
  bottomDivider?: boolean
}

const Space: FC<Props> = ({ height = 40, topDivider, bottomDivider }) => (
  <>
    {topDivider && <Divider />}
    <View style={{ alignSelf: 'stretch', height }} />
    {bottomDivider && <Divider />}
  </>
)
export default Space
