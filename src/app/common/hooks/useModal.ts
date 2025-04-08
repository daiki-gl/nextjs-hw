import { useState } from 'react'

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    console.log('clicked')
    setIsOpen(true)
  }
  const closeModal = () => setIsOpen(false)

  return { isOpen, openModal, closeModal }
}
