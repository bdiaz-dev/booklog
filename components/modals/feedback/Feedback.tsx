import { useEffect, useState } from "react"
import { ratingSvgEmojis } from '@/lib/constants'
import { motion } from 'framer-motion'
import { useFeedback } from '@/hooks/useFeedback'
import { UserBook } from '@/lib/types/types'
import { useIsMobile } from '@/hooks/use-mobile'
import { useBookItemContext } from "@/context/BookItemContext";
import DateComponent from './parts/DateComponent'
import MarkingComponent from './parts/MarkingComponent'
import CloseModal from '../generalParts/CloseModal'


export interface FeedbackProps {
  book: UserBook
  isGoogleSearch?: boolean
  handleError?: (() => void) | null
}

export default function Feedback({ book, isGoogleSearch = false, handleError = null }: FeedbackProps) {

  const { setShowFeedback } = useBookItemContext();
  const [feedback, setFeedback] = useState(!!book.rating ? book.rating : "")
  const isMobile = useIsMobile()
  const {
    handleFeedback,
    isLoading,
    isReaded,
    setIsReaded,
    readedToday,
    setReadedToday,
    readedDate,
    setReadedDate,
    isStarted,
    setIsStarted,
    startedToday,
    setStartedToday,
    startedDate,
    setStartedDate,
  } = useFeedback(book, isGoogleSearch, handleError)

  const isDisabled = isLoading ||
    (!isReaded && !isStarted) ||
    (!isReaded && book.isRead) ||
    (!isStarted && book.isStarted)

  return (
    <motion.div
      key={`${book.id}feedback-modal-container`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='feedback-modal'
    >
      <motion.div
        key={`${book.id}feedback-modal`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        className="feedback-modal-content"
        layout
      >

        {/* --  close button  -- */}
        <CloseModal closeModal={() => setShowFeedback(false)} />

        <h3>
          <span>{book.title}</span>
        </h3>
        <h4>¿Lo has empezado o terminado?</h4>

        <MarkingComponent
          isMarkedOnBook={book.isStarted}
          isMarked={isStarted}
          setIsMarked={setIsStarted}
          markName="markIsStarted"
        />
        <br />
        {isStarted && (
          <DateComponent
            checkToday={startedToday}
            setToday={setStartedToday}
            customDate={startedDate}
            setCustomDate={setStartedDate}
          />
        )}

        <hr />

        <MarkingComponent
          isMarkedOnBook={book.isRead}
          isMarked={isReaded}
          setIsMarked={setIsReaded}
          markName="markIsReaded"
        />


        {isReaded && (
          <>
            <DateComponent
              checkToday={readedToday}
              setToday={setReadedToday}
              customDate={readedDate}
              setCustomDate={setReadedDate}
            />

            <span className='feedback-modal-rating-title'>¿Que te ha parecido? Elige una opción:</span>
            <div className='feedback-modal-rating-buttons' data-ismobile={isMobile}>
              {(["wonderfull", "like", "normal", "dislike"] as Array<keyof typeof ratingSvgEmojis>).map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFeedback(rating)}
                  className="emoji-button"
                  data-selected={feedback === rating}
                  data-discarted={!!feedback && feedback !== rating}
                >
                  <img src={ratingSvgEmojis[rating]} alt={`${rating}Emoji`} />
                </button>
              ))}

            </div>

          </>
        )}

        <div className='feedback-modal-send'>
          <button
            className={`button ${isDisabled ? 'disabled' : 'secondary'}`}
            disabled={isDisabled}
            onClick={() => handleFeedback({response: feedback, setShowFeedback})}
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
          <button
            className='button danger'
            onClick={() => setShowFeedback(false)}
          >
            Cancelar
          </button>
        </div>
      </motion.div>

    </motion.div>
  )
}
