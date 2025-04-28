type MarkingComponentProps = {
  isMarkedOnBook: boolean
  isMarked: boolean
  setIsMarked: (value: boolean) => void
  markName: string
}

export default function MarkingComponent({ isMarkedOnBook, isMarked, setIsMarked, markName }: MarkingComponentProps) {
  
  const markLabel = (markName : string) => {return (
    markName === 'markIsReaded' && "Leido" ||
    markName === 'markIsStarted' && "Empezado")}
  
  return (
    <div
    className={`button ${!isMarkedOnBook ? (isMarked ? 'active' : 'primary') : 'disabled'}`}
    onClick={() => {
      if (!isMarkedOnBook) { setIsMarked(!isMarked) }
    }}
  >
    <input
      type="checkbox"
      className='mark-checkbox'
      name={markName}
      id={markName}
      checked={isMarked}
      disabled={isMarkedOnBook}
      onChange={() => setIsMarked(!isMarked)}
    />
    <span className='mark-label'>{markLabel(markName)}</span>
  </div>
  )
}
