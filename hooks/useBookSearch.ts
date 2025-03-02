import { useState } from "react"

export function useBookSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      const data = await response.json()
      setSearchResults(data.items || [])
    } catch (error) {
      console.error("Error searching books:", error)
      setSearchResults([])
    }
    setIsLoading(false)
  }

  return { searchTerm, setSearchTerm, searchResults, isLoading, handleSearch }
}
