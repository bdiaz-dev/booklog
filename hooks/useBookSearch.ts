import { useState } from "react"

export function useBookSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [bookDetails, setBookDetails] = useState<any>(null)

  const handleSearch = async (e: React.FormEvent) => {
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

  const searchBookById = async (bookId: string) => {
    setIsLoading(true)
    try {
      console.log(bookId)
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching book details:", error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { searchTerm, setSearchTerm, searchResults, isLoading, handleSearch, searchBookById }
}
