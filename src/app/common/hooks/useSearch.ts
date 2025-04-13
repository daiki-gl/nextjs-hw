import { useState } from 'react'

export function useSearch() {
  const [query, setQuery] = useState('')
  const handleSearch = () => {}

  return { query, setQuery, handleSearch }
}
