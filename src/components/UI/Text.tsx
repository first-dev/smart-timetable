import { FC } from 'react'
import { Text as PaperText } from 'react-native-paper'

type Props = typeof PaperText['defaultProps']

const Text: FC<Props> = props => <PaperText onPressIn={null} onPressOut={null} {...props} />
export default Text
