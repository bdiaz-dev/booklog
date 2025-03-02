import React, { useState, useEffect } from "react"
import { useBookLists } from "@/hooks/useBookLists"
import { useAddBook } from "@/hooks/useAddBook"
import { useRemoveBook } from "@/hooks/useRemoveBook"
import { placeholderImg } from '@/lib/constants'

export default function BookElement({ book, booksReading, booksReaded, setBooksReaded, setBooksReading }) {

  // const { booksReading, booksReaded, setBooksReaded, setBooksReading } = useBookLists()
  const { handleAddBook } = useAddBook()
  const { handleRemoveBook } = useRemoveBook()
  const [onListButtonText, setOnListButtonText] = useState("En la lista de Lectura")
  const [isLoading, setIsLoading] = useState(false)

  const handleRemoveBookClick = async (bookid) => {
    setIsLoading(true)
    await handleRemoveBook(bookid)
    const newBooksReading = new Set(booksReading)
    newBooksReading.delete(bookid)
    setBooksReading(newBooksReading)
    setIsLoading(false)
  }
  const handleAddBookClick = async (book) => {
    setIsLoading(true)
    await handleAddBook(book)
    const newBooksReading = new Set(booksReading)
    newBooksReading.add(book.id)
    setBooksReading(newBooksReading)
    setIsLoading(false)
  }

  return (
    <div key={book.id}>
      <div className="book-info">
        <span><img src={book.volumeInfo.imageLinks?.thumbnail || placeholderImg} alt="" /></span>
        <br />
        <span className="book-title">{book.volumeInfo.title}</span>
        <br />
        <span className="book-author">
          {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido"}
        </span>
      </div>
      {booksReading.has(book.id) ? (
        <button
          onClick={() => handleRemoveBookClick(book.id)}
          onMouseEnter={() => setOnListButtonText("Quitar de la lista de Lectura")}
          onMouseLeave={() => setOnListButtonText("En la lista de Lectura")}
          className="button primary"
          style={{ backgroundColor: isLoading ? "#808080" : "" }}
          disabled={isLoading}
        >
          {isLoading ? 'Quitando...' : onListButtonText}
        </button>
      ) : (
        <button
          onClick={() => handleAddBookClick(book)}
          className="button secondary"
          style={{ backgroundColor: isLoading ? "#808080" : "" }}
          disabled={isLoading}
        >
          {isLoading ? "Añadiendo..." : "Añadir a la lista"}
        </button>
      )}
      {booksReaded.has(book.id) && <span className="book-readed">Leído</span>}
    </div>
  )
}
