import { OrbitProgress } from 'react-loading-indicators'
import { motion } from 'framer-motion'

export default function LoadingComponent({ setShowInfo }) {
  return (
    <motion.div
      key="modal-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='modal-message'
    >
      <div>
        <OrbitProgress dense color="#3b82f6" size="small" text="" textColor="" />
      </div>
      <span>
        Cargando...
      </span>
      <button
        className='button danger'
        onClick={() => { setShowInfo(false) }}
      >
        Cancelar
      </button>
    </motion.div>
  )
}
