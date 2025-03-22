import { motion } from 'framer-motion'
import { Mosaic } from 'react-loading-indicators'

interface LoadingProps {
  setModal?: () => void
  isInitial?: boolean
}

export default function Loading({ setModal = () => {}, isInitial = false }: LoadingProps) {
  return (
    <div
      // key="modal-container"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      className='modal-message'
    >
      {/* <img src="/libros.gif" alt="" /> */}
      <div className='loader-animation'></div>
      {/* <div>
        <Mosaic color="#3b82f6" size="small" text="" textColor="" />
      </div> */}
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
