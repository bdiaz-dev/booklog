import { useEffect, useState } from "react"
import { ratingSvgEmojis } from '@/lib/constants'
import { motion } from 'framer-motion'
import { useFeedback } from '@/hooks/useFeedback'
import { UserBook } from '@/lib/types/types'

export interface FeedbackProps {
  book: UserBook
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>
  setIsDeleting: (isDeleting: boolean) => void
  isGoogleSearch?: boolean
  handleError?: (() => void) | null
}

export default function Feedback({ book, setShowFeedback, setIsDeleting, isGoogleSearch = false, handleError = null }: FeedbackProps) {
  const [feedback, setFeedback] = useState(!!book.rating ? book.rating : "")
  const [readedToday, setReadedToday] = useState(true)
  const [readedDate, setReadedDate] = useState(new Date().toISOString().split("T")[0])
  const [message, setMessage] = useState("")
  const { handleFeedback, isLoading } = useFeedback(isGoogleSearch, handleError)

  useEffect(() => {
    if (book.isRead) {
      const actualDate = new Date(book.readedDate ?? new Date()).toISOString().split("T")[0]
      setReadedDate(actualDate)
      setReadedToday(false)
    }
  }, [book])

  return (
    <motion.div
      key="feddback-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='feedback-modal'
    >
      <motion.div
        key="feedback"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        className="feedback-modal-content"
      >

        <span className="close" onClick={() => setShowFeedback(false)}>&times;</span>
        <h2>¿Te ha gustado?</h2>
        {/* <br /> */}
        <div className='feedback-modal-buttons'>
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
        <div className='feedback-modal-date'>
          <input type="checkbox" name="readedToday" id="readedToday" checked={readedToday} onChange={() => setReadedToday(!readedToday)} />
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
        <div className='feedback-modal-send'>
          <button className='button primary' onClick={() => handleFeedback({book, response: feedback, readedDate, setShowFeedback})}>
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
          <button className='button danger' onClick={() => setShowFeedback(false)}>
            Cancelar
          </button>
        </div>
      </motion.div>

    </motion.div>
  )
}
