"use client"

import React, { useState, useEffect, use } from "react"
import { placeholderImg } from '@/lib/constants'
import Feedback from './Feedback'
import ErrorAlert from './ErrorAlert'
import { useBookActions } from '../hooks/useBookActions'
import { useBookData } from '@/context/BookDataContext'
import { ratingEmojis } from '@/lib/constants'

export default function BookElement({ book }) {
  const { readedList, readingList, loading, error } = useBookData()
  const { handleAddBookClick, handleRemoveBookClick } = useBookActions()
  const [onListButtonText, setOnListButtonText] = useState("En la lista de Lectura")
  const [isLoading, setIsLoading] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showError, setShowError] = useState(false)
  // const [readedBook, setReadedBook] = useState(false)
  // const [readingBook, setReadingBook] = useState(false)
  
  // useEffect(() => {
  //   setReadedBook(readedList.find(b => b.googleId === book.id) ? true : false)
  //   setReadingBook(readingList.find(b => b.googleId === book.id) ? true : false)
  //   console.log("readingBook", readingBook)
  // }, [readedList, readingList])
  const readedBook = readedList.find(b => b.googleId === book.id) || null
  const readingBook = readingList.find(b => b.googleId === book.id) || null
  // console.log("readingBook", readingBook)

  const handleError = () => {
    setShowError(true)
    const temp = setTimeout(() => {
      setShowError(false)
      clearTimeout(temp)
    }, 3000)
  }

  return (
    <div key={book.id}>
      {showError && <ErrorAlert />}
      {showFeedback && <Feedback
        book={book}
        setShowFeedback={setShowFeedback}
        isGoogleSearch={true}
        // updateBooksReaded={updateBooksReaded}
        handleError={handleError} />}
      <div className="book-info">
        <span><img src={book.volumeInfo.imageLinks?.thumbnail || placeholderImg} alt="" /></span>
        <br />
        <span className="book-title">{book.volumeInfo.title}</span>
        <br />
        <span className="book-author">
          {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido"}
        </span>
      </div>
      {readingBook ? (
        <button
          onClick={() => handleRemoveBookClick(book.id, setIsLoading, handleError)}
          onMouseEnter={() => setOnListButtonText("Quitar de la lista de Lectura")}
          onMouseLeave={() => setOnListButtonText("En la lista de Lectura")}
          className="button primary"
          style={{ backgroundColor: isLoading ? "#808080" : "" }}
          disabled={isLoading}
        >
          {isLoading ? 'Quitando...' : onListButtonText}
        </button>
      ) : !readedBook && (
        <button
          onClick={() => handleAddBookClick(book, setIsLoading, handleError)}
          className="button secondary"
          style={{ backgroundColor: isLoading ? "#808080" : "" }}
          disabled={isLoading}
        >
          {isLoading ? "Añadiendo..." : "Añadir a la lista"}
        </button>
      )}
      <br />
      {
        readedBook
        ? (
          <span className="book-readed">
            {`Leído el: ${readedBook.readedDate} ${readedBook.rating ? ratingEmojis[readedBook.rating] : ""}`}
          </span>
        )
        : readingBook && !showFeedback && <button onClick={
          () => setShowFeedback(true)
        }
          className="button secondary">
          Marcar como leído
        </button>
      }
      {/* {readedList.some(b => b.googleId === book.id)
        ? <span className="book-readed">Leído</span>
        : readingList.some(b => b.googleId === book.id) && !showFeedback && <button onClick={
          () => setShowFeedback(true)
        }
          className="button secondary">
          Marcar como leído
        </button>
      } */}
    </div>
  )
}
