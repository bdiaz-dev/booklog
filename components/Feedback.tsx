import { useState } from "react"
import { useMarkAsRead } from '@/hooks/useMarkAsRead'
import { useRouter } from "next/navigation"
import { ratingEmojis } from '@/lib/constants'
import { useBookData } from '@/context/BookDataContext'
import { AnimatePresence, motion } from 'framer-motion'
import { div } from 'framer-motion/client'

export default function Feedback({ book, setShowFeedback, setIsDeleting, isGoogleSearch = false, handleError = null }) {
  const [feedback, setFeedback] = useState("")
  const [readedToday, setReadedToday] = useState(true)
  const [readedDate, setReadedDate] = useState(new Date().toISOString().split("T")[0])
  const [message, setMessage] = useState("")
  const { handleMarkAsRead } = useMarkAsRead()
  const router = useRouter()
  const { readedList, setReadedList, readingList, setReadingList } = useBookData()

  const handleFeedback = async (response) => {
    setFeedback(response)
    const bookid = isGoogleSearch ? book.id : book.googleId
    const result = await handleMarkAsRead(bookid, response, readedDate)

    if (result.success) {
      // setIsDeleting(true)

      const bookToChange = readingList.find((b) => b.googleId === bookid)
      if (!!bookToChange) {
        Object.assign(bookToChange, {
          rating: response,
          readedDate: readedDate,
          isRead: true
        })
        setReadedList([...readedList, bookToChange])
        setReadingList(readingList.filter((b) => b.googleId !== bookToChange.googleId))
        setMessage("Libro marcado como leído con éxito.")
      } else {
        const bookToChange = readedList.find((b) => b.googleId === bookid)
        if (!!bookToChange) {
          Object.assign(bookToChange, {
            rating: response,
            readedDate: readedDate,
            isRead: true
          })
          setReadedList(readedList.map((b) => b.googleId === bookid ? bookToChange : b))
        }}
        setShowFeedback(false)
      // setTimeout(() => router.refresh(), 30000)
    } else {
      if (handleError !== null) {
        handleError()
      }
      setMessage(`Error: ${result.error}`)
    }
    // setIsDeleting(false)
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
          <button onClick={() => handleFeedback("wonderfull")} className="button info">
            {ratingEmojis.wonderfull}
          </button>
          <button onClick={() => handleFeedback("like")} className="button info">
            {ratingEmojis.like}
          </button>
          <button onClick={() => handleFeedback("normal")} className="button info">
            {ratingEmojis.normal}
          </button>
          <button onClick={() => handleFeedback("dislike")} className="button info">
            {ratingEmojis.dislike}
          </button>
        </div>
        {/* <br /> */}
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
        {/* <br /> */}
        {/* <button onClick={() => setShowFeedback(false)} className="button secondary">
          Cancelar
        </button> */}
        {feedback && <p>Tu respuesta: {feedback}</p>}
      </motion.div>

    </motion.div>
  )
}
