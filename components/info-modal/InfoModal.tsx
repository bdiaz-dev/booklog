import React from 'react'
import useGetOneBookData from '@/hooks/useGetOneBookData'
import { placeholderImg, ratingEmojis } from '@/lib/constants'
import useUsersRatings from '@/hooks/useUsersRatings'
import { AnimatePresence, motion } from 'framer-motion'
import { OrbitProgress } from 'react-loading-indicators'


interface InfoModalProps {
  book: Book
  setShowInfo: (show: boolean) => void
}

export default function InfoModal({ book, setShowInfo }: InfoModalProps) {
  const { formatedBookData, isLoading, setIsLoading } = useGetOneBookData(book)
  const bookId = !!book.userId ? book.googleId : book.id
  const { ratings } = useUsersRatings(bookId)

  if (isLoading) return (
    <motion.div
      key="modal-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='modal-message'
    >
      <div>
        <OrbitProgress dense color="#3b82f6" size="small" text="" textColor="" />
      </div>
      <span>
        Cargando...
      </span>
      <button
        className='button danger'
        onClick={() => { setShowInfo(false) }}
      >
        Cancelar
      </button>
    </motion.div>
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
        <span className="close" onClick={() => setShowInfo(false)}>&times;</span>
        <h2>Información del libro</h2>
        <div className="info-modal-body">
          <div className="info-modal-image">
            <img src={formatedBookData.image || placeholderImg} alt="Book cover" />
          </div>
          <div className="info-modal-info">
            <h3>Titulo</h3>
            <p>{formatedBookData.title}</p>
            <h3>Autor</h3>
            <p>{formatedBookData.autor}</p>
            <h3>Descripción</h3>
            <div dangerouslySetInnerHTML={{ __html: formatedBookData.description }} />
            <h3>Fecha de publicación</h3>
            <p>{formatedBookData.publishedDate}</p>
            <h3>Editorial</h3>
            <p>{formatedBookData.publisher}</p>
            <h3>Páginas</h3>
            <p>{formatedBookData.pages}</p>
            <h3>ISBN</h3>
            <p>{formatedBookData.isbn}</p>
            <h3>Categorías</h3>
            <p>{formatedBookData.categories}</p>
            <h3>Valoración de los usuarios</h3>
            <div className="info-modal-rating">
              <div>
                <span>{`${ratingEmojis.like} : ${ratings.like}`}</span>
              </div>
              <div>
                <span>{`${ratingEmojis.normal} : ${ratings.normal}`}</span>
              </div>
              <div>
                <span>{`${ratingEmojis.dislike} : ${ratings.dislike}`}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
