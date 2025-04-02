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

  useEffect(() => {
    const selectedResult = selected.filter((select: boolean) => select == true)
    if (
      showUserData &&
      showUserData.length > 0 &&
      selectedResult.length == showUserData?.length
    ) {
      setSelectedAll(true)
    } else {
      setSelectedAll(false)
    }
  }, [selected, showUserData])

  return { selected, setSelected, selectedAll, setSelectedAll }
}
