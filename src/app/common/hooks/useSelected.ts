import { SetStateAction, useEffect, useState } from 'react'
import { UserData } from '../types'

/*
  ユーザーをidから検索
  @param setUserDetails ユーザーの詳細情報をsetする関数
  
  ユーザーのチェックボックス用
  @returns selected ユーザー毎のチェックボックスのcheckedの確認
  @returns selectedAll showUserDataのユーザー全体のcheckedの確認
  @returns setSelected selectedの更新用
  @returns setSelectedAll selectedAllの更新用
  */
export default function useSelected(showUserData: UserData[] | null) {
  const [selected, setSelected] = useState<boolean[]>([])
  const [selectedAll, setSelectedAll] = useState<boolean | 'indeterminate'>(
    false
  )

  /*
  showUserDataの更新時にselectedのcheckの有無の確認と更新
  */
  useEffect(() => {
    if (showUserData && showUserData.length > 0) {
      const newSelected = showUserData.map(() => false) //shoUserDataにfalseを割り当てている
      setSelected(newSelected)
    } else {
      setSelected([])
    }
  }, [showUserData])

  /*
  selectedAllをtrue/falseに更新
  */
  useEffect(() => {
    const selectedResult = selected.filter((select: boolean) => select == true) // trueのユーザーをfilter
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

  /*
  ユーザーをidから検索
  @param id ユーザーID
  @param setUserDetails ユーザーの詳細情報をsetする関数
  */
  function fetchUserData(
    id: number,
    setUserDetails: React.Dispatch<SetStateAction<UserData | undefined>>
  ): void {
    const user = showUserData?.find((user) => user.id === id)
    setUserDetails(user)
  }

  return { selected, setSelected, selectedAll, setSelectedAll, fetchUserData }
}
