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

// ローカルストレージのキーを定義
const SELECTED_USERS_STORAGE_KEY = 'globalSelectedUsers'

export default function useSelected(
  searchResult: UserData[] | null
): UseSelectedReturn {
  //ステートの初期値をローカルストレージから読み込む
  const [selected, setSelected] = useState<{ [userId: number]: boolean }>(
    () => {
      if (typeof window !== 'undefined') {
        // ブラウザ環境でのみ実行
        const storedSelected = localStorage.getItem(SELECTED_USERS_STORAGE_KEY)
        if (storedSelected) {
          try {
            return JSON.parse(storedSelected)
          } catch (e) {
            console.error(
              'Failed to parse stored selected users from local storage:',
              e
            )
            localStorage.removeItem(SELECTED_USERS_STORAGE_KEY) // パースエラーの場合は削除
          }
        }
      }
      return {}
    }
  )

  //ステートが変更されたらローカルストレージに保存する
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SELECTED_USERS_STORAGE_KEY, JSON.stringify(selected))
    }
  }, [selected])

  useEffect(() => {
    if (searchResult) {
      setSelected((prevSelected) => {
        const newSelected: { [userId: number]: boolean } = {}
        // 現在の検索結果に含まれるユーザーについて、既存の選択状態を適用
        searchResult.forEach((user) => {
          newSelected[user.id] = prevSelected[user.id] || false
        })

        return newSelected
      })
    } else {
      setSelected({})
    }
  }, [searchResult])

  const toggleUserSelection = (userId: number, isChecked: boolean) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [userId]: isChecked,
    }))
  }

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

  const clearAllSelections = () => {
    setSelected({})
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SELECTED_USERS_STORAGE_KEY) // ストレージからも削除
    }
  }

  // UserList で計算する selectedAllForCurrentPage はダミー値
  const selectedAllForCurrentPage = false

  return {
    selected,
    selectedAllForCurrentPage,
    toggleUserSelection,
    toggleSelectAllCurrentPage,
    clearAllSelections,
  }
}
