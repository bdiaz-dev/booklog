import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface BookDataContextProps {
  readedList: any[]
  setReadedList: React.Dispatch<React.SetStateAction<any[]>>
  readingList: any[]
  setReadingList: React.Dispatch<React.SetStateAction<any[]>>
  useStateOfBook: (book: any) => { readedBook: any, readingBook: any }
  readedCount: number
  readingCount: number
  loading: boolean
  error: string | null
}

const BookDataContext = createContext<BookDataContextProps | undefined>(undefined)

export const BookDataProvider = ({ children }: { children: ReactNode }) => {
  const [readedList, setReadedList] = useState<any[]>([])
  const [readingList, setReadingList] = useState<any[]>([])
  const [readedCount, setReadedCount] = useState<number>(0)
  const [readingCount, setReadingCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  const useStateOfBook = (book: any) => {
    const readedBook =
    readedList.find(b => b.googleId === book.id)
    || readedList.find(b => b.googleId === book.googleId)
    || null
  const readingBook =
    readingList.find(b => b.googleId === book.id)
    || readingList.find(b => b.googleId === book.googleId)
    || null
    return { readedBook, readingBook }
  }

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch("/api/books/get-books")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setReadedList(data.readedList)
        setReadingList(data.readingList)
        setReadedCount(data.readedCount)
        setReadingCount(data.readingCount)
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error))
      } finally {
        setLoading(false)
      }
    }

    fetchBookData()
  }, [])

  return (
    <BookDataContext.Provider
      value={{
        readedList,
        setReadedList,
        readingList,
        setReadingList,
        readedCount,
        readingCount,
        useStateOfBook,
        loading,
        error
      }}>
      {children}
    </BookDataContext.Provider>
  )
}

export const useBookData = () => {
  const context = useContext(BookDataContext)
  if (context === undefined) {
    throw new Error("useBookData must be used within a BookDataProvider")
  }
  return context
}
