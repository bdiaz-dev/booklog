type DateComponentProps = {
  checkToday: boolean
  setToday: (value: boolean) => void
  customDate: string
  setCustomDate: (value: string) => void
}

export default function DateComponent( {checkToday, setToday, customDate, setCustomDate} : DateComponentProps) {
  return (
    <div className='feedback-modal-date'>
    <input
      type="checkbox"
      name="startedToday"
      className='mark-checkbox'
      checked={checkToday}
      onChange={() => setToday(!checkToday)}
    />
    <span onClick={() => setToday(!checkToday)}>{"Usar fecha de hoy"}</span>
    {!checkToday && (
      <div className='feedback-modal-date-personal'>
        <input
          type="date"
          name="readedPersonalDate"
          id="readedPersonalDate"
          value={customDate}
          onChange={(e) => setCustomDate(e.target.value)}
        />
      </div>
    )}
  </div>
  )
}
