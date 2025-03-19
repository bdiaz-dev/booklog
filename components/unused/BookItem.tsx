import React, { useState } from "react"
import { useBookActions } from '../hooks/useBookActions'
import Feedback from './Feedback'
import ErrorAlert from './ErrorAlert'
import { ratingEmojis, placeholderImg } from '@/lib/constants'

export default function BookItem({ book, isReadingList, isSearchResult }) {
  const { updateBooksReaded, handleAddBookClick, handleRemoveBookClick } = useBookActions()
  const [isLoading, setIsLoading] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showError, setShowError] = useState(false)
  const [onListButtonText, setOnListButtonText] = useState("En la lista de Lectura")

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
      {showFeedback && <Feedback bookid={book.id} setShowFeedback={setShowFeedback} updateBooksReaded={() => updateBooksReaded(book.id)} handleError={handleError} />}
      <div className="book-info">
        <span><img src={book.thumbnail || book.volumeInfo?.imageLinks?.thumbnail || placeholderImg} alt={book.title || book.volumeInfo?.title} /></span>
        <br />
        <span className="book-title">{book.title || book.volumeInfo?.title}</span>
        <br />
        <span className="book-author">
          {book.author || (book.volumeInfo?.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido")}
        </span>
        <br />
        {isReadingList && <span>Añadido el: {new Date(book.addedDate).toLocaleDateString()}</span>}
        {!isReadingList && !isSearchResult && <span>Leído el: {new Date(book.readedDate).toLocaleDateString()}</span>}
        {!isReadingList && !isSearchResult && book.rating && <span style={{ fontSize: "1.5em" }}>{ratingEmojis[book.rating]}</span>}
      </div>
      {isReadingList ? (
        <button
          onClick={() => setShowFeedback(true)}
          className="button secondary"
        >
          Marcar como leído
        </button>
      ) : (
        isSearchResult ? (
          <button
            onClick={() => handleAddBookClick(book, setIsLoading, handleError)}
            className="button secondary"
            style={{ backgroundColor: isLoading ? "#808080" : "" }}
            disabled={isLoading}
          >
            {isLoading ? "Añadiendo..." : "Añadir a la lista"}
          </button>
        ) : (
          <button
            onClick={() => handleRemoveBookClick(book.id, setIsLoading, handleError)}
            className="button danger"
            style={{ backgroundColor: isLoading ? "#808080" : "" }}
            disabled={isLoading}
          >
            {isLoading ? 'Quitando...' : 'Eliminar'}
          </button>
        )
      )}
    </div>
  )
}
