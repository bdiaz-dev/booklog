import React, { useState } from 'react'
import useGetOneBookData from '@/hooks/useGetOneBookData'
import { placeholderImg, ratingEmojis } from '@/lib/constants'
import useUsersRatings from '@/hooks/useUsersRatings'
import { AnimatePresence, motion } from 'framer-motion'
import { Mosaic, OrbitProgress } from 'react-loading-indicators'
import Loading from '../Loading'
import { useBookData } from '@/context/BookDataContext'
import { useBookActions } from '@/hooks/useBookActions'
import Feedback from '../Feedback'


interface InfoModalProps {
  book: Book
  setShowInfo: (show: boolean) => void
}

export default function InfoModal({ book, setShowInfo }: InfoModalProps) {
  const { formatedBookData, isLoading } = useGetOneBookData(book)
  const bookId = !!book.userId ? book.googleId : book.id
  const { ratings } = useUsersRatings(bookId)

  const [isActionLoading, setIsActionLoading] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const { useStateOfBook, loading, error } = useBookData()
  const { readedBook, readingBook } = useStateOfBook(book)
  // const { ratings } = useUsersRatings(book.id)
  //estoy evitando enviar setShowError a useBookActions (arreglar)
  const { handleAddBookClick, handleRemoveBookClick, handleError, isDeleting, setIsDeleting } = useBookActions(() => { })

  if (isLoading) return (
    <Loading setModal={() => { setShowInfo(false) }} />
  )

  if (!formatedBookData) return (
    <div className='modal-message'>
      <img width='100px' height='100px' src='/danger.svg' alt="" />
      <span>
        No se encontraron datos del libro.
      </span>
      <button
        className='button danger'
        onClick={() => { setShowInfo(false) }}
      >
        Salir
      </button>
    </div>)

  return (
    <motion.div
      key="modal-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='info-modal'
    >
      <motion.div
        key="modal"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        className="info-modal-content"
      >
        <AnimatePresence>
              // poner modal confirmando que se ha marcado como leido
          {showFeedback && <Feedback book={readingBook} setShowFeedback={setShowFeedback} setIsDeleting={setIsDeleting} />}
        </AnimatePresence>
        <span className="close" onClick={() => setShowInfo(false)}>&times;</span>
        <div className="info-modal-body">
          <div className="info-modal-image">
            <img src={formatedBookData.image || placeholderImg} alt="Book cover" />
          </div>
          <div className="info-modal-info">
            <h3 className='info-modal-info-title'>{formatedBookData.title}</h3>
            <h4 className='info-modal-info-author'>{formatedBookData.autor}</h4>
            {readingBook &&
              <span className='book-item-user-info'>
                📚 Añadido el: {new Date(readingBook.addedDate).toLocaleDateString('es-ES')}
              </span>}
            {readedBook &&
              <span className='book-item-user-info'>
                ✅ Leído el: {new Date(readedBook.readedDate).toLocaleDateString('es-ES')}
                {readedBook.rating && <span style={{ fontSize: "1.5em" }}>{ratingEmojis[readedBook.rating]}</span>}
              </span>}
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
                      onClick={() => handleAddBookClick(book, setIsActionLoading)}
                      className="button secondary"
                      style={{ backgroundColor: isActionLoading ? "#808080" : "" }}
                      disabled={isActionLoading}
                    >
                      {isActionLoading ? "Añadiendo..." : "Añadir a la lista"}
                    </button>
                  )
                  )}
              </>

              {(!!readedBook || !!readingBook) && (
                <button
                  onClick={() => handleRemoveBookClick(!!book.volumeInfo ? book.id : book.googleId, setIsActionLoading)}
                  className="button danger"
                  style={{ backgroundColor: isActionLoading ? "#808080" : "" }}
                  disabled={isActionLoading}
                >
                  {isActionLoading ? 'Quitando...' : 'Eliminar'}
                </button>
              )}
            </div>
            <div className='info-modal-info-description' dangerouslySetInnerHTML={{ __html: formatedBookData.description }} />
            <p className='info-modal-info-categories'><span>* Categorias: </span>{formatedBookData.categories}</p>
            <div className='info-modal-info-details'>
              <div>
                <h5>Páginas</h5>
                <p>{formatedBookData.pages}</p>
              </div>
              <div>
                <h5>Editorial</h5>
                <p>{formatedBookData.publisher}</p>
              </div>
              <div>
                <h5>ISBN</h5>
                <p>{formatedBookData.isbn}</p>
              </div>
              <div>
                <h5>Fecha de publicación</h5>
                <p>{formatedBookData.publishedDate}</p>
              </div>
            </div>
            <h3 className='info-modal-rating-title'>Valoración de los usuarios</h3>
            <div className="info-modal-rating">
              <div>
                <span>{`${ratingEmojis.wonderfull}  ${ratings.wonderfull}`}</span>
              </div>
              <div>
                <span>{`${ratingEmojis.like}  ${ratings.like}`}</span>
              </div>
              <div>
                <span>{`${ratingEmojis.normal}  ${ratings.normal}`}</span>
              </div>
              <div>
                <span>{`${ratingEmojis.dislike}  ${ratings.dislike}`}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
