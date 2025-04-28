"use client"

import React, { useState } from "react"
import { placeholderImg, ratingSvgEmojis } from '@/lib/constants'
import Feedback from '@/components/modals/feedback/Feedback'
import ErrorAlert from '@/components/interface/ErrorAlert'
import { useBookActions } from '@/hooks/useBookActions'
import { useBookData } from '@/context/BookDataContext'
import InfoModal from '@/components/modals/InfoModal'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import { useBookItemContext } from "@/context/BookItemContext";

export default function BookItemListMode({ book, isSearch = false }: { book: any, isSearch?: boolean }) {

  const {
    showInfo,
    setShowInfo,
    showDeleteModal,
    setShowDeleteModal,
    showFeedback,
    setShowFeedback,
    showError,
    setShowError,
    isDeleting,
  } = useBookItemContext();

  const [isLoading, setIsLoading] = useState(false)
  const { useStateOfBook, loading, error } = useBookData()
  const { readedBook, readingBook } = useStateOfBook(book)
  const isMobile = useIsMobile()
  const { handleAddBookClick, handleError } = useBookActions(setShowError)

  return (
    <AnimatePresence>

      {/* // DELETE MODAL */}
      {showDeleteModal &&
        <ConfirmDeleteModal
          title={book.title || book.volumeInfo?.title}
          key={`${book.id}-delete`}
        />}
      {/* // ------------- */}

      {/* // FEEDBACK MODAL */}
      {showFeedback &&
        <Feedback
          book={!!readingBook ? readingBook : readedBook}
          key={`${book.id}-feedback`}
        />}
      {/* // ------------- */}

      {/* // INFO MODAL */}
      {showInfo &&
        <InfoModal
          book={book}
          key={`${book.id}-info`}
        />}
      {/* // ------------- */}

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
            // layout={!isSearch}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.3 }}
            className='list-mode-book-item'
            data-ismobile={isMobile}
            onClick={() => setShowInfo(!showInfo)}
          >
            {showError && <ErrorAlert />}
            <div className='list-mode-book-item-img'>
              <img src={book.thumbnail || book.volumeInfo?.imageLinks?.thumbnail || placeholderImg} alt={book.title || book.volumeInfo?.title} />
            </div>
            <div>
              <div className="list-mode-book-item-info" data-ismobile={isMobile}>
                <span className="list-mode-book-item-info-title" >{book.title || book.volumeInfo?.title}</span>
                <span className="list-mode-book-item-info-author">{book.author || (book.volumeInfo?.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido")}</span>
                {/* <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="button info"
                >
                  I
                </button> */}
                <div className='list-mode-book-item-user-info'>
                  {readedBook?.isStarted &&
                    <span className='started'>
                      📖 {new Date(readedBook.startedDate).toLocaleDateString('es-ES')}
                    </span>}
                  {readingBook?.isStarted &&
                    <span className='started'>
                      📖 {new Date(readingBook.startedDate).toLocaleDateString('es-ES')}
                    </span>}
                  {readingBook &&
                    <span className='added'>
                      📚 {new Date(readingBook.addedDate).toLocaleDateString('es-ES')}
                    </span>}
                  {readedBook &&
                    <>
                      <span className='finished'>
                        ✅ {new Date(readedBook.readedDate).toLocaleDateString('es-ES')}
                      </span>
                      {readedBook.rating &&
                        <img src={ratingSvgEmojis[readedBook.rating as keyof typeof ratingSvgEmojis]} alt="ratingEmoji" />}
                    </>
                  }
                </div>
              </div>
              {/* <div className={`list-mode-book-item-actions ${isMobile ? "mobile" : ""}`}>
                <>
                  {readingBook
                    ? <button
                      onClick={() => setShowFeedback(true)}
                      className="button secondary"
                    >
                      Empezado / Leído
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
                    onClick={
                      () => setShowDeleteModal(true)
                    }
                    className="button danger"
                    style={{ backgroundColor: isLoading ? "#808080" : "" }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Quitando...' : 'Eliminar'}
                  </button>
                )}
              </div> */}

            </div>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
