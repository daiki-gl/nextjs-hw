import React, { SetStateAction, useEffect, useState } from 'react'
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
export default function useSelected(
  showUserData: UserData[] | null,
  showAddUserData: UserData[]
) {
  const [selected, setSelected] = useState<boolean[]>([])
  const [selectedAll, setSelectedAll] = useState<boolean | 'indeterminate'>(
    false
  )

  /*
  showUserDataの更新時にselectedのcheckの有無の確認と更新
  */
  useEffect(() => {
    if (showUserData && showUserData.length > 0) {
      // ✅ showAddUserData に含まれているかどうかでチェック状態を初期化
      const newSelected = showUserData.map((user) =>
        showAddUserData.some((addedUser) => addedUser.id === user.id)
      )
      setSelected(newSelected)
    } else {
      setSelected([])
    }
  }, [showUserData, showAddUserData])

  /*
  selectedAllをtrue/falseに更新
  */
  function handleSelectAll(
    selected: boolean[],
    showUserData: UserData[],
    setSelectedAll: React.Dispatch<SetStateAction<boolean | 'indeterminate'>>
  ) {
    const selectedResult = selected.filter((select: boolean) => select == true) // trueのユーザーをfilter
    if (
      showUserData.length > 0 &&
      selectedResult.length == showUserData?.length
    ) {
      setSelectedAll(true)
    } else {
      setSelectedAll(false)
    }
  }
  useEffect(() => {
    if (showUserData !== null) {
      handleSelectAll(selected, showUserData, setSelectedAll)
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

  /*
  selectedを指定し、addページに遷移した時にselectedを保持したユーザーを取得
  @param id ユーザーID
  */
  function handleAddUser(
    id: number,
    setAddUserData: React.Dispatch<SetStateAction<UserData[] | null>>
  ) {
    const user = showUserData?.find((user) => user.id === id)
    setAddUserData((prev) => {
      if (prev && user) {
        return [...prev, user]
      }
      return prev
    })
  }

  return {
    selected,
    setSelected,
    selectedAll,
    setSelectedAll,
    fetchUserData,
    handleSelectAll,
    handleAddUser,
  }
}
