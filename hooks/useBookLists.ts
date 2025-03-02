import { useState, useEffect } from "react"

export function useBookLists() {
  const [booksReading, setBooksReading] = useState(new Set())
  const [booksReaded, setBooksReaded] = useState(new Set())

  useEffect(() => {
    const fetchReadingList = async () => {
      try {
        const response = await fetch("/api/books/get-reading-list")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        setBooksReading(new Set(data))
      } catch (error) {
        console.error("Error fetching reading list:", error)
        setBooksReading(new Set())
      }
    }

    const fetchReadedList = async () => {
      try {
        const response = await fetch("/api/books/get-readed-list")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        setBooksReaded(new Set(data))
      } catch (error) {
        console.error("Error fetching readed list:", error)
        setBooksReaded(new Set())
      }
    }

    fetchReadingList()
    fetchReadedList()
  }, [])

  return { booksReading, booksReaded, setBooksReading, setBooksReaded }
}
