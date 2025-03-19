import Feedback from '@/components/Feedback';
import { useRemoveBook } from '@/hooks/useRemoveBook';
import { useState } from 'react';
import { placeholderImg, ratingEmojis } from '@/lib/constants';
import { useBookActions } from '@/hooks/useBookActions';
import ErrorAlert from '../ErrorAlert';

export default function BookOnList({ book, isReadingList }) {
  const { handleAddBookClick, handleRemoveBookClick } = useBookActions()
  const [showFeedback, setShowFeedback] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const { handleRemoveBook } = useRemoveBook()

  const handleError = () => {
    setShowError(true)
    const temp = setTimeout(() => {
      setShowError(false)
      clearTimeout(temp)
    }, 3000)
  }

  return (
    <div className='book-on-list'>
      {showError && <ErrorAlert />}
      {showFeedback && <Feedback book={book} setShowFeedback={setShowFeedback} />}
      <div>
        <img src={book.thumbnail || placeholderImg} alt={book.title} />
      </div>
      <div>

        <div className="book-info">
          <span className="book-title">{book.title}</span>
          <span className="book-author">{book.author}</span>
          <br />
          <span>
            {isReadingList
              ? ` Añadido el: ${new Date(book.addedDate).toLocaleDateString()}`
              : ` Leído el: ${new Date(book.readedDate).toLocaleDateString()}`}
          </span>
          <span style={{ fontSize: "1.5em" }}>
            {isReadingList
              ? ""
              : book.rating && ` ${ratingEmojis[book.rating]}`}
          </span>
        </div>
        <div>
        </div>
        <div className="book-actions">
          {isReadingList && (
            <button onClick={
              () => setShowFeedback(true)
              // () => handleMarkAsRead(book.id)
            }
              className="button secondary">
              Marcar como leído
            </button>
          )}
          <button
            onClick={() => handleRemoveBookClick(book.googleId, setIsLoading, handleError)}
            className="button danger"
          >
            {isLoading ? 'Quitando...' : 'Quitar de la lista'}
          </button>
        </div>
      </div>

    </div>
  )
}
