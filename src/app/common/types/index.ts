export interface UserData {
  name: string
  phone: string
  address: string
  status: boolean
}

export interface ButtonProps {
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  outline?: boolean
  noDeco?: boolean
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
