import { Settings, settingsAtom } from '@atoms/settingsState'
import { cloneDeep } from 'lodash'
import { useCallback } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

const useSettings = () => {
  const [settings, setSettings] = useRecoilState(settingsAtom)
  const resetState = useResetRecoilState(settingsAtom)
  const updateSettings = useCallback(
    (updater: (settings: Settings) => void) => {
      setSettings(oldSettings => {
        const stateCopy = cloneDeep(oldSettings)
        updater(stateCopy)
        return stateCopy
      })
    },
    [setSettings],
  )

  return {
    settings,
    updateSettings,
    resetState,
  }
}

export default useSettings
