import { useState } from 'react'

export function useSearch() {
  const [query, setQuery] = useState('')
  const handleSearch = () => {
    // console.log('Searching for:', query)
  }

  return { query, setQuery, handleSearch }
}
