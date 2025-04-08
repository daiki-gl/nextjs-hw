export interface UserData {
  id: number
  name: string
  phone: string
  address: string
  status: boolean
  payment: number
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
