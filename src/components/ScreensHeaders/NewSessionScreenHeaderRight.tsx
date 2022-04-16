import { HeaderButton } from '@components/UI'
import { AllParamsList } from '@navigation'
import type { HeaderOptions } from '@react-navigation/elements/lib/typescript/src/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

const TimetableScreenHeaderRight: HeaderOptions['headerRight'] = () => {
  const { goBack } = useNavigation<NavigationProp<AllParamsList>>()
  const add = () => {
    console.log(`added`)
    goBack()
  }
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Add new session" iconName="done" onPress={add} />
    </HeaderButtons>
  )
}

export default TimetableScreenHeaderRight
