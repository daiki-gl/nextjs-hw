import { useEffect, useState } from 'react'
import { UserData } from '../types'

export default function useSelected(showUserData: UserData[] | null) {
  const [selected, setSelected] = useState<boolean[]>([])
  const [selectedAll, setSelectedAll] = useState<boolean | 'indeterminate'>(
    false
  )

  useEffect(() => {
    if (showUserData && showUserData.length > 0) {
      const newSelected = showUserData.map(() => false)
      setSelected(newSelected)
    } else {
      setSelected([])
    }
  }, [showUserData])

  return { selected, setSelected, selectedAll, setSelectedAll }
}
