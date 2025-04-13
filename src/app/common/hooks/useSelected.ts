import { SetStateAction, useEffect, useState } from 'react'
import { UserData } from '../types'
import * as Sentry from '@sentry/nextjs'

export default function useSelected(showUserData: UserData[] | null) {
  /*
  ユーザーのチェックボックス用
  @returns selected ユーザー毎のチェックボックスのcheckedの確認
  @returns selectedAll showUserDataのユーザー全体のcheckedの確認
  @returns setSelected selectedの更新用
  @returns setSelectedAll selectedAllの更新用
  */
  const [selected, setSelected] = useState<boolean[]>([])
  const [selectedAll, setSelectedAll] = useState<boolean | 'indeterminate'>(
    false
  )

  /*
  showUserDataの更新時にselectedのcheckの有無の確認と更新
  */
  useEffect(() => {
    if (showUserData && showUserData.length > 0) {
      const newSelected = showUserData.map(() => false) //
      Sentry.captureMessage('Hello Hello ' + String(newSelected))

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

  function fetchUserData(
    id: number,
    setUserDetails: React.Dispatch<SetStateAction<UserData | undefined>>
  ): void {
    const user = showUserData?.find((user) => user.id === id)
    setUserDetails(user)
  }

  return { selected, setSelected, selectedAll, setSelectedAll, fetchUserData }
}
