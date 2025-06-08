import { useState, useEffect } from 'react'
import { UserData } from '../types'

interface UseSelectedReturn {
  selected: { [userId: number]: boolean }
  selectedAllForCurrentPage: boolean
  toggleUserSelection: (userId: number, isChecked: boolean) => void
  toggleSelectAllCurrentPage: (
    checked: boolean,
    currentPageUsers: UserData[] | null
  ) => void
  clearAllSelections: () => void
}

export default function useSelected(
  searchResult: UserData[] | null
): UseSelectedReturn {
  const [selected, setSelected] = useState<{ [userId: number]: boolean }>({})

  // searchResult が変更されたら、選択状態を初期化または更新
  useEffect(() => {
    if (searchResult) {
      const initialSelected: { [userId: number]: boolean } = {}
      searchResult.forEach((user) => {
        // 既存の選択状態があれば引き継ぎ、なければ false に
        initialSelected[user.id] = selected[user.id] || false
      })
    } else {
      setSelected({})
    }
  }, [searchResult])

  // 個別のユーザーの選択状態をトグルする関数
  const toggleUserSelection = (userId: number, isChecked: boolean) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [userId]: isChecked,
    }))
  }

  // 現在のページ内の全ユーザーの選択状態を一括で切り替える関数
  const toggleSelectAllCurrentPage = (
    checked: boolean,
    currentPageUsers: UserData[] | null
  ) => {
    if (!currentPageUsers) return

    setSelected((prevSelected) => {
      const newSelected = { ...prevSelected }
      currentPageUsers.forEach((user) => {
        newSelected[user.id] = checked
      })
      return newSelected
    })
  }

  // すべての選択状態をクリアする関数
  const clearAllSelections = () => {
    setSelected({})
  }

  // 現在のページの「全選択」チェックボックスの状態を計算
  // ここではダミー値を返し、UserList で計算した値を使用
  const selectedAllForCurrentPage = false

  return {
    selected,
    selectedAllForCurrentPage,
    toggleUserSelection,
    toggleSelectAllCurrentPage,
    clearAllSelections,
  }
}
