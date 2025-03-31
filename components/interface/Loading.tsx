interface LoadingProps {
  setModal?: () => void
  isInitial?: boolean
}

export default function Loading({ setModal = () => {}, isInitial = false }: LoadingProps) {
  return (
    <div
      className='modal-message'
    >
      <div className='loader-animation'></div>
      <span style={{ color: "white" }}>
        Cargando datos...
      </span>
      {!isInitial && (<button
        className='button danger'
        onClick={() => { setModal() }}
      >
        Cancelar
      </button>)}
    </div>
  )
}
