import { useState } from 'react'

/*
  モーダルの開閉用
  @returns isOpen 開いているかのチェック
  @returns setIsOpen isOpenのtrue/false更新用関数
  @returns closeModal モーダルを閉じる関数
*/
export default function useModal() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => setIsOpen(false)

  return { isOpen, openModal, closeModal }
}
