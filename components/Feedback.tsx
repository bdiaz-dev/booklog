import { useEffect, useState } from "react"
import { useMarkAsRead } from '@/hooks/useMarkAsRead'
import { useRouter } from "next/navigation"
import { ratingEmojis, ratingSvgEmojis } from '@/lib/constants'
import { useBookData } from '@/context/BookDataContext'
import { AnimatePresence, motion } from 'framer-motion'
import { div } from 'framer-motion/client'

export default function Feedback({ book, setShowFeedback, setIsDeleting, isGoogleSearch = false, handleError = null }) {
  const [feedback, setFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [readedToday, setReadedToday] = useState(true)
  const [readedDate, setReadedDate] = useState(new Date().toISOString().split("T")[0])
  const [message, setMessage] = useState("")
  const { handleMarkAsRead } = useMarkAsRead()
  const router = useRouter()
  const { readedList, setReadedList, readingList, setReadingList } = useBookData()

  useEffect(() => {
    if (book.isRead) {
      const actualDate = new Date(book.readedDate).toISOString().split("T")[0]
      setReadedDate(actualDate)
      setReadedToday(false)
    }
  }, [book])

  const handleFeedback = async (response) => {
    setIsLoading(true)
    const bookid = isGoogleSearch ? book.id : book.googleId
    const result = await handleMarkAsRead(bookid, response, readedDate)

    if (result.success) {

      const bookToChange = readingList.find((b) => b.googleId === bookid)
      if (!!bookToChange) {
        Object.assign(bookToChange, {
          rating: response,
          readedDate: readedDate,
          isRead: true
        })
        setReadedList([...readedList, bookToChange])
        setReadingList(readingList.filter((b) => b.googleId !== bookToChange.googleId))
        // setMessage("Libro marcado como leído con éxito.")
      } else {
        const bookToChange = readedList.find((b) => b.googleId === bookid)
        if (!!bookToChange) {
          Object.assign(bookToChange, {
            rating: response,
            readedDate: readedDate,
            isRead: true
          })
          setReadedList(readedList.map((b) => b.googleId === bookid ? bookToChange : b))
        }
      }
      setIsLoading(false)
      setShowFeedback(false)
    } else {
      if (handleError !== null) {
        handleError()
      }
    }
  }



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
            {["wonderfull", "like", "normal", "dislike"].map((rating) => (
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
          <button className='button primary' onClick={() => handleFeedback(feedback)}>
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </motion.div>

    </motion.div>
  )
}
