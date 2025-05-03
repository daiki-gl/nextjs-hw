export interface UserData {
  id: number
  name: string
  phone: string
  address: string
  status: boolean
  payment: string
}

export interface ButtonProps {
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  outline?: boolean
  noDeco?: boolean
  type?: 'button' | 'submit' | 'reset'
}
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface useSelectType {
  selectedAll: boolean | 'indeterminate'
  setSelectedAll: (value: boolean | 'indeterminate') => void
  setSelected: (value: boolean[]) => void
  selected: boolean[]
}

export interface ShowDataContextType {
  showAddUserData: UserData[]
  setShowAddUserData: React.Dispatch<React.SetStateAction<UserData[]>>
}

export interface TypeContextType {
  type: string | null
  setType: React.Dispatch<React.SetStateAction<string | null>>
}

export interface SearchResultContextType {
  searchResult: UserData[] | null
  setSearchResult: React.Dispatch<React.SetStateAction<UserData[]>>
}
