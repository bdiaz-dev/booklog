import React from 'react'
import useGetOneBookData from '@/hooks/useGetOneBookData'
import { placeholderImg, ratingEmojis } from '@/lib/constants'
import useUsersRatings from '@/hooks/useUsersRatings'
import { AnimatePresence, motion } from 'framer-motion'
import { Mosaic, OrbitProgress } from 'react-loading-indicators'
import Loading from '../Loading'


interface InfoModalProps {
  book: Book
  setShowInfo: (show: boolean) => void
}

export default function InfoModal({ book, setShowInfo }: InfoModalProps) {
  const { formatedBookData, isLoading } = useGetOneBookData(book)
  const bookId = !!book.userId ? book.googleId : book.id
  const { ratings } = useUsersRatings(bookId)

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
        <span className="close" onClick={() => setShowInfo(false)}>&times;</span>
        <div className="info-modal-body">
          <div className="info-modal-image">
            <img src={formatedBookData.image || placeholderImg} alt="Book cover" />
          </div>
          <div className="info-modal-info">
            <h3 className='info-modal-info-title'>{formatedBookData.title}</h3>
            <h4 className='info-modal-info-author'>{formatedBookData.autor}</h4>
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
