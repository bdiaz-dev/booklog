import { useEffect, useState } from "react"
import { ratingSvgEmojis } from '@/lib/constants'
import { motion } from 'framer-motion'
import { useFeedback } from '@/hooks/useFeedback'
import { UserBook } from '@/lib/types/types'
import { useIsMobile } from '@/hooks/use-mobile'
import { useBookItemContext } from "@/context/BookItemContext";


export interface FeedbackProps {
  book: UserBook
  isGoogleSearch?: boolean
  handleError?: (() => void) | null
}

export default function Feedback({ book, isGoogleSearch = false, handleError = null }: FeedbackProps) {
  
    const {
      setShowFeedback,
    } = useBookItemContext();
  
  const [isReaded, setIsReaded] = useState(!!book.isRead)
  const [readedToday, setReadedToday] = useState(true)
  const [readedDate, setReadedDate] = useState(new Date().toISOString().split("T")[0])
  const [feedback, setFeedback] = useState(!!book.rating ? book.rating : "")

  const [isStarted, setIsStarted] = useState(!!book.isStarted)
  const [startedToday, setStartedToday] = useState(true)
  const [startedDate, setStartedDate] = useState(new Date().toISOString().split("T")[0])

  // const [message, setMessage] = useState("")
  
  const isMobile = useIsMobile()
  const { handleFeedback, isLoading } = useFeedback(isGoogleSearch, handleError)

  useEffect(() => {
    if (book.isStarted) {
      const actualDate = new Date(book.startedDate ?? new Date()).toISOString().split("T")[0]
      setStartedDate(actualDate)
      setStartedToday(false)
    }
    if (book.isRead) {
      const actualDate = new Date(book.readedDate ?? new Date()).toISOString().split("T")[0]
      setReadedDate(actualDate)
      setReadedToday(false)
    }
  }, [book])

  useEffect(() => {
    if (isReaded && !isStarted) {
      setIsStarted(true)
    }
  }, [isReaded])

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
        <span
          className="close"
          onClick={() => setShowFeedback(false)}
        >
          &times;
        </span>

        <h3>
          <span>{book.title}</span>
        </h3>
        <h4>¿Lo has empezado o terminado?</h4>

        <div
          className={`button ${!book.isStarted ? (isStarted ? 'active' : 'primary') : 'disabled'}`}
          onClick={() => {
            if (!book.isStarted) { setIsStarted(!isStarted) }
          }}
        >
          <input
            type="checkbox"
            className='mark-checkbox'
            name="markIsStarted"
            id="markIsStarted"
            checked={isStarted}
            disabled={book.isStarted}
            onChange={() => setIsStarted(!isStarted)}
          />
          <span
            className='mark-label'
          >
            {"Empezado"}
          </span>
        </div>
        <br />
        {isStarted && (
          <div className='feedback-modal-date'>
            <input
              type="checkbox"
              name="startedToday"
              className='mark-checkbox'
              checked={startedToday}
              onChange={() => setStartedToday(!startedToday)}
            />
            <span>{"Usar fecha de hoy"}</span>
            {!startedToday && (
              <div className='feedback-modal-date-personal'>
                <input
                  type="date"
                  name="readedPersonalDate"
                  id="readedPersonalDate"
                  value={startedDate}
                  onChange={(e) => setStartedDate(e.target.value)}
                />
              </div>
            )}
          </div>
        )}

        <hr />


        <div
          className={`button ${!book.isRead ? (isReaded ? 'active' : 'primary') : 'disabled'}`}
          onClick={() => {
            if (!book.isRead) { setIsReaded(!isReaded) }
          }}
        >
          <input
            type="checkbox"
            className='mark-checkbox'
            name="markIsReaded"
            id="markIsReaded"
            checked={isReaded}
            disabled={book.isRead}
            onChange={() => setIsReaded(!isReaded)}
          />
          <span className='mark-label'>{"Leido"}</span>
        </div>


        {isReaded && (
          <>
            <div className='feedback-modal-date'>
              <input
                type="checkbox"
                name="readedToday"
                id="readedToday"
                className='mark-checkbox'
                checked={readedToday}
                onChange={() => setReadedToday(!readedToday)}
              />
              <span>{"Usar fecha de hoy"}</span>
              {!readedToday && (
                <div className='feedback-modal-date-personal'>
                  <input
                    type="date"
                    name="readedPersonalDate"
                    id="readedPersonalDate"
                    value={readedDate}
                    onChange={(e) => setReadedDate(e.target.value)}
                  />
                </div>
              )}
            </div>
            
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

          {(() => {
            const isDisabled = isLoading ||
              (!isReaded && !isStarted) ||
              (!isReaded && book.isRead) ||
              (!isStarted && book.isStarted)

            return (
              <button
                className={`button ${isDisabled ? 'disabled' : 'secondary'}`}
                disabled={isDisabled}
                onClick={() => handleFeedback({
                  book,
                  response: feedback,
                  isReaded,
                  startedDate,
                  readedDate,
                  setShowFeedback
                })}
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            );
          })()}

          <button className='button danger' onClick={() => setShowFeedback(false)}>
            Cancelar
          </button>

        </div>
      </motion.div>

    </motion.div>
  )
}
