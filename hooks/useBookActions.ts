import { useAddBook } from "@/hooks/useAddBook"
import { useRemoveBook } from "@/hooks/useRemoveBook"
import { useBookData } from '@/context/BookDataContext'
import { useState } from 'react'
import { GoogleBook, UserBook, UserBookActions } from '@/lib/types/types'

export const useBookActions = (setShowError: React.Dispatch<React.SetStateAction<boolean>>): UserBookActions => {
  const { readedList, setReadedList, readingList, setReadingList } = useBookData()
  const { handleAddBook } = useAddBook()
  const { handleRemoveBook } = useRemoveBook()
  const [isDeleting, setIsDeleting] = useState(false)
  
  const handleError = () => {
    setShowError(true)
    const temp = setTimeout(() => {
      setShowError(false)
      clearTimeout(temp)
    }, 3000)
  }

  const handleAddBookClick = async (book: UserBook, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    const formatedNewBook: UserBook = {
      addedDate: new Date().toISOString(),
      author: book.volumeInfo?.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido",
      googleId: book.id,
      isRead: false,
      rating: null,
      readedDate: null,
      thumbnail: book.volumeInfo?.imageLinks?.thumbnail || null,
      title: book.volumeInfo?.title || book.title,
      id: book.id
    }
    setIsLoading(true)
    try {
      const response = await handleAddBook(book)
      if (!response.ok) {
        throw new Error("Error adding book")
      }
      const newBooksReading = [...readingList, formatedNewBook]
      setReadingList(newBooksReading)
    } catch (error) {
      handleError()
      console.error("Error adding book:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveBookClick = async (bookid: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsLoading(true)
    setIsDeleting(true)
    try {
      const response = await handleRemoveBook(bookid)
      if (!response.ok) {
        throw new Error("Error removing book")
      }
      const newBooksReading = readingList.filter(b => b.googleId !== bookid)
      const newBooksReaded = readedList.filter(b => b.googleId !== bookid)
      setReadedList(newBooksReaded)
      setReadingList(newBooksReading)
    } catch (error) {
      handleError()
      console.error("Error removing book:", error)
    } finally {
      setIsLoading(false)
      setIsDeleting(false)
    }
  }

  return {
    handleAddBookClick,
    handleRemoveBookClick,
    handleError,
    isDeleting,
    setIsDeleting
  }
}
