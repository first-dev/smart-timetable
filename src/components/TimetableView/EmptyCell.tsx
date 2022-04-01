import { FC } from 'react'
import { View } from 'react-native'

type CellProps = {
  gap: number
}

const EmptyCell: FC<CellProps> = ({ gap }) => {
  return <View style={{ height: `${(gap / 24) * 100}%` }}></View>
}
export default EmptyCell
