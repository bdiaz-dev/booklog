"use client"

import React, { useState } from "react"
import { placeholderImg, ratingEmojis, ratingSvgEmojis } from '@/lib/constants'
import Feedback from './Feedback'
import ErrorAlert from './ErrorAlert'
import { useBookActions } from '../hooks/useBookActions'
// import { Book } from '@/interfaces'
import { useBookData } from '@/context/BookDataContext'
import InfoModal from './info-modal/InfoModal'
import useUsersRatings from '@/hooks/useUsersRatings'
import { AnimatePresence, motion } from 'framer-motion'
import { img } from 'framer-motion/client'

// interface BookItemProps { book: Book }

export default function BookItem({ book, isSearch = false }: { book: any, isSearch?: boolean }) {

  const [showInfo, setShowInfo] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const { useStateOfBook, loading, error } = useBookData()
  const { readedBook, readingBook } = useStateOfBook(book)
  // const { ratings } = useUsersRatings(book.id)
  const { handleAddBookClick, handleRemoveBookClick, handleError, isDeleting, setIsDeleting } = useBookActions(setShowError)

  return (
    <AnimatePresence>
      {!isDeleting && (
        <motion.div
          className='li'
          style={{ overflow: "hidden" }}
          layout={!isSearch}
          key={book.id}
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            key={book.id + "item"}
            layout={!isSearch}
            // initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.3 }}
            className='book-item'
          >
            <AnimatePresence>
              {showInfo && <InfoModal book={book} setShowInfo={setShowInfo} />}
            </AnimatePresence>
            {showError && <ErrorAlert />}
            <AnimatePresence>
              // poner modal confirmando que se ha marcado como leido
              {showFeedback && <Feedback book={!!readingBook ? readingBook : readedBook} setShowFeedback={setShowFeedback} setIsDeleting={setIsDeleting} />}
            </AnimatePresence>
            <div className='book-item-img'>
              <img onClick={() => setShowInfo(!showInfo)} src={book.thumbnail || book.volumeInfo?.imageLinks?.thumbnail || placeholderImg} alt={book.title || book.volumeInfo?.title} />
            </div>
            <div>
              <div className="book-item-info">
                <span className="book-item-info-title" onClick={() => setShowInfo(!showInfo)}>{book.title || book.volumeInfo?.title}</span>
                <span className="book-item-info-author">{book.author || (book.volumeInfo?.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido")}</span>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="button info"
                >
                  + Info
                </button>
                {readingBook &&
                    <span className='book-item-user-info'>
                    📚 Añadido el: {new Date(readingBook.addedDate).toLocaleDateString('es-ES')}
                    </span>}
                {readedBook &&
                    <span className='book-item-user-info'>
                    ✅ Leído el: {new Date(readedBook.readedDate).toLocaleDateString('es-ES')}
                    {readedBook.rating && 
                    <img src={ratingSvgEmojis[readedBook.rating]} alt="ratingEmoji" />}
                    {/* <span style={{ fontSize: "1.5em" }}>{ratingEmojis[readedBook.rating]}</span>} */}
                    </span>}
              </div>
              <div className="book-item-actions">
                <>
                  {readingBook
                    ? <button
                      onClick={() => setShowFeedback(true)}
                      className="button secondary"
                    >
                      Marcar como leído
                    </button>
                    : (!readedBook && (
                      <button
                        onClick={() => handleAddBookClick(book, setIsLoading)}
                        className="button secondary"
                        style={{ backgroundColor: isLoading ? "#808080" : "" }}
                        disabled={isLoading}
                      >
                        {isLoading ? "Añadiendo..." : "Añadir a la lista"}
                      </button>
                    )
                    )}
                </>
                
                {!!readedBook &&
                <button
                  onClick={() => setShowFeedback(true)}
                  className="button primary"
                >
                  Editar
                  </button>
                  }

                {(!!readedBook || !!readingBook) && (
                  <button
                    onClick={() => handleRemoveBookClick(!!book.volumeInfo ? book.id : book.googleId, setIsLoading)}
                    className="button danger"
                    style={{ backgroundColor: isLoading ? "#808080" : "" }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Quitando...' : 'Eliminar'}
                  </button>
                )}
              </div>

            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
