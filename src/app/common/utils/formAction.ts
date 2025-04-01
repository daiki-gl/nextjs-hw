import { UserData } from '../types'

export const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  userData: UserData[] | null,
  setShowUserData: (value: React.SetStateAction<UserData[]>) => void
) => {
  event.preventDefault()
  const form = event.currentTarget
  const nameInput = form.elements.namedItem('name') as HTMLInputElement
  const phoneInput = form.elements.namedItem('phone') as HTMLInputElement
  const addressInput = form.elements.namedItem('address') as HTMLInputElement
  const nameValue = nameInput.value
  const phoneValue = phoneInput.value
  const addressValue = addressInput.value

  if (userData) {
    const filteredData = userData.filter((user: UserData) => {
      const nameMatch = user.name.includes(nameValue)
      const phoneMatch = user.phone.includes(phoneValue)
      const addressMatch = user.address.includes(addressValue)
      return nameMatch && phoneMatch && addressMatch
    })
    setShowUserData(filteredData)
    return
  }
}
